import { useContext, useEffect, useState } from "react";
import GameContext from "context/GameContext";
import { handleGetLeaderboardData } from "handles/handleGetFirestoreData";
import Buttons from "./Buttons";
import LevelsList from "./LevelsList";
import Leaderboard from "./Leaderboard";

const Leaderboards = () => {

  const {
    session,
    setSession
  } = useContext(GameContext);

  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSetActiveLeaderboard = async (id) => {
    try {
      if (!id) return;
      setLoading(true);

      const data = await handleGetLeaderboardData(id);
      if (data) setLoading(false);
      setLeaderboard(data);
      setSession({ ...session, leaderboard: id });

    } catch (err) {
      console.log(err.message);
    }
  }

  // Fetches the relevant leaderboard on page load if the user just submitted a score
  useEffect(() => {
    handleSetActiveLeaderboard(session?.leaderboard);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="leaderboards">
      <Buttons />
      <LevelsList handleSetActiveLeaderboard={handleSetActiveLeaderboard} loading={loading} />
      <Leaderboard leaderboard={leaderboard} loading={loading} />
    </section>
  )
}

export default Leaderboards;