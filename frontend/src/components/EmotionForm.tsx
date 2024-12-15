import { useState } from "react";

interface Props {
  onSubmit: (inputText: string) => void;
}

const EmotionForm = ({ onSubmit }: Props) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something here..."
        className="p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        rows={4}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Predict Emotion
      </button>
    </form>
  );
};

export default EmotionForm;
