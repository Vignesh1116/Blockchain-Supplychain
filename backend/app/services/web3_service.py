import json
from web3 import Web3
from fastapi import HTTPException
from app.core.config import settings

# A simplified ABI just for the methods we interact with from Python
SUPPLY_CHAIN_ABI = json.loads('''[
    {
      "inputs": [
        {"internalType": "string", "name": "_name", "type": "string"},
        {"internalType": "string", "name": "_batchNumber", "type": "string"}
      ],
      "name": "registerProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "uint256", "name": "_productId", "type": "uint256"},
        {"internalType": "address", "name": "_newOwner", "type": "address"},
        {"internalType": "enum SupplyChain.State", "name": "_newState", "type": "uint8"}
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "uint256", "name": "_productId", "type": "uint256"}
      ],
      "name": "getProductTrack",
      "outputs": [
        {"internalType": "uint256", "name": "id", "type": "uint256"},
        {"internalType": "string", "name": "name", "type": "string"},
        {"internalType": "string", "name": "batchNumber", "type": "string"},
        {"internalType": "address", "name": "manufacturer", "type": "address"},
        {"internalType": "address", "name": "currentOwner", "type": "address"},
        {"internalType": "uint8", "name": "state", "type": "uint8"},
        {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
      ],
      "stateMutability": "view",
      "type": "function"
    }
]''')

import time
import uuid

class Web3Service:
    def __init__(self):
        self.mock_mode = settings.ENABLE_BLOCKCHAIN_MOCK
        if not self.mock_mode:
            try:
                self.w3 = Web3(Web3.HTTPProvider(settings.WEB3_RPC_URL))
                self.account = self.w3.eth.account.from_key(settings.WEB3_PRIVATE_KEY)
                self.contract = self.w3.eth.contract(
                    address=settings.WEB3_CONTRACT_ADDRESS,
                    abi=SUPPLY_CHAIN_ABI
                )
            except Exception:
                print("Blockchain connection failed, falling back to MOCK mode.")
                self.mock_mode = True

    def _send_transaction(self, function_call) -> str:
        """Helper to build, sign, and send a transaction to the network."""
        if self.mock_mode:
            return f"0x{uuid.uuid4().hex}"

        if not self.w3.is_connected():
            raise HTTPException(status_code=500, detail="Unable to connect to Ethereum network")

        nonce = self.w3.eth.get_transaction_count(self.account.address)
        
        # Build transaction
        transaction = function_call.build_transaction({
            'chainId': self.w3.eth.chain_id,
            'gas': 2000000,
            'gasPrice': self.w3.eth.gas_price,
            'nonce': nonce,
        })
        
        # Sign transaction
        signed_txn = self.w3.eth.account.sign_transaction(transaction, private_key=self.account.key)
        
        # Send transaction
        tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        return self.w3.to_hex(tx_hash)

    def register_product(self, name: str, batch_number: str) -> str:
        if self.mock_mode:
            return f"0x{uuid.uuid4().hex}"
        call = self.contract.functions.registerProduct(name, batch_number)
        return self._send_transaction(call)

    def transfer_ownership(self, product_id: int, new_owner_address: str, new_state: int) -> str:
        if self.mock_mode:
            return f"0x{uuid.uuid4().hex}"
        call = self.contract.functions.transferOwnership(product_id, new_owner_address, new_state)
        return self._send_transaction(call)

    def get_product_track(self, product_id: int):
        if self.mock_mode:
            return {
                "id": product_id,
                "name": "Precision Alloy X",
                "batchNumber": f"BATCH-{product_id}100",
                "manufacturer": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                "currentOwner": "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
                "state": 1,
                "timestamp": int(time.time())
            }

        if not self.w3.is_connected():
            raise HTTPException(status_code=500, detail="Unable to connect to Ethereum network")
            
        try:
            track = self.contract.functions.getProductTrack(product_id).call()
            return {
                "id": track[0],
                "name": track[1],
                "batchNumber": track[2],
                "manufacturer": track[3],
                "currentOwner": track[4],
                "state": track[5],
                "timestamp": track[6]
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error reading from blockchain: {str(e)}")

web3_service = Web3Service()
