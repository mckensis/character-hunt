import { useContext, useEffect, useState } from "react";
import GameContext from "../context/GameContext";
import LevelCard from "./LevelCard";
import { handleGetLeaderboardData } from "../handles/handleGetFirestoreData";
import { formatTime } from "../helpers/formatTime";

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
    if (session.leaderboard) {
      setTimeout(() => {
        handleSetActiveLeaderboard(session.leaderboard);
      }, 100);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="leaderboards">
      <Buttons session={session} setSession={setSession} />
      <LevelsList handleSetActiveLeaderboard={handleSetActiveLeaderboard} />
      <Leaderboard leaderboard={leaderboard} loading={loading} session={session} />
    </section>
  )
}

const Buttons = ({ setSession, session }) => {
  return (
    <article className="buttons">
      <button onClick={() => setSession({ ...session, page: "Home", leaderboard: null })}>Home</button>
    </article>
  )
}

const LevelsList = ({ handleSetActiveLeaderboard }) => {

  const { 
    levels
  } = useContext(GameContext);

  return (
    <article>
      <h3>Select a level to view the leaderboard:</h3>
      <ul className="levels leaderboards" onClick={(e) => handleSetActiveLeaderboard(e.target.dataset.id)}>
        {levels?.map(level => <LevelCard key={level.id} level={level} type="leaderboard" />)}
      </ul>
    </article>
  )
}

const Leaderboard = ({ leaderboard, loading, session }) => {
  return (
    <article className="leaderboard">
      {leaderboard && <>
      <h3>Leaderboard Scores</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>

        {loading &&
          <tr>
            <td className="loading">
              Loading high scores...
            </td>
          </tr>
        }
        {!loading && leaderboard?.map(data => (
          <tr key={data.id} className={data.id === session.firestoreId ? "highlight" : null}>
            <td>{leaderboard.indexOf(data) + 1}</td>
            <td>{data.user}</td>
            <td>{formatTime(data.score)}</td>
          </tr>
          ))
        }

        {!loading && leaderboard.length === 0 && <tr><td className="empty">No high scores yet - Be the first to add your name!</td></tr>}
        </tbody>
      </table>
      </>
      }
    </article>
  )
}

export default Leaderboards;