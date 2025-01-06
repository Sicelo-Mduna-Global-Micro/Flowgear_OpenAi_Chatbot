import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import McqBodyQuestionOptionsRendering from "./mcqBodyQuestionOptionsRendering";
import McqBodyButtonEventRaisers from "./mcqBodyButtonEventRaisers";
import {
  HandleNextQuestion,
  HandlePreviousQuestion,
  HandleCorrectAnswerSelection,
} from "./mcqBodyButtonEventHandlers";

interface Question {
  question: string;
  options: string[];
  correctAnswer?: number;
}
interface McqBodyProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;

  selectedAnswers: number[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  onSubmitQuiz: () => void; // Added prop to handle quiz submission
}

const McqBody: React.FunctionComponent<McqBodyProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedAnswers,
  setSelectedAnswers,
  onSubmitQuiz,
}) => {
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mcqBody_outer_container-wrapper">
      <div className="mcqBody_inner_container mt-sm-5 my-1">
        <McqBodyQuestionOptionsRendering
          question={currentQuestion}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onOptionChange={(index) =>
            HandleCorrectAnswerSelection(
              currentQuestionIndex,
              selectedAnswers,
              setSelectedAnswers,
              index
            )
          }
        />
        <McqBodyButtonEventRaisers
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrev={() =>
            HandlePreviousQuestion(
              currentQuestionIndex,
              setCurrentQuestionIndex
            )
          }
          onNext={() =>
            HandleNextQuestion(
              currentQuestionIndex,
              setCurrentQuestionIndex,
              questions.length
            )
          }
          onSubmitQuiz={onSubmitQuiz}
        />
      </div>
    </div>
  );
};

export default McqBody;
