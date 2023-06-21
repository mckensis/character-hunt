import { useContext, useEffect } from "react";
import GameContext from "../../context/GameContext";
import Buttons from "./Buttons";
import Leaderboard from "./Leaderboard";
import LevelsList from "./LevelsList";

const LeaderboardPage = () => {

  const {
    leaderboard,
    handleSetActiveLeaderboard,
  } = useContext(GameContext);

  // Fetches the up to date leaderboard after submitting a score
  useEffect(() => {
    if (leaderboard) {
      handleSetActiveLeaderboard(leaderboard);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="leaderboards">
      <Buttons />
      <LevelsList />
      <Leaderboard />
    </section>
  )
}

export default LeaderboardPage;