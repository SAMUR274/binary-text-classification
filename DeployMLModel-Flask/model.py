from flask import Flask, request, render_template
import pickle
from textblob import TextBlob

class SimpleEmotionClassifier:
    def predict(self, text_list):
        emotions = []
        for text in text_list:
            blob = TextBlob(text)
            if blob.sentiment.polarity > 0.1:
                emotions.append("happy")
            elif blob.sentiment.polarity < -0.1:
                emotions.append("sad")
            else:
                emotions.append("neutral")
        return emotions

application = Flask(__name__)  # Initialize the Flask app
model = pickle.load(open('emotion_model.pkl', 'rb'))  # Load the emotion classifier model

emoji_map = {
    "happy": "😊",
    "sad": "😢",
    "neutral": "😐"
}

@application.route('/')
def home():
    return render_template('index.html')

@application.route('/predict', methods=['POST'])
def predict():
    text_input = request.form['text_input']
    emotion = model.predict([text_input])[0]
    emoji = emoji_map.get(emotion, "❓")

    return render_template('index.html', prediction_text=f'Emotion: {emotion} {emoji}')

if __name__ == "__main__":
    application.run(debug=True)
