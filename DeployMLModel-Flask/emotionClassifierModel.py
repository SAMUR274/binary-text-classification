import pandas as pd
import re
import os
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from pathlib import Path  # For relative path handling

# Function to clean text using basic regex
def clean_text_simple(text):
    text = str(text).lower()  # Convert to lowercase
    text = re.sub(r"[^\w\s]", "", text)  # Remove punctuation
    text = re.sub(r"\s+", " ", text)  # Replace multiple spaces with a single space
    return text.strip()

# Get the base directory (the directory containing this script)
base_dir = Path(__file__).resolve().parent

# Path to the datasets directory (relative to the script's location)
datasets_dir = base_dir / "datasets"

# Load datasets using relative paths
train_file_path = datasets_dir / "train_sent_emo.csv"
test_file_path = datasets_dir / "test_sent_emo.csv"
emotion_dataset_file_path = datasets_dir / "emotion_dataset.csv"
emotion_recognition_test_path = datasets_dir / "Emotion_Dataset_for_Emotion_Recognition_Tasks_test.csv"
emotion_recognition_train_path = datasets_dir / "Emotion_Dataset_for_Emotion_Recognition_Tasks_training.csv"
emotion_recognition_val_path = datasets_dir / "Emotion_Dataset_for_Emotion_Recognition_Tasks_validation.csv"
emotion_dataset_raw_path = datasets_dir / "emotion_dataset_raw.csv"


# Read datasets
train_df = pd.read_csv(train_file_path)
test_df = pd.read_csv(test_file_path)
emotion_dataset_df = pd.read_csv(emotion_dataset_file_path)
emotion_recognition_test_df = pd.read_csv(emotion_recognition_test_path)
emotion_recognition_train_df = pd.read_csv(emotion_recognition_train_path)
emotion_recognition_val_df = pd.read_csv(emotion_recognition_val_path)
emotion_dataset_raw_df = pd.read_csv(emotion_dataset_raw_path)

# Load GoEmotions datasets
goemotions_paths = [os.path.join(datasets_dir, f"goemotions_{i}.csv") for i in range(1, 4)]
goemotions_dfs = [pd.read_csv(path) for path in goemotions_paths]

# Standardize column names
train_df.rename(columns={'Utterance': 'text', 'Emotion': 'emotion'}, inplace=True)
test_df.rename(columns={'Utterance': 'text', 'Emotion': 'emotion'}, inplace=True)
emotion_dataset_df.rename(columns={'Text': 'text', 'Emotion': 'emotion'}, inplace=True)
emotion_recognition_train_df.rename(columns={'text': 'text', 'label': 'emotion'}, inplace=True)
emotion_recognition_test_df.rename(columns={'text': 'text', 'label': 'emotion'}, inplace=True)
emotion_recognition_val_df.rename(columns={'text': 'text', 'label': 'emotion'}, inplace=True)
emotion_dataset_raw_df.rename(columns={'Text': 'text', 'Emotion': 'emotion'}, inplace=True)

# Process GoEmotions datasets to derive 'emotion'
for df in goemotions_dfs:
    emotion_cols = ['admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring', 'confusion',
                    'curiosity', 'desire', 'disappointment', 'disapproval', 'disgust', 'embarrassment',
                    'excitement', 'fear', 'gratitude', 'grief', 'joy', 'love', 'nervousness', 'optimism',
                    'pride', 'realization', 'relief', 'remorse', 'sadness', 'surprise', 'neutral']
    df['emotion'] = df[emotion_cols].idxmax(axis=1)
    df.rename(columns={'text': 'text'}, inplace=True)

# Combine datasets
all_data = pd.concat([train_df, test_df, emotion_dataset_df, emotion_recognition_train_df,
                      emotion_recognition_test_df, emotion_recognition_val_df,
                      emotion_dataset_raw_df] + goemotions_dfs, ignore_index=True)

# Keep only 'text' and 'emotion' columns, and drop missing values
all_data = all_data[['text', 'emotion']].dropna()

# Clean text
all_data['cleaned_text'] = all_data['text'].apply(clean_text_simple)

# Splitting the data
X = all_data['cleaned_text']
y = all_data['emotion']

# Ensure 'emotion' column is consistent
y = all_data['emotion'].astype(str)

# Splitting the data
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp)

# Vectorize text
vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_val_vec = vectorizer.transform(X_val)
X_test_vec = vectorizer.transform(X_test)

# Encode labels
encoder = LabelEncoder()
y_train_enc = encoder.fit_transform(y_train)
y_val_enc = encoder.transform(y_val)
y_test_enc = encoder.transform(y_test)

# Train a Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_vec, y_train_enc)

# Evaluate the model
y_val_pred = model.predict(X_val_vec)
print("Validation Performance:")
print(classification_report(y_val_enc, y_val_pred, target_names=encoder.classes_))

# Test the model
y_test_pred = model.predict(X_test_vec)
print("Test Performance:")
print(classification_report(y_test_enc, y_test_pred, target_names=encoder.classes_))

# Save the model
import joblib
joblib.dump(model, "emotion_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
joblib.dump(encoder, "label_encoder.pkl")