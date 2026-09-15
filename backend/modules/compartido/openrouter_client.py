"""
Cliente de OpenRouter con sistema de fallback automático entre modelos gratuitos.

Si un modelo está caído o con rate limit, automáticamente prueba el siguiente
de la lista hasta encontrar uno que responda exitosamente.

Documentación: https://openrouter.ai/docs
"""

import httpx
import json
import logging
from typing import Any

from modules.compartido.config import settings

logger = logging.getLogger(__name__)

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# ─── Lista de modelos gratuitos con fallback ────────────────────────────────────
# Ordenados de mayor a menor preferencia para tareas de texto/razonamiento.
# Los IDs con `:free` son el sufijo estándar de OpenRouter para modelos gratuitos.
# Fuente: https://openrouter.ai/models?q=free

FREE_MODELS_TUTOR = [
    # Prioridad alta: modelos potentes de conversación pura (sin auto-pensamiento forzado)
    "google/gemma-4-31b-it:free",
    "google/gemma-4-26b-a4b-it:free",
    "liquid/lfm-2.5-2.6b:free",
    "z-ai/glm-5.2:free",
    "inclusionai/ling-3.0-flash-sante:free",
    "inclusionai/ling-3.0-flash-vl:free",
    "thinkingmachines/inkling:free",
    "nex-agi/nex-n2.5-pro:free",
    # Prioridad baja: modelos "tercos" que insisten en imprimir su "thinking process"
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "openrouter/free",
]

FREE_MODELS_RUTA = [
    # Prioridad ALTA para JSON: modelos directos que NO "piensan en voz alta"
    "google/gemma-4-26b-a4b-it:free",          # Rápido, directo, bueno con JSON
    "nex-agi/nex-n2.5-pro:free",               # Bueno con formatos estructurados
    "nex-agi/nex-n2.5-mini:free",
    "z-ai/glm-5.2:free",
    "inclusionai/ling-3.0-flash-sante:free",
    "liquid/lfm-2.5-2.6b:free",
    "google/gemma-4-31b-it:free",
    # Prioridad BAJA: modelos de razonamiento (suelen saturarse pensando antes de dar el JSON)
    "nvidia/nemotron-3.5-lightning:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "openrouter/free",
]

# Errores HTTP que indican que el modelo no está disponible (intentar el siguiente)
RETRIABLE_STATUS_CODES = {429, 503, 502, 500, 529}


def _get_headers() -> dict:
    """Cabeceras requeridas por OpenRouter."""
    return {
        "Authorization": f"Bearer {settings.ai_api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://estudilabai.com",
        "X-Title": "EstudiLabAI",
    }


async def _call_single_model(
    client: httpx.AsyncClient,
    model: str,
    messages: list[dict],
    temperature: float,
    max_tokens: int,
    response_format: dict | None,
) -> str | None:
    """
    Intenta una sola llamada a un modelo específico.

    Returns:
        El texto de la respuesta si fue exitosa, None si debe reintentarse con otro modelo.
    """
    payload: dict[str, Any] = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens,
    }
    # NOTA: response_format solo es compatible con modelos OpenAI/Azure.
    # Para los modelos gratuitos de OpenRouter no lo enviamos para evitar el 400.
    # En su lugar, instruimos al modelo por prompt a devolver JSON.
    if response_format and model in ("openrouter/free", "openrouter/auto"):
        payload["response_format"] = response_format

    try:
        response = await client.post(
            f"{OPENROUTER_BASE_URL}/chat/completions",
            headers=_get_headers(),
            json=payload,
            timeout=45.0,
        )

        # Si el error indica que el modelo no está disponible → intentar el siguiente
        if response.status_code in RETRIABLE_STATUS_CODES:
            logger.warning(
                f"[OpenRouter] Modelo '{model}' no disponible (HTTP {response.status_code}). "
                f"Intentando siguiente..."
            )
            return None

        response.raise_for_status()  # Lanza para errores 4xx/5xx no reintentables

        data = response.json()
        result = data["choices"][0]["message"]["content"]
        
        # --- LIMPIEZA FORZADA DEL THINKING PROCESS ---
        import re
        # Quitar bloques explícitos <think>...</think>
        result = re.sub(r'<think>.*?</think>', '', result, flags=re.DOTALL)
        
        # Quitar el patrón típico de "Here's a thinking process... \n\n"
        # Buscamos saltos de línea largos seguidos que separan el pensamiento de la respuesta final.
        if "thinking process:" in result.lower() or "analyze user input:" in result.lower():
            # Usualmente el LLM hace una lista 1. 2. 3. y luego da la respuesta final.
            # Haremos un split agresivo buscando la estructura, o simplemente dejaremos que el modelo baje de prioridad.
            # Lo más seguro es eliminar todo hasta encontrar un doble o triple salto de línea que precede al texto final (o separador común).
            # Ejemplo: "Let's draft:\n\n¡Claro!"
            partes = result.split("\n\n")
            if len(partes) > 3:
                # Si hay muchas partes, la respuesta real suele estar al final.
                # Una heurística simple: si la respuesta es más de 1500 chars de puro pensamiento, tomamos el final.
                pass
        
        # --- FIN LIMPIEZA ---
        
        logger.info(f"[OpenRouter] ✅ Respuesta exitosa con modelo: '{model}'")
        return result.strip()

    except (httpx.TimeoutException, httpx.ConnectError) as e:
        logger.warning(f"[OpenRouter] Timeout/Error de red con '{model}': {e}. Intentando siguiente...")
        return None

    except (KeyError, IndexError) as e:
        logger.warning(f"[OpenRouter] Respuesta inesperada de '{model}': {e}. Intentando siguiente...")
        return None


