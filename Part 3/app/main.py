from fastapi import FastAPI, UploadFile, File, HTTPException

from fastapi.responses import FileResponse, RedirectResponse
from app.model import predict_and_save
from app.utils import read_image
import os

app = FastAPI(title="VGG Table Demo")

@app.post("/extract-to-excel")
async def extract_table(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File is not an image")

    img = read_image(image)
    excel_file = predict_and_save(img)

    return FileResponse(
        path=excel_file,
        filename="extracted_table.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@app.get("/")
async def root():
    return RedirectResponse(url="/docs")