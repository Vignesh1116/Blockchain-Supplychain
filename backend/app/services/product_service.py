from typing import List
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.db import models
from app.schemas import product as product_schema
from app.services.web3_service import web3_service

class ProductService:
    def create_product(self, db: Session, product_in: product_schema.ProductCreate, current_user: models.User) -> models.Product:
        if current_user.role not in [models.RoleEnum.MANUFACTURER, models.RoleEnum.ADMIN]:
            raise HTTPException(status_code=403, detail="Not enough permissions to add a product")

        # Check batch_number
        existing_product = db.query(models.Product).filter(models.Product.batch_number == product_in.batch_number).first()
        if existing_product:
            raise HTTPException(status_code=400, detail="Batch number already exists")

        # 1. Trigger blockchain transaction
        try:
            tx_hash = web3_service.register_product(product_in.name, product_in.batch_number)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Blockchain Registration Failed: {str(e)}")

        # 2. Store to Local Database
        product = models.Product(
            name=product_in.name,
            description=product_in.description,
            batch_number=product_in.batch_number,
            state=product_in.state,
            manufacturer_id=current_user.id,
            current_owner_id=current_user.id
        )
        db.add(product)
        db.commit()
        db.refresh(product)
        
        # Store creation transaction
        tx = models.Transaction(
            product_id=product.id,
            from_owner_id=current_user.id,
            to_owner_id=current_user.id,
            status_update="Product Created",
            blockchain_tx_hash=tx_hash
        )
        db.add(tx)
        db.commit()
        
        return product

    def transfer_product(self, db: Session, id: int, to_owner_id: int, new_state: str, current_user: models.User) -> models.Product:
        # Map front-end states to contract State enum indices
        state_map = {"Registered": 0, "Shipped": 1, "InTransit": 2, "Received": 3, "Sold": 4}
        if new_state not in state_map:
            raise HTTPException(status_code=400, detail="Invalid supply chain state")

        product = db.query(models.Product).filter(models.Product.id == id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
            
        if product.current_owner_id != current_user.id:
            raise HTTPException(status_code=403, detail="You do not own this product")

        new_owner = db.query(models.User).filter(models.User.id == to_owner_id).first()
        if not new_owner:
            raise HTTPException(status_code=404, detail="Recipient not found")
            
        if not new_owner.wallet_address:
            raise HTTPException(status_code=400, detail="Recipient has no mapped blockchain wallet address.")

        # 1. Trigger blockchain transaction
        try:
            tx_hash = web3_service.transfer_ownership(product.id, new_owner.wallet_address, state_map[new_state])
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Blockchain Transfer Failed: {str(e)}")

        # 2. Update Local Database Product
        product.current_owner_id = to_owner_id
        product.state = new_state
        
        # Log Transaction
        tx = models.Transaction(
            product_id=product.id,
            from_owner_id=current_user.id,
            to_owner_id=to_owner_id,
            status_update=new_state,
            blockchain_tx_hash=tx_hash
        )
        
        db.add(product)
        db.add(tx)
        db.commit()
        db.refresh(product)
        
        return product

    def get_product_history(self, db: Session, id: int) -> List[models.Transaction]:
        product = db.query(models.Product).filter(models.Product.id == id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
            
        transactions = db.query(models.Transaction).filter(models.Transaction.product_id == id).all()
        return transactions

product_service = ProductService()
