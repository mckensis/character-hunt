import { createContext, useEffect, useState } from "react";
import { handleGetFirestoreLevelData } from "../handles/handleGetFirestoreData";

const GameContext = createContext({});

export const DataProvider = ({ children }) => {

  const [session, setSession] = useState({
    page: 'Home',
    gameOver: true,
    game: null,
    firestoreId: null
  });

  const [levels, setLevels] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatTimer = (time) => {
    const min = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const sec = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const millisec = ("0" + ((time / 10) % 100)).slice(-2);

    return `${min}:${sec}.${millisec}`;
  }

  // Run on page load to retrieve available levels from firestore 
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const data = await handleGetFirestoreLevelData();
        setLevels(data);
      } catch (err) {
        console.log(err.message);
      }
    }
    retrieveData();
  }, []);

  return (
    <GameContext.Provider value={{
      session, setSession, levels,
      timerActive, setTimerActive,
      time, setTime,
      seconds, setSeconds, formatTimer,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext;