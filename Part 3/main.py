import os
import uuid
import aiofiles
from typing import Optional

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel

from sqlalchemy import Column, String
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.future import select

DATABASE_URL = (
    "postgresql+asyncpg://neondb_owner:npg_xqTf5glK0POH@"
    "ep-autumn-mode-ahb4pr64.c-3.us-east-1.aws.neon.tech/neondb"
    "?ssl=require"
)

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

IMAGE_DIR = "images"
os.makedirs(IMAGE_DIR, exist_ok=True)

class Image(Base):
    __tablename__ = "images"

    id = Column(String, primary_key=True, index=True)
    image_url = Column(String, nullable=False)

class ImageResponse(BaseModel):
    id: str
    image_url: str

app = FastAPI(title="FastAPI Image Upload (Simple)")

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/upload", response_model=ImageResponse)
async def upload_image(file: UploadFile = File(...)):
    # generate filename
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(IMAGE_DIR, filename)

    # async save file
    async with aiofiles.open(file_path, "wb") as f:
        await f.write(await file.read())

    image_url = f"/images/{filename}"
    image_id = str(uuid.uuid4())

    # save in DB
    async with AsyncSessionLocal() as db:
        img = Image(id=image_id, image_url=image_url)
        db.add(img)
        await db.commit()

    return {
        "id": image_id,
        "image_url": image_url
    }


@app.get("/images/{filename}")
async def serve_image(filename: str):
    path = os.path.join(IMAGE_DIR, filename)

    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Image not found")

    return FileResponse(path)
