import { useEffect } from "react";
const Timer = ({ timeLeft, setTimeLeft, onTimeUp }) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerId);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [setTimeLeft, onTimeUp]);
  const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(14, 5);
  };
  return <h2 className="quiz-timer">Timer: {formatTime(timeLeft)} Mins</h2>;
};

export default Timer;
