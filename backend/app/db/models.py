from sqlalchemy import Column, Integer, String, Boolean, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.db.database import Base

class RoleEnum(str, enum.Enum):
    ADMIN = "Admin"
    MANUFACTURER = "Manufacturer"
    DISTRIBUTOR = "Distributor"
    RETAILER = "Retailer"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    is_active = Column(Boolean, default=True)
    wallet_address = Column(String, unique=True, index=True, nullable=True) # Web3 wallet

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String)
    manufacturer_id = Column(Integer, ForeignKey("users.id"))
    current_owner_id = Column(Integer, ForeignKey("users.id"))
    state = Column(String, default="Created")
    batch_number = Column(String, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    manufacturer = relationship("User", foreign_keys=[manufacturer_id])
    current_owner = relationship("User", foreign_keys=[current_owner_id])
    transactions = relationship("Transaction", back_populates="product")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    from_owner_id = Column(Integer, ForeignKey("users.id"))
    to_owner_id = Column(Integer, ForeignKey("users.id"))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    status_update = Column(String)
    blockchain_tx_hash = Column(String, nullable=True) # Ensure this matches Web3 integration
    
    product = relationship("Product", back_populates="transactions")
    from_owner = relationship("User", foreign_keys=[from_owner_id])
    to_owner = relationship("User", foreign_keys=[to_owner_id])
