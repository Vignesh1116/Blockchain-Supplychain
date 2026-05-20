from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Supply Chain API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "a_very_secret_key_for_jwt_auth_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Database Settings
    DATABASE_URL: str = "sqlite:///./supplychain.db"
    
    # Web3 / Blockchain Settings
    WEB3_RPC_URL: str = "http://127.0.0.1:8545" # Ganache defaults
    WEB3_CONTRACT_ADDRESS: str = "0x5FbDB2315678afecb367f032d93F642f64180aa3" # Hardhat default address #1 placeholder
    WEB3_PRIVATE_KEY: str = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80" # Default ganache/hardhat account 0 private key for signing transactions
    
    # Mock Mode
    ENABLE_BLOCKCHAIN_MOCK: bool = True

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return self.DATABASE_URL
        
    class Config:
        case_sensitive = True

settings = Settings()
