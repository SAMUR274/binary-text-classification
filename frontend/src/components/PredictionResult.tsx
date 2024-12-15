interface Props {
    prediction: string | null;
    emoji: string | null;
  }
  
  const PredictionResult = ({ prediction, emoji }: Props) => {
    return prediction ? (
      <div className="mt-6 bg-green-100 p-4 rounded-md text-green-800 text-lg">
        <p>
          <strong>Emotion:</strong> {prediction} {emoji}
        </p>
      </div>
    ) : null;
  };
  
  export default PredictionResult;
  