import { createContext, useEffect, useState } from "react";
import { handleGetFirestoreLevelData } from "../handles/handleGetFirestoreData";
import { handleUnlockScroll } from "helpers/handleUnlockScroll";
import { handleDeleteFirestoreTempData } from "handles/handleSetFirestoreData";

const GameContext = createContext({});

export const DataProvider = ({ children }) => {

  const [session, setSession] = useState({
    page: "Home",
    game: null,
    gameOver: true,
    leaderboard: null,
    firestoreId: null,
  });

  const [levels, setLevels] = useState(null);
  const [time, setTime] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [timerActive, setTimerActive] = useState(false);
  const [welcomePopupVisible, setWelcomePopupVisible] = useState(false);

  const handleQuitGame = () => {
    handleUnlockScroll();
    // TO-DO: Delete data from firestore for incomplete session
    const sessionCopy = { ...session };
    sessionCopy.game.characters.forEach(character => {
      character.found = false;
    });
    setSeconds(0);
    handleDeleteFirestoreTempData(session.firestoreId);
    setSession({ ...sessionCopy, game: null, gameOver: true, page: "Home", leaderboard: null, firestoreId: null });
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
      time, setTime, handleQuitGame,
      seconds, setSeconds,
      welcomePopupVisible, setWelcomePopupVisible,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext;