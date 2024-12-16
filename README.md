Emotion Classifier Web Application

This project is an Emotion Classifier Web Application that analyzes text inputs and classifies them into specific emotional categories (e.g., "happy," "sad," "angry," etc.). The system uses machine learning with a Flask backend API for processing text predictions and a Next.js frontend for delivering an interactive user interface.

Table of Contents
Project Overview
Technologies Used
Prerequisites
Backend Setup
Frontend Setup
Run the Application
Project Folder Structure
API Endpoints

Project Overview
Backend: A Flask-based REST API that processes text input and predicts the class.
Frontend: A Next.js-based web interface for user interaction with the prediction API.
Goal: To take user input, send it to the backend for processing, and display the result dynamically with relevant visuals.

Technologies Used
Backend:
Python 3.x
Flask
Scikit-learn (or any NLP libraries like spaCy, NLTK)
JSON for API communication

Frontend:
Node.js
Next.js 15.1.0
React.js
CSS/HTML for styling

Prerequisites
Before running this project, make sure you have the following installed:
Python 3.x: Install Python
Node.js & npm: Install Node.js
Flask: Install Flask using pip (pip install flask).
Next.js: Comes with npm when installed.
Git: Optional for cloning the repository.
Backend Setup

Navigate to the backend folder:
bash
Copy code
cd C:\Users\Varun G\Documents\GitHub\binary-text-classification\backend

Install backend dependencies:
bash
Copy code
pip install flask

# Add any other libraries if used (e.g., scikit-learn, numpy)
Run the Flask application:
bash
Copy code
python application.py

The backend will start and run at:
arduino
Copy code
http://127.0.0.1:5000

Backend Logs: You will see logs like:
csharp
Copy code
* Running on http://127.0.0.1:5000
* Debugger is active!
Frontend Setup

Navigate to the frontend folder:
bash
Copy code
cd C:\Users\Varun G\Documents\GitHub\binary-text-classification\frontend

Install frontend dependencies:
bash
Copy code
npm install

Run the Next.js development server:
bash
Copy code
npm run dev

The frontend will start at:
arduino
Copy code
http://localhost:3000

You will see output logs:
arduino
Copy code
▲ Next.js 15.1.0 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://169.254.5.254:3000
Run the Application

Start the Backend:
Open a terminal or command prompt.
Navigate to the backend folder and run:
bash
Copy code
python application.py

Start the Frontend:
Open another terminal or command prompt.
Navigate to the frontend folder and run:
bash
Copy code
npm run dev

Access the Application:
Open your browser and visit:
arduino
Copy code
http://localhost:3000

How It Works:
Enter text in the frontend UI input box.
The frontend sends a POST request to the Flask backend API (/predict endpoint).
The backend processes the text and returns a prediction.
The frontend displays the prediction and emoji based on the classification.
Project Folder Structure
php
Copy code
binary-text-classification/
│
├── backend/                # Flask API
│   ├── application.py      # Main Flask app
│   ├── model.pkl           # Serialized ML model (optional)
│   └── requirements.txt    # Backend dependencies
│
├── frontend/               # Next.js frontend
│   ├── pages/              # React pages
│   ├── public/             # Static assets
│   ├── styles/             # CSS files
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend documentation
│
└── README.md               # Main project README

API Endpoints
POST /predict
Description: Accepts input text and returns the predicted class.

Request:
json
Copy code
{
    "text": "Sample input text"
}

Response:
json
Copy code
{
    "prediction": "positive",
    "confidence": 0.95
}

Notes
Debug Mode: This application uses Flask's development server. Do not use it in production. Instead, deploy with WSGI servers like Gunicorn or uWSGI.
Next.js Telemetry: Next.js collects anonymous telemetry data. Learn more here: Next.js Telemetry.
