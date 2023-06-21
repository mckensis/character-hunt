import { useContext, useEffect, useState } from "react";
import GameContext from "context/GameContext";
import LevelCard from "components/LevelCard";
import { handleSetFirestoreData } from "handles/handleSetFirestoreData";
import { handleDownloadImageFromStorage } from "handles/handleGetFirestoreData";
import { handleResetCharacterData } from "helpers/handleResetCharacterData";

const LevelsList = () => {
  
  const {
    levels,
    session,
    setSession,
    setTimerActive,
    setTime,
    setSeconds
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

  const handleSetUpGame = async (id) => {
    if (!id) return;

    // The ID of the game which was clicked / selected
    const game = levels.find(level => level.id === id);
    handleResetCharacterData(game.characters);
    
    const url = await handleDownloadImageFromStorage(game.image);
    game.url = url;
    setTimerActive(false);
    setTime(0);
    setSeconds(0);
    const firestoreId = await handleSetFirestoreData(id);
    setSession({ ...session, gameOver: false, page: 'Game', game, firestoreId, leaderboard: game.id });
  }

  if (!loading) {
    return (
      <article className="default">
        <h3>Select a level to play:</h3>
        <ul className="levels" onClick={(e) => handleSetUpGame(e.target.dataset.id)}>
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

export default LevelsList;