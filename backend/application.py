from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # CORS enabled

# Load model, vectorizer, and label encoder
model = joblib.load("emotion_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

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

    # inputs are processed here
    user_input = data['text_input']
    input_vec = vectorizer.transform([user_input])
    prediction = model.predict(input_vec)
    emotion = label_encoder.inverse_transform(prediction)[0]
    emoji = emoji_map.get(emotion, "❓")

    # TF-IDF scores to get a confidence score for important words
    feature_names = np.array(vectorizer.get_feature_names_out())
    word_importances = input_vec.toarray()[0] * vectorizer.idf_
    top_indices = word_importances.argsort()[-5:][::-1]
    significant_words = [
        {"word": feature_names[i], "score": round(word_importances[i], 2)}
        for i in top_indices if word_importances[i] > 0
    ]

    # return
    return jsonify({
        "prediction": emotion,
        "emoji": emoji,
        "important_words": significant_words
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
