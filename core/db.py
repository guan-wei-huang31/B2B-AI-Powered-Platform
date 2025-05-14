from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.asyncio import AsyncSession

from core.config import settings

# engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))
async_engine = create_async_engine(str(settings.SQLALCHEMY_DATABASE_URI), pool_pre_ping=True)

# make sure all SQLModel models are imported (app.models) before initializing DB
# otherwise, SQLModel might fail to initialize relationships properly
# for more details: https://github.com/fastapi/full-stack-fastapi-template/issues/28


def init_db(session: AsyncSession) -> None:
    pass