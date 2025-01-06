import React from "react";

const McqBodyButtonEventRaisers: React.FC<{
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmitQuiz: () => void;
}> = ({
  currentQuestionIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmitQuiz,
}) => (
  <div className="d-flex align-items-center pt-3">
    <div id="prev">
      <button
        className="btn btn-primary"
        onClick={onPrev}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>
    </div>
    <div className="ml-auto mr-sm-5">
      {currentQuestionIndex === totalQuestions - 1 ? (
        <button
          className="btn btn-danger submit-quiz-btn"
          onClick={onSubmitQuiz}
        >
          Submit Quiz
        </button>
      ) : (
        <button
          className="btn btn-success"
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
        >
          Next
        </button>
      )}
    </div>
  </div>
);

export default McqBodyButtonEventRaisers;
