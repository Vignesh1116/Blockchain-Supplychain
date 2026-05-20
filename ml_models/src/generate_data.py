import pandas as pd
import numpy as np
import os

def generate_supply_chain_data(num_records=10000, output_file="ml_models/data/supply_chain_transactions.csv"):
    np.random.seed(42)
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    # Generate Normal Transactions (95%)
    normal_records = int(num_records * 0.95)
    fraud_records = num_records - normal_records
    
    # Normal Data
    data_normal = {
        "transaction_id": np.arange(1, normal_records + 1),
        "supplier_id": np.random.randint(100, 1000, normal_records),
        "product_id": np.random.randint(10000, 99999, normal_records),
        "transaction_amount": np.random.uniform(100, 5000, normal_records),
        "delivery_time": np.random.randint(1, 15, normal_records), # days
        "ownership_frequency": np.random.randint(1, 5, normal_records),
        "fraud_label": 0
    }
    
    # Fraudulent Data (Anomalies)
    data_fraud = {
        "transaction_id": np.arange(normal_records + 1, num_records + 1),
        "supplier_id": np.random.randint(100, 1000, fraud_records),
        "product_id": np.random.randint(10000, 99999, fraud_records),
        # Fraud often has higher amounts or very suspicious delivery times/ownership jumps
        "transaction_amount": np.random.uniform(5001, 20000, fraud_records),
        "delivery_time": np.random.choice([0, 30, 60], fraud_records), 
        "ownership_frequency": np.random.randint(6, 20, fraud_records),
        "fraud_label": 1
    }
    
    df_normal = pd.DataFrame(data_normal)
    df_fraud = pd.DataFrame(data_fraud)
    
    # Combine and Shuffle
    df = pd.concat([df_normal, df_fraud], ignore_index=True)
    df = df.sample(frac=1).reset_index(drop=True)
    
    # Ensure transaction_id is unique and properly ordered if needed, 
    # but shuffling is better for ML training.
    
    df.to_csv(output_file, index=False)
    print(f"Successfully generated {num_records} records in {output_file}")
    print(df.head())

if __name__ == "__main__":
    generate_supply_chain_data()
