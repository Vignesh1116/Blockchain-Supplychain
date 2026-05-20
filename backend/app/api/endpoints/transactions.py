from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.db import models
from app.schemas import transaction as tx_schema
from app.services.transaction_service import transaction_service

router = APIRouter()

@router.get("/", response_model=List[tx_schema.Transaction])
def read_transactions(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve transactions globally. 
    Can be restricted based on role logic.
    """
    return transaction_service.get_all_transactions(db, skip=skip, limit=limit, current_user=current_user)
