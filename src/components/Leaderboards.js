import { useContext, useEffect, useState } from "react";
import GameContext from "../context/GameContext";
import { handleGetLeaderboardData } from "../handles/handleGetFirestoreData";
import { formatTime } from "../helpers/formatTime";
import LevelCard from "./LevelCard";

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

  // Fetches the up to date leaderboard after submitting a score
  useEffect(() => {
    handleSetActiveLeaderboard(session?.leaderboard);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="leaderboards">
      <Buttons />
      <LevelsList handleSetActiveLeaderboard={handleSetActiveLeaderboard} loading={loading} />
      <Leaderboard leaderboard={leaderboard} loading={loading} session={session} />
    </section>
  )
}

const Buttons = () => {
  
  const {
    session,
    setSession,
  } = useContext(GameContext);

  return (
    <article className="buttons">
      <button onClick={() => setSession({ ...session, page: "Home", leaderboard: null })}>Return to Home</button>
    </article>
  )
}

const LevelsList = ({ handleSetActiveLeaderboard }) => {

  const { 
    levels
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

const Leaderboard = ({ leaderboard, loading, session }) => {
  if (!leaderboard) return;

  return (
    <article className="leaderboard">
      <h3>Leaderboard Scores</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <LeaderboardBody
            loading={loading}
            leaderboard={leaderboard}
            session={session}
          />
        </tbody>
      </table>
    </article>
  )
}

const LeaderboardBody = ({ loading, leaderboard, session }) => {
  if (loading) {
    return (
      <tr>
        <td className="loading">
          Loading high scores...
        </td>
      </tr>
    )
  }

  if (!loading && leaderboard?.length > 0) {
    return (
      leaderboard?.map(data => (
        <tr key={data.id} className={data.id === session.firestoreId ? "highlight" : null}>
          <td>{leaderboard.indexOf(data) + 1}</td>
          <td>{data.user}</td>
          <td>{formatTime(data.score)}</td>
        </tr>
      ))
    )
  } else {
    return (
      <tr>
        <td className="empty">
          No high scores yet - Be the first to add your name!
        </td>
      </tr>
    )
  }
}

export default Leaderboards;