from dotenv import load_dotenv
import os
import asyncio,asyncpg


load_dotenv()
password = os.getenv("DATABASE_PASSWORD")
dns = f"postgresql://blog_user:{password}@localhost/blog_db"

async def create_app_pool():
    pass