import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ReviewQuiz.css";
import reviewQuiz from "../../../public/assets/review-image.png";

const ReviewQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    questions,
    selectedAnswers = [],
    categoryName,
  } = location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/SelectTopic"); 
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!questions) {
    return <div>No questions available</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = selectedAnswers[currentQuestionIndex] || "Not Answered";
  const correctAnswer = currentQuestion.correct_answer;

  return (
    <div className="topic-selector">
      <div className="topic">
        <div className="head">
          <h2>Review {categoryName} Quiz</h2>
          <h3 className="quiz-timer">
            Timer: <span>29:23</span> Mins
          </h3>
        </div>
        <p>Review the question below</p>

        <div className="question-review">
          <div className="section">
            <div className="section-left">
              <img src={reviewQuiz} alt="Review" />
            </div>
            <div className="section-right">
              <h3>
                Question {currentQuestionIndex + 1}/{questions.length}
              </h3>
              <p
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
              ></p>
            </div>
          </div>
          <h3>Choose answer</h3>
          <ul className="answer-options">
            {currentQuestion.answers.map((answer, i) => (
              <li key={i}>
                <label>
                  <div className="answer">
                    <input
                      type="radio"
                      name="answer"
                      value={answer}
                      disabled // Answers are displayed in read-only mode
                      checked={
                        answer === userAnswer || answer === correctAnswer
                      }
                    />
                    <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                    {answer === correctAnswer && (
                      <strong>Correct Answer</strong>
                    )}
                    {answer === userAnswer && userAnswer !== correctAnswer && (
                      <strong>Your Answer</strong>
                    )}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="navigation-buttons">
          {currentQuestionIndex > 0 && (
            <button onClick={handlePreviousQuestion}>Previous</button>
          )}
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex + 1 === questions.length
              ? "New Quiz"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewQuiz;
