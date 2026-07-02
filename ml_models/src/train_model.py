import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

def train_fraud_detection_models():
    # 1. Load dataset
    data_path = 'supply_chain_transactions.csv'
    print(f"Loading dataset from {data_path}...")
    df = pd.read_csv(data_path)

    # 2. Define Features and Target
    features = ['transaction_amount', 'delivery_time', 'ownership_frequency']
    target = 'fraud_label'
    
    X = df[features]
    y = df[target]

    # 3. Split dataset (80/20)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print("\n" + "="*50)
    print("M O D E L   1 :   R A N D O M   F O R E S T")
    print("="*50)
    
    # 4. Train RandomForestClassifier
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    
    # Evaluate RandomForest
    rf_preds = rf_model.predict(X_test)
    print(f"Accuracy:  {accuracy_score(y_test, rf_preds):.4f}")
    print(f"Precision: {precision_score(y_test, rf_preds):.4f}")
    print(f"Recall:    {recall_score(y_test, rf_preds):.4f}")
    print(f"F1-score:  {f1_score(y_test, rf_preds):.4f}")
    print("\nClassification Report (Random Forest):")
    print(classification_report(y_test, rf_preds))

    print("\n" + "="*50)
    print("M O D E L   2 :   I S O L A T I O N   F O R E S T")
    print("="*50)

    # 5. Train IsolationForest (Unsupervised/Anomaly Detection)
    # Contamination based on training set ratio
    contamination = y_train.mean() 
    iso_forest = IsolationForest(contamination=contamination, random_state=42)
    iso_forest.fit(X_train)
    
    # IsolationForest returns -1 for anomaly and 1 for normal
    # We map it to 1 for fraud (anomaly) and 0 for normal
    iso_preds_raw = iso_forest.predict(X_test)
    iso_preds = np.where(iso_preds_raw == -1, 1, 0)
    
    print(f"Accuracy:  {accuracy_score(y_test, iso_preds):.4f}")
    print(f"Precision: {precision_score(y_test, iso_preds):.4f}")
    print(f"Recall:    {recall_score(y_test, iso_preds):.4f}")
    print(f"F1-score:  {f1_score(y_test, iso_preds):.4f}")
    print("\nClassification Report (Isolation Forest):")
    print(classification_report(y_test, iso_preds))

    # 6. Save the supervised model (Random Forest) as requested
    model_filename = 'fraud_model.pkl'
    joblib.dump(rf_model, model_filename)
    print(f"\nModel saved successfully as {model_filename}")

if __name__ == "__main__":
    train_fraud_detection_models()
