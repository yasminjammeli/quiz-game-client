import "./Instruction.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import quizImage from "../../../public/assets/quiz.jpg"; 

const Instruction = () => {
  const selectedCategory = useSelector((state) => state.quiz.selectedCategory);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (!selectedCategory) {
      navigate("/SelectTopic");
    }
  }, [selectedCategory, navigate]);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
  }, []);

  const handleStartQuiz = () => {
    navigate("/AnswerQuestion");
  };

  return (
    <div className="quiz-container">
      <div className="quiz-instruction">
        <h2>{selectedCategory?.name || "Quiz"} Quiz</h2>
        <p>Answer the question below</p>
        <div className="quiz-detail">
          <img
            src={quizImage} 
            alt="Quiz"
          />
          <div className="content">
            <p>
              <span className="date">Date:</span> {currentDate}
            </p>
            <p>
              <span className="time">Time Limit:</span> 30 Mins
            </p>
            <p>
              <span className="attempt">Attempts:</span> Once
            </p>
            <p>
              <span className="point">Points:</span> 200 Points
            </p>
          </div>
        </div>
        <div className="instructions">
          <h3>Instructions</h3>
          <p>
            This quiz consists of 5 multiple-choice questions. To be successful
            with the quizzes, it's important to be conversant with the topics.
            Keep the following in mind:
          </p>
          <p>
            Timing - You need to complete each of your attempts in one sitting,
            as you are allotted 30 minutes to each attempt. Answers - You may
            review your answer-choices and compare them to the correct answers
            after your final attempt.
          </p>
          <p>
            To start, click the "Start" button. When finished, click the
            "Submit" button.
          </p>
        </div>
        <button className="startQuiz"  onClick={handleStartQuiz}>
          Start
        </button>
      </div>
    </div>
  );
};

export default Instruction;
