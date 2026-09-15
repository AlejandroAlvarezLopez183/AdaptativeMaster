"""
Script de prueba rápida para el cliente de OpenRouter.
Ejecutar desde la carpeta /backend con:

    python test_openrouter.py

Verifica:
  1. Que la API Key sea válida.
  2. Que el sistema de fallback funcione y retorne una respuesta.
  3. Que la generación de JSON estructurado (para rutas) funcione.
"""

import asyncio
import os
import sys

# Añadir el directorio raíz al path para que los imports funcionen
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Cargar .env manualmente (fuera de FastAPI no hay auto-carga)
from dotenv import load_dotenv
load_dotenv()

from modules.compartido.openrouter_client import chat_completion, chat_completion_json


# ─── Colores para la terminal ──────────────────────────────────────────────────
GREEN  = "\033[92m"
RED    = "\033[91m"
YELLOW = "\033[93m"
BLUE   = "\033[94m"
RESET  = "\033[0m"
BOLD   = "\033[1m"

def ok(msg):   print(f"{GREEN}  ✅ {msg}{RESET}")
def fail(msg): print(f"{RED}  ❌ {msg}{RESET}")
def info(msg): print(f"{BLUE}  ℹ  {msg}{RESET}")


async def test_chat_simple():
    """Prueba 1: Llamada conversacional básica (como el Tutor IA)."""
    print(f"\n{BOLD}📝 Prueba 1: Chat conversacional (modo Tutor){RESET}")
    try:
        respuesta = await chat_completion(
            messages=[
                {"role": "system", "content": "Eres un tutor educativo amigable. Responde en español de forma breve."},
                {"role": "user",   "content": "Explícame en 2 oraciones qué es el aprendizaje automático."},
            ],
            model_key="tutor",
            temperature=0.7,
            max_tokens=200,
        )
        ok(f"Respuesta recibida ({len(respuesta)} caracteres)")
        print(f"\n  {YELLOW}Respuesta del modelo:{RESET}")
        print(f"  {respuesta}\n")
        return True
    except Exception as e:
        fail(f"Error en chat_completion: {e}")
        return False


async def test_json_generation():
    """Prueba 2: Generación de JSON estructurado (como la generación de Rutas)."""
    print(f"{BOLD}🗺  Prueba 2: Generación de JSON estructurado (modo Ruta){RESET}")
    try:
        resultado = await chat_completion_json(
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Genera un plan de aprendizaje en JSON con esta estructura EXACTA:\n"
                        '{"titulo": "...", "lecciones": [{"orden": 1, "titulo": "..."}, {"orden": 2, "titulo": "..."}]}\n'
                        "Tema: Python para principiantes. Solo 2 lecciones de ejemplo."
                    )
                }
            ],
            model_key="ruta",
            temperature=0.3,
            max_tokens=400,
        )
        ok(f"JSON recibido y parseado correctamente")
        print(f"\n  {YELLOW}JSON generado:{RESET}")
        import json
        print(f"  {json.dumps(resultado, ensure_ascii=False, indent=2)}\n")
        return True
    except Exception as e:
        fail(f"Error en chat_completion_json: {e}")
        return False


async def main():
    print(f"\n{BOLD}{'='*55}")
    print(f"  🚀 Test de integración OpenRouter — EstudiLabAI")
    print(f"{'='*55}{RESET}")

    # Verificar que la API Key esté cargada
    api_key = os.getenv("AI_API_KEY", "")
    if not api_key or not api_key.startswith("sk-or"):
        fail("AI_API_KEY no encontrada o inválida en el archivo .env")
        sys.exit(1)
    else:
        # Mostrar solo los primeros y últimos caracteres por seguridad
        masked = api_key[:12] + "..." + api_key[-6:]
        ok(f"API Key encontrada: {masked}")

    # Correr pruebas
    prueba1 = await test_chat_simple()
    prueba2 = await test_json_generation()

    # Resumen final
    print(f"{BOLD}{'='*55}")
    total = sum([prueba1, prueba2])
    if total == 2:
        print(f"  {GREEN}🎉 Todas las pruebas pasaron ({total}/2) — OpenRouter listo!{RESET}")
    else:
        print(f"  {YELLOW}⚠️  {total}/2 pruebas pasaron. Revisa los errores arriba.{RESET}")
    print(f"{'='*55}{RESET}\n")


if __name__ == "__main__":
    asyncio.run(main())
