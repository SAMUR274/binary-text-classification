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
  const [analyzedText, setAnalyzedText] = useState<string>("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [importantWords, setImportantWords] = useState<ImportantWord[]>([]);
  const [showAnalyzedText, setShowAnalyzedText] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({
    top: 0,
    left: 0,
  });
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    word: string,
    score: number
  ) => {
    setTooltipContent(`Confidence: ${(score * 100).toFixed(2)}%`);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipStyle({
      top: rect.bottom + window.scrollY + 5,
      left: e.clientX + 10,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    setTooltipStyle({
      top: e.clientY + 15,
      left: e.clientX + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
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
      setAnalyzedText(text); // Fix the analyzed text
      setTimeout(() => setShowAnalyzedText(true), 300);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error");
      setEmoji("❓");
      setImportantWords([]);
    }
  };

  const renderHighlightedText = (analyzedText: string, importantWords: ImportantWord[]) => {
    const words = analyzedText.split(" ");

    return words.map((word, index) => {
      const foundWord = importantWords.find(
        (item) => item.word.toLowerCase() === word.toLowerCase()
      );

      if (foundWord) {
        const { score } = foundWord;

        let bgColor = "bg-transparent";
        let borderColor = "border-transparent";
        let opacity = "opacity-50";

        // Highlight based on scores
        if (score >= 0.8) {
          bgColor = "bg-green-500";
          borderColor = "border-green-700";
          opacity = "opacity-100";
        } else if (score >= 0.5) {
          bgColor = "bg-yellow-400";
          borderColor = "border-yellow-500";
          opacity = "opacity-100";
        } else {
          bgColor = "bg-red-500";
          borderColor = "border-red-700";
          opacity = "opacity-100";
        }

        return (
          <span
            key={index}
            className={`${bgColor} ${borderColor} ${opacity} px-1 rounded-md border-2 cursor-pointer transition-all duration-300 hover:border-white-300`}
            onMouseEnter={(e) => handleMouseEnter(e, word, score)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );        
      }

      return <span key={index}>{word} </span>;
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
  
      {/* Question Mark Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={handleModalToggle}
          className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition text-2xl font-bold text-black dark:text-white"
          title="More Information"
        >
          ?
        </button>
      </div>

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Emotion Classifier</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Can't catch a vibe? Let the algorithm figure it out for you.
        </p>
      </header>
  
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-2">Emotion Information</h2>
            <h2 className="text-sm font-italic mb-2">The following are the range of possible emotions that can be evaluated using our dataset.</h2>
            <div className="text-xs text-gray-700 dark:text-gray-200 grid grid-cols-2 gap-1">
              <span>Admiration</span>
              <span>Amusement</span>
              <span>Anger</span>
              <span>Annoyance</span>
              <span>Approval</span>
              <span>Caring</span>
              <span>Confusion</span>
              <span>Curiosity</span>
              <span>Desire</span>
              <span>Disappointment</span>
              <span>Disapproval</span>
              <span>Disgust</span>
              <span>Embarrassment</span>
              <span>Excitement</span>
              <span>Fear</span>
              <span>Gratitude</span>
              <span>Grief</span>
              <span>Joy</span>
              <span>Love</span>
              <span>Nervousness</span>
              <span>Neutral</span>
              <span>Optimism</span>
              <span>Pride</span>
              <span>Realization</span>
              <span>Relief</span>
              <span>Remorse</span>
              <span>Sadness</span>
              <span>Shame</span>
              <span>Surprise</span>
            </div>
            <button
              onClick={handleModalToggle}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
              title="Close"
            >
              ✖
            </button>
          </div>
        </div>
      )}


      {/* Form and Prediction */}
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="relative w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full p-4 pb-12 border rounded-lg dark:bg-gray-700 dark:border-gray-600 resize-none overflow-hidden focus:outline-none transition-all duration-300"
              rows={2}
              style={{ minHeight: "80px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // Reset height to auto
                target.style.height = target.scrollHeight + "px"; // Adjust height to content
              }}
            />
            {/* Analyze Button */}
            <button
              type="submit"
              className="absolute bottom-2 right-2 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 py-1 px-1 rounded-full flex items-center gap-2 transition-all duration-300"
            >
              <img
                src="/images/arrow-tr.png"
                alt="Analyze Icon"
                className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity duration-300"
                style={{ filter: theme === "dark" ? "invert(1)" : "none" }}
              />
            </button>
          </div>
        </form>
  
        {prediction && (
          <div className="mt-6 text-center">
            <div className="inline-block bg-green-100 dark:bg-green-700 px-4 py-2 rounded-lg">
              Emotion: {prediction} {emoji}
            </div>
          </div>
        )}
      </div>
  
      {/* Analyzed Text */}
      {analyzedText && importantWords.length > 0 && (
        <div
          className={`mt-8 w-full max-w-2xl bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-opacity duration-500 ${
            showAnalyzedText ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">Analyzed Text:</h3>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed relative">
            {analyzedText.split(" ").map((word, index) => {
              const foundWord = importantWords.find(
                (item) => item.word.toLowerCase() === word.toLowerCase()
              );
  
              if (foundWord) {
                const { score } = foundWord;
                let bgColor = "bg-transparent";
                let borderColor = "border-transparent";
  
                if (score >= 0.8) {
                  bgColor = "bg-green-500";
                  borderColor = "border-green-700";
                } else if (score >= 0.5) {
                  bgColor = "bg-yellow-400";
                  borderColor = "border-yellow-500";
                } else {
                  bgColor = "bg-red-500";
                  borderColor = "border-red-700";
                }
  
                return (
                  <span
                    key={index}
                    onMouseEnter={(e) => handleMouseEnter(e, word, score)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`${bgColor} ${borderColor} opacity-100 px-1 rounded-md border-2 cursor-pointer transition-all duration-300`}
                  >
                    {word}{" "}
                  </span>
                );
              }
  
              return <span key={index}>{word} </span>;
            })}
          </p>
          {/* Tooltip */}
          {tooltipContent && (
            <div
              style={{
                position: "absolute",
                top: tooltipStyle.top,
                left: tooltipStyle.left,
                background: "rgba(0, 0, 0, 0.75)",
                color: "#fff",
                padding: "0.5rem",
                borderRadius: "0.25rem",
                fontSize: "0.875rem",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              {tooltipContent}
            </div>
          )}
        </div>
      )}
    </div>
  );
}  
