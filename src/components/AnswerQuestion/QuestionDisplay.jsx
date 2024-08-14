
const QuestionDisplay = ({ question, image, currentIndex, totalQuestions }) => {
    return (
      <div className="question-section">
        <div className="section">
          <div className="section-left">
            <img src={image} alt="question" className="question-image" />
          </div>
          <div className="section-right">
            <h2 style={{ marginTop: "0" }}>
              Question {currentIndex + 1}/{totalQuestions}
            </h2>
            <p  dangerouslySetInnerHTML={{ __html: question.question }}></p>
          </div>
        </div>
      </div>
    );
  };
  
  export default QuestionDisplay;
  