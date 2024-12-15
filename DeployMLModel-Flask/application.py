from flask import Flask, request, render_template
import joblib

# Initialize the Flask app
app = Flask(__name__)

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
    "neutral": "BRUHHHH",
    "fear": "😱",
    # Add more emotions as required
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get user input
    user_input = request.form['text_input']
    # Vectorize input
    input_vec = vectorizer.transform([user_input])
    # Predict emotion
    prediction = model.predict(input_vec)
    emotion = label_encoder.inverse_transform(prediction)[0]
    emoji = emoji_map.get(emotion, "❓")
    return render_template('index.html', prediction_text=f'Emotion: {emotion} {emoji}')

if __name__ == "__main__":
    app.run(debug=True)