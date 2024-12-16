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

1. **Navigate to the backend folder**:
   ```bash
   cd %directory%\binary-text-classification\backend
