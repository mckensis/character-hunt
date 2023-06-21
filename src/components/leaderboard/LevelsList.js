import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/GameContext";
import LevelCard from "../LevelCard";

const LevelsList = () => {

  const { 
    levels,
    handleSetActiveLeaderboard,
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

  if (loading) {
    return (
      <article className="loading">
        <h3>Levels are loading...</h3>
      </article>
    )
  } else {
    return (
      <article>
      <h3>Select a level to view the leaderboard:</h3>
      <ul className="levels leaderboards" onClick={(e) => handleSetActiveLeaderboard(e.target.dataset.id)}>
        {levels?.map(level => <LevelCard key={level.id} level={level} type="leaderboard" />)}
      </ul>
    </article>
  )
  }
}

export default LevelsList;