const sections = [
    {
        title: "1️⃣ Uploading Images with FastAPI",
        text: `
FastAPI uses <b>UploadFile</b> to handle file uploads efficiently.
It supports streaming and avoids loading the entire file into memory.
        `,
        code: `image: UploadFile = File(...)`,
        question: "Why do we use UploadFile instead of bytes?",
        options: [
            "Because it looks nicer",
            "It supports streaming and metadata",
            "Python requires it",
            "It enables GPU usage"
        ],
        answer: 1,
        explanation: "UploadFile is designed for file uploads and is memory efficient."
    },

    {
        title: "2️⃣ Reading Image Bytes",
        text: `
Uploaded images arrive as raw bytes.
We wrap them using BytesIO so image libraries can read them like files.
        `,
        code: `
image_bytes = file.file.read()
image = Image.open(BytesIO(image_bytes)).convert("RGB")
        `,
        question: "Why do we use BytesIO?",
        options: [
            "To compress the image",
            "To convert bytes to text",
            "To make bytes behave like a file",
            "To resize the image"
        ],
        answer: 2,
        explanation: "PIL expects a file-like object. BytesIO provides that."
    },

    {
        title: "3️⃣ Image Preprocessing",
        text: `
Pretrained models expect images in the same format they were trained on.
This step translates the image into the model’s language.
        `,
        code: `
transforms.Resize((224,224))
transforms.ToTensor()
transforms.Normalize(mean, std)
        `,
        question: "Why do we use ImageNet mean and std?",
        options: [
            "Random choice",
            "Required by FastAPI",
            "Because VGG was trained using them",
            "To increase image resolution"
        ],
        answer: 2,
        explanation: "The model learned using these exact normalization values."
    },

    {
        title: "4️⃣ Inference Mode",
        text: `
During inference, we only want predictions.
We disable training behavior to make execution faster and lighter.
        `,
        code: `
model.eval()
with torch.no_grad():
    output = model(img_tensor)
        `,
        question: "What is the purpose of torch.no_grad()?",
        options: [
            "Train faster",
            "Reduce memory and speed up inference",
            "Enable GPU",
            "Normalize output"
        ],
        answer: 1,
        explanation: "Gradients are not needed during inference."
    },

    {
        title: "5️⃣ Batch Dimension",
        text: `
Deep learning models expect inputs in batches,
even if the batch contains only one image.
        `,
        code: `
img_tensor.unsqueeze(0)
# [3,224,224] → [1,3,224,224]
        `,
        question: "What does unsqueeze(0) do?",
        options: [
            "Adds color channel",
            "Adds batch dimension",
            "Resizes image",
            "Normalizes tensor"
        ],
        answer: 1,
        explanation: "Models always expect a batch dimension."
    },

    {
        title: "6️⃣ Returning Excel from FastAPI",
        text: `
Instead of returning JSON, we send a downloadable Excel file.
        `,
        code: `
return FileResponse(
    path=excel_file,
    filename="extracted_table.xlsx"
)
        `,
        question: "Why use FileResponse?",
        options: [
            "Faster than JSON",
            "Required by pandas",
            "To send files directly to the client",
            "To compress data"
        ],
        answer: 2,
        explanation: "FileResponse streams files correctly to the client."
    },

    {
        title: "7️⃣ Docker & Deployment",
        text: `
Docker guarantees the app runs the same everywhere,
including Hugging Face Spaces.
        `,
        code: `
FROM python:3.10-slim
EXPOSE 7860
CMD ["uvicorn", "app.main:app"]
        `,
        question: "Why do we expose port 7860?",
        options: [
            "Python requirement",
            "Docker default",
            "Hugging Face Spaces standard port",
            "GPU communication"
        ],
        answer: 2,
        explanation: "Hugging Face Spaces listens on port 7860."
    }
];

const app = document.getElementById("app");

sections.forEach((sec, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h2>${sec.title}</h2>
        <p>${sec.text}</p>
        <pre>${sec.code}</pre>
        <h4>${sec.question}</h4>
        ${sec.options.map((opt, i) =>
            `<div class="option" onclick="checkAnswer(this, ${i}, ${sec.answer}, '${sec.explanation}')">${opt}</div>`
        ).join("")}
        <div class="feedback"></div>
    `;

    app.appendChild(card);
});

function checkAnswer(el, selected, correct, explanation) {
    const parent = el.parentElement;
    const feedback = parent.querySelector(".feedback");

    if (selected === correct) {
        el.classList.add("correct");
        feedback.innerHTML = "✅ Correct! " + explanation;
    } else {
        el.classList.add("wrong");
        feedback.innerHTML = "❌ Wrong. " + explanation;
    }
}
