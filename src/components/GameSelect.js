import { useContext, useEffect, useState } from "react";
import GameContext from "../context/GameContext";
import LevelCard from "./LevelCard";
import { handleSetFirestoreData } from "../handles/handleSetFirestoreData";

const GameSelect = () => {

  const { 
    session,
    setSession,
  } = useContext(GameContext);

  return (
    <section className="game-select">
      <section className="buttons">
        <button onClick={() => setSession({ ...session, page: "Home" })}>Back to Home</button>
      </section>

      <h3>Select a level to begin:</h3>
      <LevelsList />
    </section>
  )
}

const LevelsList = () => {
  
  const {
    levels,
    session,
    setSession,
  } = useContext(GameContext);

  const [loading, setLoading] = useState(true);

  // Display a loading message until levels have been retrieved from firestore
  useEffect(() => {
    if (levels) setLoading(false);
  }, [levels]);

  const handleStartGame = async (id) => {
    if (!id) return;

    // The ID of the game which was clicked / selected
    const game = levels.find(level => level.id === id);
    game.characters.forEach(character => {
      character.found = false;
    });

    const firestoreId = await handleSetFirestoreData(id);
    setSession({ ...session, gameOver: false, page: 'Game', game, firestoreId, leaderboard: game.id });
  }

  if (!loading) {
    return (
      <ul className="levels" onClick={(e) => handleStartGame(e.target.dataset.id)}>
      {levels?.map(level => (
        <LevelCard key={level.id} level={level} />
        ))}
      </ul>
    )
  }

  if (loading) {
    return <p>Loading...</p>
  }
}

export default GameSelect;