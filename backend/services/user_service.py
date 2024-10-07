from werkzeug.security import generate_password_hash, check_password_hash
from services.db import Database
class UserService:
    def __init__(self):
        self.db = Database()

    async def check_user_exists(self, username):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT username FROM users WHERE username=%s", (username,))
            result = await cursor.fetchone()
            return result is not None

    async def create_user(self, username, password, email):
        conn = await self.db.get_connection()
        hashed_password = generate_password_hash(password)
        async with conn.cursor() as cursor:
            await cursor.execute(
                "INSERT INTO users (username, password, email) VALUES (%s, %s, %s)",
                (username, hashed_password, email),
            )
            await conn.commit()


    async def get_user_password(self, username):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT password FROM users WHERE username=%s", (username,))
            result = await cursor.fetchone()
            return result[0] if result else None

    async def verify_password(self, stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
    
    
user_service = UserService()