from fastapi import FastAPI, File, UploadFile
from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import io

# Initialize FastAPI
app = FastAPI()

# Load the model
model_name = "Kaludi/food-category-classification-v2.0"
processor = AutoImageProcessor.from_pretrained(model_name)
model = AutoModelForImageClassification.from_pretrained(model_name)

@app.post("/classify/")
async def classify_image(file: UploadFile = File(...)):
    # Read image
    image = Image.open(io.BytesIO(await file.read())).convert("RGB")

    # Process image
    inputs = processor(images=image, return_tensors="pt")

    # Get prediction
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class = logits.argmax(-1).item()

    # Get class label
    label = model.config.id2label[predicted_class]

    return {"prediction": label}
