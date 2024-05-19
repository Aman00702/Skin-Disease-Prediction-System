from flask import jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as img_processing
import numpy as np
from PIL import Image
from os import remove as delete_image


# Load the trained model
model = load_model("E:\Skin diease prediction system\Server\model\skin_prediction_model.h5")

# Define class names
class_names = ['Actinic keratosis','Atopic Dermatitis','Benign keratosis','Dermatofibroma','Melanocytic nevus','Melanoma','Squamous cell carcinoma','Tinea Ringworm Candidiasis','Vascular lesion']

# Preprocess the image
def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.resize((224, 224))


      # Resize the image to match the input size of the model
    img_array = img_processing.img_to_array(img)
    img_array /= 255.0  # Normalize the pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

def predict(files):
    if 'file' not in files:
        return jsonify({'error': 'No file part'})
    
    file = files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    img_path = 'temp.jpg'
    file.save(img_path)

    # Preprocess image
    img_array = preprocess_image(img_path)

    # Make prediction
    prediction = model.predict(img_array)
    predicted_class_index = np.argmax(prediction)
    predicted_class = class_names[predicted_class_index]
    confidence = prediction[0][predicted_class_index]
    delete_image(img_path)
    return jsonify({'prediction': predicted_class, 'confidence': float(confidence)})


