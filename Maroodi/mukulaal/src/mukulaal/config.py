from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    db_url: str
    redis_url: str
    environment: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()
