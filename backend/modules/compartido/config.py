"""
Configuración central de la app (variables de entorno).
Nunca hardcodear secretos aquí: siempre leer de variables de entorno.
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://user:password@localhost:5432/estudilabai"
    redis_url: str = "redis://localhost:6379"
    jwt_secret: str = "CAMBIAR_EN_PRODUCCION"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    ai_api_key: str = ""
    stripe_api_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
