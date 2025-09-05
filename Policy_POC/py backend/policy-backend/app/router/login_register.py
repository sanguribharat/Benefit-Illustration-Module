from fastapi import APIRouter, HTTPException
from app.models.login_register import RegisterRequest, LoginRequest, User
from app.services import login_register_async

router = APIRouter()

@router.post("/register", response_model=User)
def register(request: RegisterRequest):
    try:
        return login_register_async.register_user(request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=User)
def login(request: LoginRequest):
    try:
        return login_register_async.login_user(request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
