interface HighlightedTextProps {
  text: string;
  importantWords: string[];
}

export default function HighlightedText({
  text,
  importantWords,
}: HighlightedTextProps) {
  // Split the text into words and highlight important words
  const words = text.split(" ");
  const highlightedText = words.map((word, index) => {
    const isImportant = importantWords.includes(word.toLowerCase());
    return (
      <span
        key={index}
        className={isImportant ? "bg-yellow-300 px-1 rounded-md" : ""}
      >
        {word}{" "}
      </span>
    );
  });

  return (
    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-2">Analyzed Text:</h3>
      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
        {highlightedText}
      </p>
    </div>
  );
}
