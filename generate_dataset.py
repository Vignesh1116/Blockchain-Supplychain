
import pandas as pd
import numpy as np
import os

# Set seed for reproducibility
np.random.seed(42)

def generate_synthetic_data(num_records=10000):
    # Number of unique suppliers and products
    num_suppliers = 100
    num_products = 500

    # Generate IDs
    transaction_ids = [f"TXN_{i:05d}" for i in range(1, num_records + 1)]
    supplier_ids = [f"SUP_{np.random.randint(1, num_suppliers + 1):03d}" for _ in range(num_records)]
    product_ids = [f"PROD_{np.random.randint(1, num_products + 1):03d}" for _ in range(num_records)]

    # Initialize fraud label (95% normal, 5% fraud)
    fraud_label = np.random.choice([0, 1], size=num_records, p=[0.95, 0.05])

    # Base values for transaction amount
    transaction_amount = np.random.normal(loc=1000, scale=300, size=num_records)
    # Base values for delivery time (in days)
    delivery_time = np.random.normal(loc=5, scale=2, size=num_records)
    # Base values for ownership frequency
    ownership_frequency = np.random.randint(1, 5, size=num_records)

    # Adjust values for fraud records to make them detectable
    for i in range(num_records):
        if fraud_label[i] == 1:
            # Fraudulent transactions often exhibit anomalies
            # High amount or extreme outlier
            if np.random.random() > 0.5:
                transaction_amount[i] *= np.random.uniform(2, 5)
            else:
                transaction_amount[i] /= np.random.uniform(2, 5)
            
            # Unusual delivery times (either way too fast or way too slow)
            delivery_time[i] = np.random.choice([
                np.random.uniform(0.5, 1.5), # Too fast
                np.random.uniform(15, 30)    # Too slow
            ])
            
            # High ownership frequency (potentially indicating middle-men/laundering)
            ownership_frequency[i] = np.random.randint(6, 15)

    # Ensure no negative values for amount and time
    transaction_amount = np.maximum(transaction_amount, 10.0)
    delivery_time = np.maximum(delivery_time, 0.5)

    # Round numerical columns
    transaction_amount = np.round(transaction_amount, 2)
    delivery_time = np.round(delivery_time, 1)

    # Create DataFrame
    df = pd.DataFrame({
        'transaction_id': transaction_ids,
        'supplier_id': supplier_ids,
        'product_id': product_ids,
        'transaction_amount': transaction_amount,
        'delivery_time': delivery_time,
        'ownership_frequency': ownership_frequency,
        'fraud_label': fraud_label
    })

    return df

if __name__ == "__main__":
    print("Generating synthetic supply chain data...")
    df = generate_synthetic_data(10000)
    
    # Save to CSV
    output_file = "supply_chain_transactions.csv"
    df.to_csv(output_file, index=False)
    
    print(f"Dataset saved to {output_file}")
    print("\nFirst 5 records:")
    print(df.head())
    
    print("\nFraud count summary:")
    print(df['fraud_label'].value_counts())
