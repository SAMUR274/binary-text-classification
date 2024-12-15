"use client";

import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

interface ImportantWord {
  word: string;
  score: number;
}

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [importantWords, setImportantWords] = useState<ImportantWord[]>([]);
  const [showAnalyzedText, setShowAnalyzedText] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnalyzedText(false);
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
      setTimeout(() => setShowAnalyzedText(true), 300);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error");
      setEmoji("❓");
      setImportantWords([]);
    }
  };

  const renderHighlightedText = () => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const foundWord = importantWords.find(
        (item) => item.word.toLowerCase() === word.toLowerCase()
      );
      return foundWord ? (
        <span
          key={index}
          data-tooltip-id={`tooltip-${index}`}
          className="bg-yellow-300 dark:bg-yellow-500 px-1 rounded-md cursor-pointer"
        >
          {word}
          <Tooltip
            id={`tooltip-${index}`}
            place="top"
            content={`Confidence: ${foundWord.score}`}
            className="text-sm"
          />
        </span>
      ) : (
        <span key={index}>{word} </span>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          title="Toggle Theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Emotion Classifier</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Discover emotions and word significance.
        </p>
      </header>

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full p-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows={4}
          />
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
            Analyze Emotion
          </button>
        </form>

        {prediction && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-green-100 dark:bg-green-700 px-4 py-2 rounded-lg">
              Emotion: {prediction} {emoji}
            </div>
          </div>
        )}
      </div>

      {text && importantWords.length > 0 && (
        <div
          className={`mt-8 w-full max-w-2xl bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-500 ${
            showAnalyzedText ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">Analyzed Text:</h3>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {renderHighlightedText()}
          </p>
        </div>
      )}
    </div>
  );
}
