from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db import models
from app.schemas import product as product_schema
from app.schemas import transaction as tx_schema
from app.services.product_service import product_service

router = APIRouter()

@router.post("/", response_model=product_schema.Product)
def create_product(
    *,
    db: Session = Depends(deps.get_db),
    product_in: product_schema.ProductCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new product. Only accessible by registered users (typically Manufacturer).
    """
    return product_service.create_product(db, product_in=product_in, current_user=current_user)

@router.put("/{id}/transfer", response_model=product_schema.Product)
def transfer_product(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    to_owner_id: int,
    new_state: str,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Transfer ownership.
    """
    return product_service.transfer_product(db, id=id, to_owner_id=to_owner_id, new_state=new_state, current_user=current_user)

@router.get("/{id}/history", response_model=List[tx_schema.Transaction])
def get_product_history(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Track product transaction history.
    """
    return product_service.get_product_history(db, id=id)

@router.get("/{id}/blockchain", response_model=Any)
def get_blockchain_history(
    *,
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Query exact product state from Ethereum directly.
    """
    from app.services.web3_service import web3_service
    return web3_service.get_product_track(id)
