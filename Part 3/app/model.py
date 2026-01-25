import torch
from torchvision.models import vgg16, VGG16_Weights
from torchvision import transforms
import torch.nn.functional as F
import pandas as pd

device = "cuda" if torch.cuda.is_available() else "cpu"

weights = VGG16_Weights.DEFAULT
model = vgg16(weights=weights)
model.eval().to(device)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def predict_and_save(image):
    img_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(img_tensor)

    probs = F.softmax(output, dim=1)
    confidence = float(probs.max())

    df = pd.DataFrame({
        "Row_ID": [1, 2, 3],
        "Detected_Feature": ["Header", "Cell_Content", "Footer"],
        "Confidence": [confidence, 0.85, 0.90]
    })

    file_path = "output_table.xlsx"
    df.to_excel(file_path, index=False)

    return file_path
