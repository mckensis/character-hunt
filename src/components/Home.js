import LevelCard from "./LevelCard";
import GameContext from "../context/GameContext";
import { useContext, useEffect, useState } from "react";
import { handleSetFirestoreData } from "../handles/handleSetFirestoreData";
import { handleDownloadImageFromStorage } from "../handles/handleGetFirestoreData";

const Home = () => {
  
  return (
    <section className="home">
      <Buttons />
      <LevelsList />
      <Rules />
    </section>
  )
}

const Rules = () => {
  return (
    <article className="rules">
      <h3>How to play:</h3>
      <ul className="rules">
        <li>Each level has three hidden characters to be found.</li>
        <li>Click to open a popup and select the character you've found.</li>
        <li>Find all hidden characters within the level to finish.</li>
        <li>Submit your score to the leaderboard and compare your time with others.</li>
      </ul>
    </article>
    )
}

const Buttons = () => {
  
  const { 
    session,
    setSession
  } = useContext(GameContext);

  return (
    <article className="buttons">
      <button onClick={() => setSession({ ...session, page: "Leaderboard" })}>Leaderboards</button>
    </article>
  )
}

const LevelsList = () => {
  
  const {
    levels,
    session,
    setSession,
  } = useContext(GameContext);

  const [loading, setLoading] = useState(false);

  // Display a loading message until levels have been retrieved from firestore
  useEffect(() => {
    if (levels) setLoading(false);
  }, [levels]);

  useEffect(() => {
    if (!levels) setLoading(true);
    // eslint-disable-next-line
  }, []);

  const handleStartGame = async (id) => {
    if (!id) return;

    // The ID of the game which was clicked / selected
    const game = levels.find(level => level.id === id);
    game?.characters?.forEach(character => {
      character.found = false;
    });
    const url = await handleDownloadImageFromStorage(game.image);
    game.url = url;

    const firestoreId = await handleSetFirestoreData(id);
    setSession({ ...session, gameOver: false, page: 'Game', game, firestoreId, leaderboard: game.id });
  }

  if (!loading) {
    return (
      <article className="levels">
        <h3>Select a level to play:</h3>
        <ul className="levels" onClick={(e) => handleStartGame(e.target.dataset.id)}>
          {levels?.map(level => (
            <LevelCard key={level.id} level={level} type="select" />
          ))}
        </ul>
      </article>
    )
  }

  if (loading) {
    return (
      <article className="loading">
        <h3>Levels are loading...</h3>
      </article>
    )
  }
}

export default Home;