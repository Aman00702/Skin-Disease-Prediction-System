from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

#load api from env file
load_dotenv()
api=os.getenv("gemini_api")


#geminiAi integration
def generate(prompt):
  genai.configure(api_key=api)

# Set up the model
  generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 0,
    "max_output_tokens": 2048,
  }

  safety_settings = [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
  ]

  model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                generation_config=generation_config,
                                safety_settings=safety_settings)

  convo = model.start_chat(history=[
  ])

  convo.send_message(prompt["message"]);
  return jsonify({
    "generated":convo.last.text
  })

if __name__ == '__main__':
    app.run(debug=True)