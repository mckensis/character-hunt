import { createContext, useEffect, useState } from "react";
import { handleGetFirestoreData } from "../handles/handleGetFirestoreData";

const GameContext = createContext({});

export const DataProvider = ({ children }) => {

  const [session, setSession] = useState({
    page: 'Home',
    gameOver: true,
    game: null,
  });

  let [levels, setLevels] = useState(null);

  // Run on page load to grab leaderboards and available levels from firestore 
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const data = await handleGetFirestoreData();
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
    }}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContext;