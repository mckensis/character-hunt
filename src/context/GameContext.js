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
  const [seconds, setSeconds] = useState(0);

  const formatSeconds = (seconds) => {
    const pad = (n) => n < 10 ? `0${n}` : n;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds / 60) - (h * 60);
    const s = Math.floor(seconds - h * 3600 - m * 60);

    return `${pad(h)}:${pad(m)}:${pad(s)}`;
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
      seconds, setSeconds, formatSeconds,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext;