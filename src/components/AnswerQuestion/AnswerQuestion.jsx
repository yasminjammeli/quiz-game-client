import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useQuizData from "./useQuizData";
import Timer from "./Timer";
import QuestionDisplay from "./QuestionDisplay";
import AnswerOptions from "./AnswerOptions";
import Popup from "../SubmitPopup/SubmitPopup";
import ScoreDisplay from "../ScoreDisplay/ScoreDisplay";
import './AnswerQuestion'
const AnswerQuestion = () => {
  const selectedCategory = useSelector((state) => state.quiz.selectedCategory);
  const { questions, questionImages, loading } = useQuizData(selectedCategory);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isScoreDisplayOpen, setScoreDisplayOpen] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/SelectTopic");
    }
  }, [selectedCategory, navigate]);

  const handleNextQuestion = () => {
    if (selectedAnswers.length > 0) {
      const correctAnswer = questions[currentQuestionIndex].correct_answer;
      if (selectedAnswers.includes(correctAnswer)) {
        setScore((prevScore) => prevScore + 40);
      }
      setSelectedAnswers([]);
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setPopupOpen(true);
      }
    }
  };

  const handleConfirm = () => {
    setPopupOpen(false);
    setScoreDisplayOpen(true);
  };

  const handleReview = () => {
    navigate("/ReviewQuiz", {
      state: {
        questions,
        selectedAnswers,
        categoryName: selectedCategory.name,
      },
    });
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers([answer]);
  };

  if (!selectedCategory) {
    return null;
  }

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentImage = questionImages[currentQuestionIndex];

  return (
    <div className="topic-selector">
      <div className="topic">
        <div className="head">
          <h2>{selectedCategory.name} Quiz</h2>
          <Timer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            onTimeUp={() => setScoreDisplayOpen(true)}
          />
        </div>
        <p>Answer the question below</p>
        {currentQuestion ? (
          <>
            <QuestionDisplay
              question={currentQuestion}
              image={currentImage}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
            />
            <h3>Choose answer</h3>
            <AnswerOptions
              answers={currentQuestion.answers}
              selectedAnswers={selectedAnswers}
              onAnswerSelect={handleAnswerSelect}
            />
            <button
              style={{ marginTop: "-40px" , marginLeft:"60%" }}
              className="btn"
              onClick={handleNextQuestion}
              disabled={selectedAnswers.length === 0}
            >
              {currentQuestionIndex + 1 === questions.length
                ? "Submit"
                : "Next"}
            </button>
          </>
        ) : (
          <p>You've completed the quiz!</p>
        )}
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleConfirm}
      />
      {isScoreDisplayOpen && (
        <ScoreDisplay score={score} onReview={handleReview} />
      )}
    </div>
  );
};

export default AnswerQuestion;
