import React from "react";
import { questions } from "./mcqBodyQuestions";

interface McqToolBarQuestionNavigatorProps {
  index: number;
  currentQuestionIndex: number;
  selectedAnswers: number[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  onClick: (index: number) => void;
}

const McqToolBarQuestionNavigator: React.FC<
  McqToolBarQuestionNavigatorProps
> = ({
  index,
  currentQuestionIndex,
  selectedAnswers,
  setSelectedAnswers,
  onClick,
}) => {
  const isAnswered = selectedAnswers[index] !== null;
  const isActive = index === currentQuestionIndex;
  const isLastQuestion = index === questions.length - 1;

  const getBlockStyle = (): React.CSSProperties => ({
    backgroundColor: isActive
      ? "#5a5a5a"
      : isLastQuestion
      ? "#FFCCCC"
      : isAnswered
      ? "#4CAF50"
      : "#87d0c9",
    border: isActive
      ? "2px solid white"
      : isLastQuestion
      ? "2px solid red"
      : "1px solid #000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: "5px",
    height: "40px",
    textAlign: "center",
    fontWeight: "bold",
    cursor: "pointer",
    color: "black",
    boxShadow: isActive ? "0 0 10px 4px rgba(255, 255, 255, 0.1)" : "none",
    animation: isActive ? "pulse 1.5s infinite" : "none",
    transition: "all 0.3s ease-in-out",
  });

  return (
    <div
      key={index}
      className={`question-block ${isAnswered ? "answered" : "unanswered"}`}
      onClick={() => onClick(index)}
      style={getBlockStyle()}
    >
      {index + 1}
    </div>
  );
};

export default McqToolBarQuestionNavigator;
