import os
import joblib
import pandas as pd
from fastapi import APIRouter, HTTPException
from typing import Any
from app.schemas.fraud import FraudPredictionRequest, FraudPredictionResponse

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
MODEL_RF_PATH = os.path.join(BASE_DIR, "ml_models", "models", "random_forest_fraud.pkl")

rf_model = None

from app.schemas.fraud import FraudPredictionRequest, FraudPredictionResponse
import numpy as np

# Additional Risk Model Path
MODEL_RISK_PATH = os.path.join(BASE_DIR, "risk_model.pkl")
risk_model_loaded = None

@router.on_event("startup")
def load_models():
    global rf_model, risk_model_loaded
    try:
        if os.path.exists(MODEL_RF_PATH):
            rf_model = joblib.load(MODEL_RF_PATH)
            print(f"Loaded Random Forest model from {MODEL_RF_PATH}")
        
        if os.path.exists(MODEL_RISK_PATH):
            risk_model_loaded = joblib.load(MODEL_RISK_PATH)
            print(f"Loaded Risk model from {MODEL_RISK_PATH}")
    except Exception as e:
        print(f"Failed to load ML models: {e}")

@router.post("/predict-fraud", response_model=FraudPredictionResponse)
def predict_fraud(payload: FraudPredictionRequest) -> Any:
    # ... (existing code)
    global rf_model
    if rf_model is None:
        raise HTTPException(status_code=503, detail="Model not available")
    
    features = pd.DataFrame([{
        "transaction_amount": payload.transaction_amount,
        "delivery_time": payload.delivery_time,
        "ownership_frequency": payload.ownership_frequency
    }])
    prediction = rf_model.predict(features)[0]
    probabilities = rf_model.predict_proba(features)[0]
    confidence = round(float(max(probabilities) * 100), 2)
    is_fraud = bool(prediction == 1)
    
    return FraudPredictionResponse(
        transaction_id=payload.transaction_id or "N/A",
        is_fraud=is_fraud,
        confidence=confidence,
        model_used="Random Forest",
        risk_level="High" if is_fraud else "Low"
    )

@router.post("/predict-risk")
def predict_risk(payload: FraudPredictionRequest) -> Any:
    global risk_model_loaded
    if risk_model_loaded is None:
        if os.path.exists(MODEL_RISK_PATH):
            risk_model_loaded = joblib.load(MODEL_RISK_PATH)
        else:
            raise HTTPException(status_code=503, detail="Risk model not available")

    try:
        input_data = np.array([[payload.transaction_amount, payload.delivery_time, payload.ownership_frequency]])
        prediction = int(risk_model_loaded.predict(input_data)[0])
        risk_map = {0: "Low", 1: "Medium", 2: "High"}
        
        return {
            "risk_score": risk_map.get(prediction, "Unknown"),
            "risk_level": prediction,
            "details": {
                "shipment_delay_risk": "High" if payload.delivery_time > 12 else "Normal",
                "unusual_amount_risk": "High" if payload.transaction_amount > 2500 else "Normal",
                "supplier_activity_risk": "Suspicious" if payload.ownership_frequency > 5 else "Normal"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
