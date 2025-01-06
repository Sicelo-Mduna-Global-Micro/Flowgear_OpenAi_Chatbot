import React from "react";
import { questions } from "./mcqBodyQuestions";

interface McqBodyScoreCalculatorProps {
  calculateScore: () => number;
  isPassed: () => boolean;
  handleRetake: () => void;
}

const McqBodyScoreCalculator: React.FC<McqBodyScoreCalculatorProps> = ({
  calculateScore,
  isPassed,
  handleRetake,
}) => (
  <div className="score-display">
    <h2>
      Your Score: {calculateScore()} / {questions.length}
    </h2>
    <div
      className={`score-message ${
        isPassed() ? "pass-message" : "fail-message"
      }`}
    >
      {isPassed()
        ? "Congratulations! You passed the quiz!"
        : "Oops! You didn't pass. Better luck next time!"}
    </div>
    <button className="retake-btn" onClick={handleRetake}>
      Retake Quiz
    </button>
  </div>
);

export default McqBodyScoreCalculator;
