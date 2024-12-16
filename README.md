# Emotion Classifier Web Application

This project is an **Emotion Classifier Web Application** that analyzes text inputs and classifies them into specific emotional categories (e.g., *"happy," "sad," "angry," etc.*). The system uses machine learning with a **Flask backend API** for processing text predictions and a **Next.js frontend** for delivering an interactive user interface.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Prerequisites](#prerequisites)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Run the Application](#run-the-application)
7. [Project Folder Structure](#project-folder-structure)
8. [API Endpoints](#api-endpoints)

---

## Project Overview

- **Backend**: A Flask-based REST API that processes text input and predicts the class.
- **Frontend**: A Next.js-based web interface for user interaction with the prediction API.
- **Goal**: To take user input, send it to the backend for processing, and display the result dynamically with relevant visuals.

---

## Technologies Used

### Backend:
- Python 3.x
- Flask
- Scikit-learn (or any NLP libraries like spaCy, NLTK)
- JSON for API communication

### Frontend:
- Node.js
- Next.js 15.1.0
- React.js
- Tailwind CSS
- Typescript

---

## Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.x**: [Install Python](https://www.python.org/)
- **Node.js & npm**: [Install Node.js](https://nodejs.org/)
- **Flask**: Install Flask using pip (`pip install flask`)
- **Next.js**: Comes with npm when installed.
- **Git**: Optional for cloning the repository.

---

## Backend Setup
Navigate to the backend folder:
```bash
cd C:\Users\Varun G\Documents\GitHub\emotionclassifier\backend
```

Install backend dependencies:
```bash
pip install flask scikit-learn
```

Run the Flask application:
```bash
python application.py
```

Backend is running at:
- URL: http://127.0.0.1:5000

## Frontend Setup
Navigate to the frontend folder:
```bash
cd C:\Users\Varun G\Documents\GitHub\emotionclassifier\frontend
```

Install frontend dependencies:
```bash
npm install
```

Run the Next.js development server:
```bash
npm run dev
```

Frontend is running at:
- URL: http://localhost:3000

## Run the Application

### Start the Backend
Open a terminal and run:
```bash
python application.py
```

### Start the Frontend
Open another terminal and run:
```bash
npm run dev
```

### Access the Application
Open your browser and visit:
```
http://localhost:3000
```

## How It Works
1. Enter text in the frontend UI input box.
2. The frontend sends a POST request to the Flask backend (/predict endpoint).
3. The backend processes the text and returns a prediction.
4. The frontend displays the prediction and relevant emoji based on the classification.

## Project Folder Structure
```
emotionclassifier/
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
```

## API Endpoints

### POST /predict
**Description:** Accepts input text and returns the predicted class.

**Request:**
```json
{
  "text": "Sample input text"
}
```

**Response:**
```json
{
  "prediction": "happy",
  "confidence": 0.95
}
```

## Notes
- **Debug Mode:** This application uses Flask's development server. Do not use it in production. Deploy with WSGI servers like Gunicorn or uWSGI.
- **Next.js Telemetry:** Next.js collects anonymous telemetry data. [Learn more here](https://nextjs.org/telemetry)

