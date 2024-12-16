from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Load model, vectorizer, and label encoder
model = joblib.load("emotion_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Emoji mapping
emoji_map = {
    "admiration": "😍",
    "amusement": "😂",
    "anger": "😡",
    "annoyance": "😒",
    "approval": "👍",
    "caring": "🤗",
    "confusion": "🤔",
    "curiosity": "🧐",
    "desire": "🥰",
    "disappointment": "😞",
    "disapproval": "👎",
    "disgust": "🤢",
    "embarrassment": "😳",
    "excitement": "🤩",
    "fear": "😱",
    "gratitude": "🙏",
    "grief": "😭",
    "joy": "😄",
    "love": "❤️",
    "nervousness": "😬",
    "neutral": "😐",
    "optimism": "🙂",
    "pride": "🏆",
    "realization": "💡",
    "relief": "😌",
    "remorse": "😔",
    "sadness": "😢",
    "shame": "😳",
    "surprise": "😲",
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data or 'text_input' not in data:
        return jsonify({"error": "No input provided"}), 400

    # Text handling
    user_input = data['text_input']
    input_vec = vectorizer.transform([user_input])
    prediction = model.predict(input_vec)
    emotion = label_encoder.inverse_transform(prediction)[0]
    emoji = emoji_map.get(emotion, "❓")

    # Score words using TF-IDF vectorization
    feature_names = np.array(vectorizer.get_feature_names_out())
    word_importances = input_vec.toarray()[0] * vectorizer.idf_

    # normalize it for standard calculation
    if len(word_importances) > 0:
        min_score = word_importances.min()
        max_score = word_importances.max()
        normalized_importances = (word_importances - min_score) / (max_score - min_score)
    else:
        normalized_importances = word_importances

    # number of words to highlight based on length
    total_words = len(user_input.split())
    num_highlights = max(2, min(total_words // 5, 10))

    confidence_threshold = 0.2  # change it as required

    # TF-IDF vectorized scoring
    top_indices = normalized_importances.argsort()[::-1]
    significant_words = [
        {"word": feature_names[i], "score": round(normalized_importances[i], 2)}
        for i in top_indices
        if normalized_importances[i] >= confidence_threshold
    ][:num_highlights]

    # response
    return jsonify({
        "prediction": emotion,
        "emoji": emoji,
        "important_words": significant_words
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
