from argon2 import PasswordHasher
from argon2.exceptions import HashingError, VerifyMismatchError, VerificationError

p_hash = PasswordHasher()

def generate_hash(password: str):
    try:
        return p_hash.hash(password)
    except HashingError:
        raise HashingError.args[0]

def verify_password(old_hash:str, password:str) -> bool:
    try:
        return p_hash.verify(old_hash, password)
    except (VerifyMismatchError, VerificationError):
        return False