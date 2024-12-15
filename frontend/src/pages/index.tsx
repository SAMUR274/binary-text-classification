"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [importantWords, setImportantWords] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_input: text }),
      });
      const data = await response.json();
      setPrediction(data.prediction);
      setEmoji(data.emoji);
      setImportantWords(data.important_words || []);
    } catch (error) {
      console.error("Error predicting emotion:", error);
      setPrediction("Error");
      setEmoji("❓");
      setImportantWords([]);
    }
  };

  // Highlight important words
  const renderHighlightedText = () => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const isImportant = importantWords.includes(word.toLowerCase());
      return (
        <span
          key={index}
          className={isImportant ? "bg-yellow-300 px-1 rounded" : ""}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-6 sm:p-12">
      <h1 className="text-4xl font-bold mb-6">Emotion Classifier</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Analyze Emotion
        </button>
      </form>

      {/* Display Prediction */}
      {prediction && (
        <div className="mt-6 text-center">
          <div className="text-xl font-semibold">
            Emotion: {prediction} {emoji}
          </div>
          <div className="mt-4 text-lg">
            {renderHighlightedText()}
          </div>
        </div>
      )}
    </div>
  );
}
