from services.db import db_service
from werkzeug.security import generate_password_hash, check_password_hash


db_config = {
    "user": "root",
    "password": "password",
    "host": "143.244.143.214",
    "db": "cowrie",
    "port": 3306,
}


class LogService:
    def __init__(self, db):
        self.db = db

    async def getauth(self):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM AUTH")
            result = await cursor.fetchone()
            return result is not None


log_service = LogService(db=db_service)