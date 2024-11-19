from flask import Flask, request, render_template
import pickle

application = Flask(__name__)  # Initialize the Flask app
model = pickle.load(open('emotion_model.pkl', 'rb'))  # Load the emotion classifier model

# Emoji mapping based on emotions
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
    '''
    For rendering results on HTML GUI
    '''
    # Get text input from the form
    text_input = request.form['text_input']
    
    # Predict emotion
    emotion = model.predict([text_input])[0]  # Get the predicted emotion
    emoji = emoji_map.get(emotion, "❓")  # Default to a question mark if emotion is unknown

    # Display the emotion with an emoji
    return render_template('index.html', prediction_text=f'Emotion: {emotion} {emoji}')

if __name__ == "__main__":
    application.run(debug=True)
