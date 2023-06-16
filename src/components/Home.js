import LevelCard from "./LevelCard";
import GameContext from "../context/GameContext";
import { useContext, useEffect, useState } from "react";
import { handleSetFirestoreData } from "../handles/handleSetFirestoreData";

const Home = () => {
  
  const { session, setSession } = useContext(GameContext);

  return (
    <section className="home">
      <section className="buttons">
        <button onClick={() => setSession({ ...session, page: "Leaderboard" })}>Leaderboards</button>
      </section>

      <h3>Select a level to play:</h3>
      <LevelsList />

      <h3>How to play:</h3>
      <ul className="rules">
        <li>Each level has three hidden characters to be found.</li>
        <li>Click to open a popup and select the character you've found.</li>
        <li>Find all hidden characters within the level to finish.</li>
        <li>Submit your score to the leaderboard and compare your time with others.</li>
      </ul>
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

export default Home;