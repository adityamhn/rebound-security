import aiomysql
import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretdevelopmentkey")

# Load the default database configuration
db_config = {
    "user": "root",
    "password": "Vaibhavv17",
    "host": "localhost",
    "db": "rebound",
    "port": 3307,
}

class Database:
    def __init__(self, config=None):
        self.connection = None
        self.db_config = self.db_config = {**db_config, **(config or {})}
        # If config is provided, override the default db_config

    async def connect(self):
        if not self.connection:
            # Establish a new connection if not already connected
            self.connection = await aiomysql.connect(
                user=self.db_config["user"],
                password=self.db_config["password"],
                host=self.db_config["host"],
                db=self.db_config["db"],
                port=self.db_config["port"],
            )

    async def get_connection(self):
        await self.connect()
        return self.connection

    async def close(self):
        if self.connection:
            await self.connection.ensure_closed()
            self.connection = None

# Instantiate the Database class without a config parameter (it will use default db_config)
db_service = Database()
