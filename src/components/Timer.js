import { useContext, useEffect } from "react";
import GameContext from "../context/GameContext";

const Timer = () => {
  
  const {
    time,
    setTime,
    formatTimer,
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
    <h2>{formatTimer(time)}</h2>
  )
}

export default Timer;