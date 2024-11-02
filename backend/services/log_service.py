from services.db import Database
from werkzeug.security import generate_password_hash, check_password_hash




class LogService:
    def __init__(self, db):
        self.db = db

    async def getauth(self):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM auth")
            result = await cursor.fetchall()  # Fetch all rows instead of just one
            return result
    
    async def getactions(self):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM input")
            result = await cursor.fetchall()  # Fetch all rows instead of just one
            return result
