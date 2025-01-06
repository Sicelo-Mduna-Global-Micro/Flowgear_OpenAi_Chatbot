// navigationHandlers for the "Next" and "Previous" buttons in the mcqBody
export const HandleNextQuestion = (
  currentQuestionIndex: number,
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>,
  totalQuestions: number
) => {
  if (currentQuestionIndex < totalQuestions - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};

export const HandlePreviousQuestion = (
  currentQuestionIndex: number,
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
};

export const HandleCorrectAnswerSelection = (
  currentQuestionIndex: number,
  selectedAnswers: number[],
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>,
  index: number
) => {
  const newAnswers = [...selectedAnswers];
  newAnswers[currentQuestionIndex] = index;
  setSelectedAnswers(newAnswers);
};

