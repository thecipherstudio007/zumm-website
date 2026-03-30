import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Zumm Backend"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./zumm.db")
    
    class Config:
        case_sensitive = True

settings = Settings()
