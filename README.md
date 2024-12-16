# Emotion Classifier Web Application

This project is an **Emotion Classifier Web Application** that analyzes text inputs and classifies them into specific emotional categories (e.g., *happy*, *sad*, *angry*, etc.). The system uses **machine learning** with a Flask backend API for processing text predictions and a Next.js frontend for delivering an interactive user interface.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Run the Application](#run-the-application)
- [Project Folder Structure](#project-folder-structure)
- [API Endpoints](#api-endpoints)
- [Notes](#notes)

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
- Scikit-learn (or other NLP libraries like spaCy, NLTK)
- JSON for API communication

### Frontend:
- Node.js
- Next.js 15.1.0
- React.js
- CSS/HTML for styling

---

## Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.x**: [Download and install Python](https://www.python.org/).
- **Node.js & npm**: [Download and install Node.js](https://nodejs.org/).
- **Flask**: Install Flask using pip:
  ```bash
  pip install flask
