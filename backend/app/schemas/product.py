from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    batch_number: str
    state: Optional[str] = "Created"

class ProductCreate(ProductBase):
    pass

class ProductInDBBase(ProductBase):
    id: int
    manufacturer_id: int
    current_owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Product(ProductInDBBase):
    pass
