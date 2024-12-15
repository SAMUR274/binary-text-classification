from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Load model, vectorizer, and label encoder
model = joblib.load("emotion_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Emoji map for emotions
emoji_map = {
    "happy": "😊",
    "sad": "😢",
    "anger": "😡",
    "surprise": "😲",
    "neutral": "😐",
    "fear": "😱",
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'text_input' not in data:
        return jsonify({"error": "No input provided"}), 400

    # Process input
    user_input = data['text_input']
    input_vec = vectorizer.transform([user_input])
    prediction = model.predict(input_vec)
    emotion = label_encoder.inverse_transform(prediction)[0]
    emoji = emoji_map.get(emotion, "❓")

    # Return JSON response
    return jsonify({"prediction": emotion, "emoji": emoji})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
