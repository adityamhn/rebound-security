import os
import asyncio
from datetime import datetime

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import aiomysql
from typing import Optional

# Initialize FastAPI app
app = FastAPI()

# Database connection pool
db_pool: Optional[aiomysql.Pool] = None

# Database configuration from environment variables
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", 3306))
DB_USER = os.getenv("DB_USER", "http_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "your_secure_password")
DB_NAME = os.getenv("DB_NAME", "http_logs")

# Initialize the database connection pool
async def init_db_pool():
    global db_pool
    if db_pool is None:
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

# Shutdown the database pool on application shutdown
@app.on_event("shutdown")
async def shutdown_event():
    global db_pool
    if db_pool:
        db_pool.close()
        await db_pool.wait_closed()

# Middleware to log each request
@app.middleware("http")
async def log_requests(request: Request, call_next):
    # Initialize DB pool if not already done
    await init_db_pool()

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
    except Exception as e:
        print(f"[{datetime.now()}] Error logging request: {e}")

    # Proceed with handling the request
    response = await call_next(request)
    return response

# A simple root endpoint
@app.get("/")
async def root():
    return JSONResponse(content={"message": "HTTP Logger is running."})