async def chat_completion(
    messages: list[dict],
    model_key: str = "tutor",
    temperature: float = 0.7,
    max_tokens: int = 1500,
    response_format: dict | None = None,
) -> str:
    """
    Llama a la API de OpenRouter con fallback automático entre modelos gratuitos.

    Itera por la lista de modelos en orden de preferencia. Si un modelo falla
    (rate limit, caído, timeout), pasa automáticamente al siguiente.
    El bucle se detiene en el primer modelo que responda exitosamente.

    Args:
        messages:       Lista de mensajes [{"role": "...", "content": "..."}].
        model_key:      "tutor" o "ruta" — selecciona la lista de fallback adecuada.
        temperature:    Temperatura de muestreo.
        max_tokens:     Máximo de tokens en la respuesta.
        response_format: Ej: {"type": "json_object"} para forzar JSON.

    Returns:
        El texto de la respuesta del primer modelo disponible.

    Raises:
        RuntimeError: Si NINGÚN modelo de la lista pudo responder.
    """
    model_list = FREE_MODELS_TUTOR if model_key == "tutor" else FREE_MODELS_RUTA

    async with httpx.AsyncClient() as client:
        for model in model_list:
            result = await _call_single_model(
                client=client,
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                response_format=response_format,
            )
            if result is not None:
                return result  # ← Bucle se detiene aquí con el primer éxito

    # Si llegamos aquí, ningún modelo respondió
    raise RuntimeError(
        f"Todos los modelos gratuitos de OpenRouter fallaron para el rol '{model_key}'. "
        f"Revisa el estado de la API o recarga los modelos disponibles."
    )


async def chat_completion_json(
    messages: list[dict],
    model_key: str = "ruta",
    temperature: float = 0.3,
    max_tokens: int = 3000,
) -> dict:
    """
    Variante de chat_completion que extrae y parsea JSON de la respuesta del modelo.
    Maneja los casos donde el modelo "piensa en voz alta" antes de dar el JSON,
    o lo envuelve en bloques de markdown.

    Returns:
        Un dict con la respuesta del modelo ya parseada desde JSON.

    Raises:
        ValueError: Si ningún modelo devuelve JSON válido.
    """
    import re

    raw = await chat_completion(
        messages=messages,
        model_key=model_key,
        temperature=temperature,
        max_tokens=max_tokens,
        response_format=None,  # No forzamos formato — extraemos el JSON manualmente
    )

    # ── Intento 1: La respuesta completa ya es JSON puro ──────────────────────
    try:
        return json.loads(raw.strip())
    except json.JSONDecodeError:
        pass

    # ── Intento 2: Buscar bloques markdown ```json ... ``` de atrás hacia adelante
    if "```json" in raw:
        bloques = raw.split("```json")
        for bloque in reversed(bloques[1:]):  # Iterar del último al primero
            try:
                json_str = bloque.split("```")[0].strip()
                return json.loads(json_str)
            except (IndexError, json.JSONDecodeError):
                pass

    # ── Intento 3: Buscar bloques markdown genéricos ``` ... ```
    if "```" in raw:
        bloques = raw.split("```")
        for bloque in reversed(bloques[1:]):
            try:
                json_str = bloque.strip()
                # Verificar rápido si se parece a JSON antes de intentar parsear
                if json_str.startswith("{") or json_str.startswith("["):
                    return json.loads(json_str)
            except json.JSONDecodeError:
                pass

    # ── Intento 4: Indexado bruto (Ignora el 'thinking process' extra) ────────
    start_idx = raw.find('{')
    end_idx = raw.rfind('}')
    if start_idx != -1 and end_idx != -1 and end_idx > start_idx:
        try:
            return json.loads(raw[start_idx:end_idx+1])
        except json.JSONDecodeError:
            pass

    # ── Todos los intentos fallaron ──────────────────────────────────────────────
    raise ValueError(
        f"El modelo no devolvio JSON valido tras 4 intentos de extraccion.\n"
        f"Longitud total de la respuesta: {len(raw)} chars.\n"
        f"Primeros 600 chars: {raw[:600]}\n"
        f"... Últimos 200 chars: {raw[-200:]}"
    )
