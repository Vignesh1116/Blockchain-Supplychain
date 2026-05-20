from pydantic import BaseModel

class FraudPredictionRequest(BaseModel):
    transaction_id: int
    supplier_id: int
    product_id: int
    transaction_amount: float
    delivery_time: float
    ownership_frequency: int

class FraudPredictionResponse(BaseModel):
    transaction_id: int
    is_fraud: bool
    confidence: float
    model_used: str
    risk_level: str
