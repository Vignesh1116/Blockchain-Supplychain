from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
import joblib
import numpy as np
import asyncio
import random
import json
from datetime import datetime

# Load the trained models
FRAUD_MODEL_PATH = "fraud_model.pkl"
RISK_MODEL_PATH = "risk_model.pkl"

try:
    fraud_model = joblib.load(FRAUD_MODEL_PATH)
    risk_model = joblib.load(RISK_MODEL_PATH)
except Exception as e:
    raise RuntimeError(f"Error loading models: {str(e)}")

# Initialize FastAPI app
app = FastAPI(
    title="Supply Chain Fraud Detection API",
    description="API for predicting fraud in supply chain transactions based on amount, delivery time, and ownership frequency.",
    version="1.0.0"
)

# Define request schema
class TransactionData(BaseModel):
    transaction_amount: float
    delivery_time: float
    ownership_frequency: int

# Define response schemas
class PredictionResponse(BaseModel):
    fraud_prediction: int
    message: str

class RiskResponse(BaseModel):
    risk_score: str
    risk_level: int
    details: dict

@app.get("/")
def health_check():
    return {"status": "healthy", "model_loaded": True}

@app.post("/predict-fraud", response_model=PredictionResponse)
def predict_fraud(data: TransactionData):
    """
    Predicts if a transaction is fraudulent based on input features.
    """
    try:
        input_data = np.array([[data.transaction_amount, data.delivery_time, data.ownership_frequency]])
        prediction = int(fraud_model.predict(input_data)[0])
        message = "Fraud detected" if prediction == 1 else "Transaction safe"
        
        return PredictionResponse(fraud_prediction=prediction, message=message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fraud prediction error: {str(e)}")

@app.post("/predict-risk", response_model=RiskResponse)
def predict_risk(data: TransactionData):
    """
    Predicts the risk level (Low, Medium, High) of a transaction.
    """
    try:
        input_data = np.array([[data.transaction_amount, data.delivery_time, data.ownership_frequency]])
        prediction = int(risk_model.predict(input_data)[0])
        
        risk_map = {0: "Low", 1: "Medium", 2: "High"}
        risk_score = risk_map.get(prediction, "Unknown")
        
        return RiskResponse(
            risk_score=risk_score,
            risk_level=prediction,
            details={
                "shipment_delay_risk": "High" if data.delivery_time > 12 else "Normal",
                "unusual_amount_risk": "High" if data.transaction_amount > 2500 else "Normal",
                "supplier_activity_risk": "Suspicious" if data.ownership_frequency > 5 else "Normal"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk prediction error: {str(e)}")

@app.websocket("/ws/monitoring")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Generate simulated real-time data
            txn_id = f"TXN_{random.randint(10000, 99999)}"
            amount = round(random.uniform(100, 5000), 2)
            delivery_time = round(random.uniform(1, 15), 1)
            ownership = random.randint(1, 10)
            
            # Predict using existing models
            features = np.array([[amount, delivery_time, ownership]])
            fraud_pred = int(fraud_model.predict(features)[0])
            risk_pred = int(risk_model.predict(features)[0])
            risk_map = {0: "Low", 1: "Medium", 2: "High"}
            
            monitoring_data = {
                "timestamp": datetime.now().strftime("%H:%M:%S"),
                "transaction": {
                    "id": txn_id,
                    "amount": amount,
                    "status": "Success",
                    "hash": f"0x{random.getrandbits(64):016x}"
                },
                "tracking": {
                    "product": random.choice(["Precision Alloy X", "Lithium-Ion Pack", "Nano Circuit v3", "Graphene Sheets"]),
                    "location": random.choice(["Berlin Hub", "London Port", "NYC Distribution", "Tokyo Facility"]),
                    "status": random.choice(["In Transit", "Processing", "Delivered", "Customs Clearance"])
                },
                "risk_update": {
                    "score": round(random.uniform(5, 80), 1),
                    "pred": risk_map[risk_pred]
                },
                "alert": None
            }
            
            # Trigger alert if fraud is detected
            if fraud_pred == 1:
                monitoring_data["alert"] = {
                    "type": "FRAUD_DETECTED",
                    "severity": "CRITICAL",
                    "message": f"Anomalous transaction detected: {txn_id} (${amount})"
                }
            elif risk_pred == 2:
                monitoring_data["alert"] = {
                    "type": "HIGH_RISK",
                    "severity": "WARNING",
                    "message": f"High risk activity identified in {txn_id}"
                }

            await websocket.send_json(monitoring_data)
            await asyncio.sleep(3) # Send update every 3 seconds
            
    except WebSocketDisconnect:
        print("Client disconnected from monitoring WebSocket")
    except Exception as e:
        print(f"WebSocket error: {e}")

if __name__ == "__main__":
    import uvicorn
    # Run the API
    print("Starting Fraud Detection Service...")
    uvicorn.run(app, host="0.0.0.0", port=8001)
