from app.models.login_register import RegisterRequest, LoginRequest, User

_fake_users = {"Username": "password123"}

def register_user(request: RegisterRequest) -> User:
    if request.username in _fake_users:
        raise ValueError("User already exists")
    _fake_users[request.username] = request.password
    return User(username=request.username)

def login_user(request: LoginRequest) -> User:
    if request.username not in _fake_users:
        raise ValueError("User not found")
    if _fake_users[request.username] != request.password:
        raise ValueError("Invalid password")
    return User(username=request.username)
