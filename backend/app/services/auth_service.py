from sqlalchemy.orm import Session
from app.db import models
from app.schemas import user as user_schema
from app.core import security
from fastapi import HTTPException

class AuthService:
    def authenticate_user(self, db: Session, email: str, password: str) -> models.User:
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user or not security.verify_password(password, user.hashed_password):
            return None
        return user

    def register_new_user(self, db: Session, user_in: user_schema.UserCreate) -> models.User:
        user = db.query(models.User).filter(models.User.email == user_in.email).first()
        if user:
            raise HTTPException(
                status_code=400,
                detail="The user with this email already exists in the system.",
            )
        new_user = models.User(
            email=user_in.email,
            hashed_password=security.get_password_hash(user_in.password),
            full_name=user_in.full_name,
            role=user_in.role,
            is_active=True,
            wallet_address=user_in.wallet_address
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

auth_service = AuthService()
