import requests
import json

def test_risk_api():
    url = "http://localhost:8001/predict-risk"
    
    # Test cases: Low, Medium, High
    test_cases = [
        {"name": "Low Risk", "data": {"transaction_amount": 1000.0, "delivery_time": 5.0, "ownership_frequency": 2}},
        {"name": "Medium Risk", "data": {"transaction_amount": 2000.0, "delivery_time": 10.0, "ownership_frequency": 5}},
        {"name": "High Risk", "data": {"transaction_amount": 5000.0, "delivery_time": 25.0, "ownership_frequency": 10}}
    ]
    
    for case in test_cases:
        print(f"\nTesting {case['name']}...")
        try:
            response = requests.post(url, json=case['data'])
            if response.status_code == 200:
                result = response.json()
                print(f"Risk Score: {result['risk_score']}")
                print(f"Risk Level: {result['risk_level']}")
                print(f"Details:    {json.dumps(result['details'], indent=2)}")
            else:
                print(f"Error {response.status_code}: {response.text}")
        except Exception as e:
            print(f"Connection failed: {e}")

if __name__ == "__main__":
    test_risk_api()
