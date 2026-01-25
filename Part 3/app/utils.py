# app/utils.py
from PIL import Image
import io

def read_image(file):
    image_bytes = file.file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return image
