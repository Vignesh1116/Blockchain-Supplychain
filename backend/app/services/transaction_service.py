from typing import List
from sqlalchemy.orm import Session
from app.db import models

class TransactionService:
    def get_all_transactions(self, db: Session, skip: int, limit: int, current_user: models.User) -> List[models.Transaction]:
        if current_user.role != models.RoleEnum.ADMIN:
            transactions = db.query(models.Transaction).filter(
                (models.Transaction.to_owner_id == current_user.id) | 
                (models.Transaction.from_owner_id == current_user.id)
            ).offset(skip).limit(limit).all()
            return transactions

        # Admin sees all
        transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
        return transactions

transaction_service = TransactionService()
