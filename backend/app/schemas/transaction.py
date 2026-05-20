from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionBase(BaseModel):
    product_id: int
    from_owner_id: int
    to_owner_id: int
    status_update: str
    blockchain_tx_hash: Optional[str] = None

class TransactionCreate(TransactionBase):
    pass

class TransactionInDBBase(TransactionBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class Transaction(TransactionInDBBase):
    pass
