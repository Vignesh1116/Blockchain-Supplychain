import pandas as pd
import numpy as np
import os
import joblib
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "supply_chain_dataset.csv")
MODEL_RF_PATH = os.path.join(BASE_DIR, "models", "random_forest_fraud.pkl")
MODEL_IF_PATH = os.path.join(BASE_DIR, "models", "isolation_forest_fraud.pkl")

os.makedirs(os.path.dirname(DATA_PATH), exist_ok=True)
os.makedirs(os.path.dirname(MODEL_RF_PATH), exist_ok=True)

def generate_synthetic_data(num_samples=1000):
    np.random.seed(42)
    # Generate Normal Transactions
    data = {
        "transaction_id": np.arange(1, num_samples + 1),
        "supplier_id": np.random.randint(100, 500, num_samples),
        "product_id": np.random.randint(1000, 5000, num_samples),
        "transaction_amount": np.random.uniform(50, 5000, num_samples),
        "delivery_time": np.random.uniform(1, 30, num_samples), # days
        "ownership_frequency": np.random.randint(1, 10, num_samples),
        "fraud_label": np.zeros(num_samples, dtype=int)
    }
    
    # Introduce Fraudulent Transactions (approx 5% of data)
    num_fraud = int(0.05 * num_samples)
    fraud_indices = np.random.choice(num_samples, num_fraud, replace=False)
    
    # Fraud characteristics: high amount, quick or extreme delivery times, high ownership frequency jumps
    data["transaction_amount"][fraud_indices] *= np.random.uniform(3, 10, num_fraud)
    data["delivery_time"][fraud_indices] = np.random.choice([0.1, 60.0], num_fraud)
    data["ownership_frequency"][fraud_indices] += np.random.randint(10, 50, num_fraud)
    data["fraud_label"][fraud_indices] = 1
    
    df = pd.DataFrame(data)
    df.to_csv(DATA_PATH, index=False)
    print(f"Dataset generated at {DATA_PATH} with {num_samples} samples ({num_fraud} frauds).")
    return df

def evaluate_model(y_true, y_pred, model_name="Model"):
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    print(f"--- {model_name} Evaluation ---")
    print(f"Accuracy:  {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall:    {rec:.4f}")
    print(f"F1-Score:  {f1:.4f}\n")

def main():
    df = generate_synthetic_data(2000)
    
    # Features & Targets
    # We ignore transaction_id, supplier_id, product_id for generalizations,
    # but could include encoded supplier/product IDs if required.
    features = ["transaction_amount", "delivery_time", "ownership_frequency"]
    X = df[features]
    y = df["fraud_label"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    # 1. Random Forest (Supervised)
    rf_clf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_clf.fit(X_train, y_train)
    rf_pred = rf_clf.predict(X_test)
    evaluate_model(y_test, rf_pred, "Random Forest")
    
    # 2. Isolation Forest (Unsupervised - using train data without labels to find anomalies)
    # Isolation Forest outputs 1 for normal, -1 for anomaly.
    iso_clf = IsolationForest(contamination=0.05, random_state=42)
    iso_clf.fit(X_train) 
    iso_pred = iso_clf.predict(X_test)
    # Convert predictions (-1 = anomaly -> 1, 1 = normal -> 0)
    iso_pred_converted = np.where(iso_pred == -1, 1, 0)
    evaluate_model(y_test, iso_pred_converted, "Isolation Forest")
    
    # Save the models
    joblib.dump(rf_clf, MODEL_RF_PATH)
    joblib.dump(iso_clf, MODEL_IF_PATH)
    print(f"Models saved to {MODEL_RF_PATH} and {MODEL_IF_PATH}")

if __name__ == "__main__":
    main()
