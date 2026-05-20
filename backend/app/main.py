import asyncio
import random
import json
import os
from datetime import datetime
from typing import List, Dict
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import joblib
import numpy as np

# Load models for real-time simulation
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(os.path.dirname(BASE_DIR))
FRAUD_MODEL_PATH = os.path.join(ROOT_DIR, "fraud_model.pkl")
RISK_MODEL_PATH = os.path.join(ROOT_DIR, "risk_model.pkl")

fraud_model = None
risk_model = None
try:
    if os.path.exists(FRAUD_MODEL_PATH):
        fraud_model = joblib.load(FRAUD_MODEL_PATH)
        print("Loaded fraud model for simulation.")
    if os.path.exists(RISK_MODEL_PATH):
        risk_model = joblib.load(RISK_MODEL_PATH)
        print("Loaded risk model for simulation.")
except Exception as e:
    print(f"Error loading models for simulation: {e}")

from app.api.endpoints import auth, products, transactions, fraud
from app.db.database import engine, Base
from app.core.config import settings

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ChainIQ Nexus",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Autonomous AI Blockchain Supply Chain Intelligence System.",
    version="2.0.0"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket Connection Manager
class NexusManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {
            "monitoring": [],
            "consensus": [],
            "security": [],
            "ai_insights": []
        }

    async def connect(self, websocket: WebSocket, channel: str):
        await websocket.accept()
        if channel in self.active_connections:
            self.active_connections[channel].append(websocket)

    def disconnect(self, websocket: WebSocket, channel: str):
        if channel in self.active_connections:
            self.active_connections[channel].remove(websocket)

    async def broadcast(self, channel: str, message: dict):
        if channel in self.active_connections:
            for connection in self.active_connections[channel]:
                try:
                    await connection.send_json(message)
                except Exception:
                    continue

nexus_manager = NexusManager()

# Routers inclusion
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(products.router, prefix=f"{settings.API_V1_STR}/products", tags=["products"])
app.include_router(transactions.router, prefix=f"{settings.API_V1_STR}/transactions", tags=["transactions"])
app.include_router(fraud.router, prefix=f"{settings.API_V1_STR}/fraud", tags=["machine_learning"])

@app.get("/")
def root():
    return {
        "status": "online",
        "system": "ChainIQ Nexus v2.0",
        "node": "Alpha-1",
        "engine": "Autonomous Intelligence"
    }

# Real-time Simulation Background Tasks
async def run_consensus_simulation():
    """Simulates blockchain consensus pulses"""
    block_height = 402129
    while True:
        block_height += 1
        pulse = {
            "type": "CONSENSUS_REACHED",
            "block": {
                "height": block_height,
                "hash": f"0x{random.getrandbits(64):016x}",
                "validator": random.choice(["NODE_ALPHA", "NODE_BETA", "NODE_GAMMA"]),
                "tx_count": random.randint(50, 300),
                "timestamp": datetime.now().isoformat()
            },
            "latency": f"{random.uniform(1.2, 4.5):.2f}ms"
        }
        await nexus_manager.broadcast("consensus", pulse)
        await asyncio.sleep(random.randint(5, 12))

async def run_ai_intelligence_stream():
    """Simulates AI event updates, risk scoring, and anomalies"""
    while True:
        event_type = random.choice(["RISK_UPDATE", "ANOMALY_DETECTED", "OPTIMIZATION_SUGGESTION"])
        
        if event_type == "RISK_UPDATE":
            data = {
                "type": "RISK_UPDATE",
                "asset_id": f"AX-{random.randint(1000, 9999)}",
                "score": round(random.uniform(10, 95), 1),
                "trend": random.choice(["UP", "DOWN", "STABLE"]),
                "confidence": "98.2%"
            }
        elif event_type == "ANOMALY_DETECTED":
            data = {
                "type": "ANOMALY",
                "severity": random.choice(["CRITICAL", "WARNING"]),
                "metric": random.choice(["Temperature", "Route Deviation", "Sensor Integrity"]),
                "location": random.choice(["Pacific Route 4", "Berlin Hub", "London Gateway"]),
                "timestamp": datetime.now().isoformat()
            }
        else:
            data = {
                "type": "OPTIMIZATION",
                "module": "Inventory Flow",
                "message": "AI suggests re-routing 12% of stock to Singapore Hub to meet predicted demand spikes.",
                "potential_saving": "14.5%"
            }
            
        await nexus_manager.broadcast("ai_insights", data)
        await asyncio.sleep(random.randint(8, 15))

async def run_monitoring_simulation():
    """Simulates real-time telemetry and risk prediction data"""
    risk_map = {0: "Low", 1: "Medium", 2: "High"}
    while True:
        txn_id = f"TXN_{random.randint(10000, 99999)}"
        amount = round(random.uniform(100, 5000), 2)
        delivery_time = round(random.uniform(1, 15), 1)
        ownership = random.randint(1, 10)
        
        fraud_pred = 0
        risk_pred = 0
        
        if fraud_model and risk_model:
            try:
                features = np.array([[amount, delivery_time, ownership]])
                fraud_pred = int(fraud_model.predict(features)[0])
                risk_pred = int(risk_model.predict(features)[0])
            except Exception:
                # Fallback to rules
                fraud_pred = 1 if amount > 4500 and ownership > 7 else 0
                risk_pred = 2 if delivery_time > 12 else (1 if amount > 2500 else 0)
        else:
            # Fallback to rules
            fraud_pred = 1 if amount > 4500 and ownership > 7 else 0
            risk_pred = 2 if delivery_time > 12 else (1 if amount > 2500 else 0)
            
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

        await nexus_manager.broadcast("monitoring", monitoring_data)
        await asyncio.sleep(3)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(run_consensus_simulation())
    asyncio.create_task(run_ai_intelligence_stream())
    asyncio.create_task(run_monitoring_simulation())

@app.websocket("/ws/{channel}")
async def websocket_endpoint(websocket: WebSocket, channel: str):
    if channel not in nexus_manager.active_connections:
        await websocket.close(code=1003)
        return
        
    await nexus_manager.connect(websocket, channel)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        nexus_manager.disconnect(websocket, channel)
    except Exception as e:
        print(f"WebSocket error on channel {channel}: {e}")
        nexus_manager.disconnect(websocket, channel)

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)
