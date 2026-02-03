const sections = [
    {
        title: "FastAPI Image Upload",
        text: `
We start by receiving an image from the client.
FastAPI provides UploadFile to handle file uploads efficiently using streams.
This avoids loading the entire file into memory.
        `,
        code: `
@app.post("/extract-to-excel")
async def extract_table(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File is not an image")
        `
    },

    {
        title: "Reading the Image (Bytes → PIL)",
        text: `
Uploaded files arrive as raw bytes.
Image libraries like Pillow expect a file-like object,
so we wrap the bytes using BytesIO.
        `,
        code: `
def read_image(file):
    image_bytes = file.file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return image
        `
    },

    {
        title: "Loading a Pretrained VGG Model",
        text: `
We use a pretrained VGG16 model.
Since the model is already trained, we must respect
the same preprocessing and input format it was trained on.
        `,
        code: `
weights = VGG16_Weights.DEFAULT
model = vgg16(weights=weights)
model.eval().to(device)
        `
    },

    {
        title: "Image Preprocessing (Transforms)",
        text: `
Before inference, the image must be resized, converted to a tensor,
and normalized using ImageNet statistics.
This step translates the image into the model's language.
        `,
        code: `
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])
        `
    },

    {
        title: "Batch Dimension",
        text: `
Deep learning models always expect inputs in batches.
Even when we have only one image,
we must add a batch dimension.
        `,
        code: `
img_tensor = transform(image)
img_tensor = img_tensor.unsqueeze(0)
# Shape: [1, 3, 224, 224]
        `
    },

    {
        title: "Inference Mode",
        text: `
During inference, we do not train the model.
We disable gradient calculation to improve speed
and reduce memory usage.
        `,
        code: `
with torch.no_grad():
    output = model(img_tensor)
        `
    },

    {
        title: "Converting Output to Confidence",
        text: `
The raw output of the model is a set of scores.
We apply softmax to convert these scores into probabilities
and extract the highest confidence.
        `,
        code: `
probs = F.softmax(output, dim=1)
confidence = float(probs.max())
        `
    },

    {
        title: "Saving Results to Excel",
        text: `
Instead of returning JSON, we save the results
into an Excel file using pandas.
        `,
        code: `
df = pd.DataFrame({
    "Row_ID": [1, 2, 3],
    "Detected_Feature": ["Header", "Cell_Content", "Footer"],
    "Confidence": [confidence, 0.85, 0.90]
})

df.to_excel("output_table.xlsx", index=False)
        `
    },

    {
        title: "Returning the Excel File",
        text: `
FastAPI provides FileResponse to stream files
directly to the client as a download.
        `,
        code: `
return FileResponse(
    path="output_table.xlsx",
    filename="extracted_table.xlsx",
    media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
)
        `
    },

    {
        title: "Docker & Hugging Face Deployment",
        text: `
Docker ensures that the application runs the same everywhere.
Hugging Face Spaces expects the app to listen on port 7860.
        `,
        code: `
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 7860

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
        `
    }
];

let index = 0;
const slidesEl = document.getElementById("slides");
const counter = document.getElementById("counter");

function render() {
    slidesEl.innerHTML = sections.map((s, i) => `
        <div class="slide ${i === index ? "active" : ""}">
            <h1>${s.title}</h1>
            <p>${s.text}</p>
            <pre>${s.code}</pre>
        </div>
    `).join("");

    counter.textContent = `Slide ${index + 1} / ${sections.length}`;
}

function next() {
    if (index < sections.length - 1) index++;
    render();
}

function prev() {
    if (index > 0) index--;
    render();
}

render();
