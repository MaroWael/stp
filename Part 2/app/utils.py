# app/utils.py
from PIL import Image
import io

def read_image(img_file):
    image_bytes = img_file.file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return image
