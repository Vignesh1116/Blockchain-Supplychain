import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

def train_risk_model():
    # 1. Load the existing dataset
    df = pd.read_csv('supply_chain_transactions.csv')
    
    # 2. Define Risk Level Labeling Logic (Supervised Simulation)
    # 0: Low, 1: Medium, 2: High
    def classify_risk(row):
        # HIGH RISK: Fraud detected OR extreme anomalies
        if (row['fraud_label'] == 1 or 
            row['transaction_amount'] > 3500 or 
            row['delivery_time'] > 18 or 
            row['ownership_frequency'] >= 7):
            return 2
        
        # MEDIUM RISK: Significant but non-fraud anomalies
        elif (row['transaction_amount'] > 1800 or 
              row['delivery_time'] > 9 or 
              row['ownership_frequency'] >= 4):
            return 1
        
        # LOW RISK: Normal behavior
        else:
            return 0

    print("Assigning risk labels based on transaction features...")
    df['risk_level'] = df.apply(classify_risk, axis=1)
    
    # 3. Features and Target
    features = ['transaction_amount', 'delivery_time', 'ownership_frequency']
    X = df[features]
    y = df['risk_level']
    
    # 4. Split and Train
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    print("Training Risk Prediction Model (Random Forest)...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # 5. Evaluate
    y_pred = model.predict(X_test)
    print("\nEvaluation Results:")
    print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=['Low', 'Medium', 'High']))
    
    # 6. Save Model
    joblib.dump(model, 'risk_model.pkl')
    print("\nRisk model saved as risk_model.pkl")

if __name__ == "__main__":
    train_risk_model()
