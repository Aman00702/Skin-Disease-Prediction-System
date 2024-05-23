from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from controller.prediction import predict
from controller.geminiAI import generate

app = Flask(__name__)
CORS(app)

# Route for prediction
@app.route('/predict', methods=['POST'])
def prediction():
    try:
        result = predict(request.files)  # Pass request data to the predict function if required
        return (result)  # Assuming predict returns a JSON serializable result
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return error response with status code 500

# Route for generation
@app.route('/generate', methods=['POST'])
def generation():
    try:
        result = generate(request.json)  # Pass request data to the generate function if required
        return (result)  # Assuming generate returns a JSON serializable result
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return error response with status code 500

if __name__ == '__main__':
    app.run(debug=True)
