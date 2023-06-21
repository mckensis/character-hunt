import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/GameContext";
import LevelCard from "../LevelCard";
import { handleSetFirestoreData } from "../../handles/handleSetFirestoreData";
import { handleDownloadImageFromStorage } from "../../handles/handleGetFirestoreData";

const LevelsList = () => {
  
  const {
    levels,
    setGame,
    setGameActive,
    setPage,
    setWelcomePopupVisible,
    setFirestoreId,
  } = useContext(GameContext);

  const handleSetUpGame = async (id) => {
    if (!id) return;

    // The ID of the game which was clicked / selected
    const game = levels.find(level => level.id === id);
    game?.characters?.forEach(character => {
      character.found = false;
    });
    
    const url = await handleDownloadImageFromStorage(game.image);
    game.url = url;

    const newFirestoreId = await handleSetFirestoreData(id);
    
    setGame(game);
    setPage("Game");
    setGameActive(true);
    setWelcomePopupVisible(true);
    setFirestoreId(newFirestoreId);
  }

  const [loading, setLoading] = useState(false);

  // Display a loading message until levels have been retrieved from firestore
  useEffect(() => {
    if (levels) setLoading(false);
  }, [levels]);

  useEffect(() => {
    if (!levels) setLoading(true);
    // eslint-disable-next-line
  }, []);

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
      <article>
        <h3>Levels are loading...</h3>
      </article>
    )
  }
}

export default LevelsList;