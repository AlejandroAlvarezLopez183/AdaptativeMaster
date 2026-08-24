"""
Configuración central de la app (variables de entorno).
Nunca hardcodear secretos aquí: siempre leer de variables de entorno.
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str
    redis_url: str
    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    ai_api_key: str = ""
    stripe_api_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
