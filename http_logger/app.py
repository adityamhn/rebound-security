import os
import asyncio
from datetime import datetime
from typing import Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import aiomysql
import aiohttp
from dotenv import load_dotenv
import logging

# Load environment variables from a .env file if present
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Database configuration from environment variables
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", 3306))
DB_USER = os.getenv("DB_USER", "http_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "your_secure_password")
DB_NAME = os.getenv("DB_NAME", "http_logs")

# Database connection pool
db_pool: Optional[aiomysql.Pool] = None

# Define the lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_pool
    # Startup: Initialize the database connection pool
    try:
        db_pool = await aiomysql.create_pool(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            db=DB_NAME,
            autocommit=True,
            minsize=1,
            maxsize=10,
        )
        logger.info("Database pool created.")
        yield
    finally:
        # Shutdown: Close the database connection pool
        if db_pool:
            db_pool.close()
            await db_pool.wait_closed()
            logger.info("Database pool closed.")

# Initialize FastAPI with the lifespan handler
app = FastAPI(lifespan=lifespan)

# Middleware to log each request
@app.middleware("http")
async def log_requests(request: Request, call_next):
    # Get request details
    method = request.method
    path = request.url.path
    headers = dict(request.headers)
    
    # Get client IP
    client_host = request.client.host if request.client else "Unknown"

    # Serialize headers to a string
    headers_serialized = "\n".join(f"{k}: {v}" for k, v in headers.items())

    # Insert log into the database asynchronously
    insert_query = """
        INSERT INTO requests (method, path, headers, user_ip)
        VALUES (%s, %s, %s, %s)
    """

    try:
        async with db_pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(insert_query, (method, path, headers_serialized, client_host))
                logger.info(f"Logged request from {client_host} to {path}.")
    except Exception as e:
        logger.error(f"Error logging request: {e}")

    # Proceed with handling the request
    response = await call_next(request)
    return response

# A simple root endpoint
@app.get("/")
async def root():
    return JSONResponse(content={"message": "Welcome to Rebound API!"})
