import aiomysql
import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretdevelopmentkey")


db_config = {
    "user": "root",
    "password": "Vaibhavv17",
    "host": "localhost",
    "db": "rebound",
    "port": 3307,
}

class Database:
    def __init__(self):
        self.connection = None

    async def connect(self):
        if self.connection is None or not self.connection.open:
            self.connection = await aiomysql.connect(
                user=db_config["user"],
                password=db_config["password"],
                host=db_config["host"],
                db=db_config["db"],
                port=db_config["port"],
            )

    async def get_connection(self):
        await self.connect()
        return self.connection

    async def close(self):
        if self.connection and self.connection.open:
            self.connection.close()
            
            
db_service = Database()