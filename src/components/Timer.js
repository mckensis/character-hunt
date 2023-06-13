import { useContext, useEffect } from "react";
import GameContext from "../context/GameContext";

const Timer = () => {
  
  const {
    seconds,
    setSeconds,
    formatSeconds,
    timerActive,
  } = useContext(GameContext);

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerActive, setSeconds]);
  
  return (
    <h2>{formatSeconds(seconds)}</h2>
  )
}

export default Timer;