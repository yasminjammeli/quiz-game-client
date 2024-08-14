const AnswerOptions = ({ answers, selectedAnswers, onAnswerSelect }) => {
    return (
      <ul className="answer-options">
        {answers.map((answer, i) => (
          <li key={i}>
            <label>
              <input
                type="radio"
                name="answer"
                onChange={() => onAnswerSelect(answer)}
                checked={selectedAnswers.includes(answer)}
              />
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </label>
          </li>
        ))}
      </ul>
    );
  };
  
  export default AnswerOptions;
  