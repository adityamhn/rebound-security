import aiomysql
import aiosqlite
import os


SECRET_KEY = os.getenv("SECRET_KEY", "supersecretdevelopmentkey")

# Load the default database configuration
db_config = {
    "user": "root",
    "password": "password",
    "host": "143.244.143.214",
    "db": "auth_db",
    "port": 3306,
}

db_config_cowrie = {
    "user": "root",
    "password": "password",
    "host": "143.244.143.214",
    "db": "cowrie",
    "port": 3306,
}

class Database:
    def __init__(self, config=None):
        self.connection = None
        self.db_config = self.db_config = {**db_config, **(config or {})}
        
        print(self.db_config)
        # If config is provided, override the default db_config

    async def connect(self):
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




class SQLiteDatabase:
    def __init__(self, db_path="../dionaea.sqlite"):
        """
        Initializes the SQLite database connection with a specified database path.
        
        :param db_path: Relative or absolute path to the SQLite file. Default is '../../dionaea.sqlite'.
        """
        # Convert the provided db_path to an absolute path
        self.db_path = os.path.abspath(db_path)
        
        print(self.db_path)
        self.connection = None

    async def connect(self):
        """
        Establish a connection to the SQLite database.
        """
        self.connection = await aiosqlite.connect(self.db_path)

    async def get_connection(self):
        """
        Returns the current database connection, connecting if necessary.
        """
        if not self.connection:
            await self.connect()
        return self.connection

    async def close(self):
        """
        Closes the database connection if it exists.
        """
        if self.connection:
            await self.connection.close()
            self.connection = None
