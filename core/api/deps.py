from typing import Annotated, Generator, AsyncGenerator
from google import genai

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from core.vector_db import VectorSession, vector_session
from core.config import settings
from core.db import async_engine

async_session_maker = async_sessionmaker(bind=async_engine, expire_on_commit=False)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

def get_ai_client() -> Generator[genai.Client, None, None]:
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)
    yield client

def get_vector_session() -> Generator[VectorSession, None, None]:
    yield vector_session


SessionDep = Annotated[AsyncSession, Depends(get_db)]
AIClientDep = Annotated[genai.Client, Depends(get_ai_client)]
VectorSessionDep = Annotated[VectorSession, Depends(get_vector_session)]
