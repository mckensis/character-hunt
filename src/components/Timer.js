import { useContext, useEffect } from "react";
import GameContext from "context/GameContext";
import { formatTime } from "helpers/formatTime";

const Timer = () => {
  
  const {
    time,
    setTime,
    timerActive,
  } = useContext(GameContext);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!timerActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerActive, setTime]);

  return (
    <h2 className="timer">{formatTime(time)}</h2>
  )
}

export default Timer;