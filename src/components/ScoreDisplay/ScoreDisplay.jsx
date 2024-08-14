import "./ScoreDisplay.css";
import badge1 from "../../../public/assets/badge_1.png";
import badge2 from "../../../public/assets/badge_2.png";
import badge3 from "../../../public/assets/badge_3.png";
import badge4 from "../../../public/assets/badge_4.png";

const ScoreDisplay = ({ score, onReview }) => {
  console.log(score);
  const percentage = (score / 200) * 100;
  let badgeImage;
  let message;

  if (percentage >= 60) {
    badgeImage = badge1;
    message = "Congratulations you have passed";
  } else if (percentage >= 40) {
    badgeImage = badge2;
    message = "Congratulations you have passed";
  } else if (percentage >= 20) {
    badgeImage = badge3;
    message = "Congratulations you have passed";
  } else {
    badgeImage = badge4;
    message = "Failure is part of learning";
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={badgeImage} alt="badge" className="badge-image" />
        <h2>{message}</h2>
        <p>You Scored {percentage}%</p>
        <button className="btn-review" onClick={onReview}>
          Review Quiz
        </button>
      </div>
    </div>
  );
};

export default ScoreDisplay;
