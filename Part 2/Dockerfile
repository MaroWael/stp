# ---- Base image ----
FROM python:3.10-slim

# ---- System deps (VERY IMPORTANT) ----
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# ---- Set workdir ----
WORKDIR /app

# ---- Copy requirements first (better caching) ----
COPY requirements.txt .

# ---- Install Python deps ----
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# ---- Copy app code ----
COPY . .

# ---- Expose HF port ----
EXPOSE 7860

# ---- Run FastAPI ----
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
