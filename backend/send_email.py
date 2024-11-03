import os
import asyncio
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import Set

import aiohttp
import aiomysql  # Ensure aiomysql is installed
from dotenv import load_dotenv  # Optional, if using a .env file

# Load environment variables from a .env file if present
load_dotenv()

# Email sending function
def send_email(sender_email: str, sender_password: str, recipient_email: str, subject: str, body: str):
    try:
        # Create the email
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))

        # Connect to the Gmail SMTP server
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Encrypts the connection
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message.as_string())

        print(f"[{datetime.now()}] Email sent successfully for session.")
    except Exception as e:
        print(f"[{datetime.now()}] Failed to send email: {e}")

# Database configuration - adjust these settings as per your database
db_config = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER", "your_db_user"),
    "password": os.getenv("DB_PASSWORD", "your_db_password"),
    "db": os.getenv("DB_NAME", "your_database"),
    "autocommit": True,
}

# LogService class to interact with the database
class LogService:
    def __init__(self, pool):
        self.pool = pool

    async def getsessions(self, limit=None):
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                query = "SELECT * FROM sessions ORDER BY starttime DESC"
                if limit:
                    query += f" LIMIT {limit}"
                await cursor.execute(query)