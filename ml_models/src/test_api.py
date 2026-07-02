import requests
import json

def test_fraud_api():
    url = "http://localhost:8000/predict-fraud"
    
    # Example payload from user request
    payload = {
        "transaction_amount": 5000.0,
        "delivery_time": 3.0,
        "ownership_frequency": 2
    }
    
    print(f"Sending request to {url}...")
    print(f"Payload: {json.dumps(payload, indent=2)}")
    
    try:
        response = requests.post(url, json=payload)
        
        # Check if request was successful
        if response.status_code == 200:
            result = response.json()
            print("\n" + "="*30)
            print("P R E D I C T I O N   R E S U L T")
            print("="*30)
            print(f"Fraud Prediction: {result['fraud_prediction']}")
            print(f"Message:          {result['message']}")
            print("="*30)
        else:
            print(f"Error: Received status code {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API. Make sure 'fraud_api_service.py' is running.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    test_fraud_api()
