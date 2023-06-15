import { useContext, useState } from "react";
import GameContext from "../context/GameContext";
import LevelCard from "./LevelCard";
import { handleGetLeaderboardData } from "../handles/handleGetFirestoreData";
import { formatTime } from "../helpers/formatTime";

const Leaderboard = () => {

  const {
    levels,
    session,
    setSession
  } = useContext(GameContext);

  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSetActiveLeaderboard = async (event) => {
    try {
      setLoading(true);

      const { id } = event.target.dataset;
      if (!id) return;

      const data = await handleGetLeaderboardData(id);
      if (data) setLoading(false);

      setLeaderboard(data);
    
    } catch (err) {
      console.log(err.message);
    }

  }

  return (
    <section className="leaderboard">      
      <section className="buttons">
        <button onClick={() => setSession({ ...session, page: "Home" })}>Back to Home</button>
      </section>
      <h3>Select a level to view the leaderboard:</h3>

      <ul className="levels" onClick={(e) => handleSetActiveLeaderboard(e)}>
        {levels.map(level => <LevelCard key={level.id} level={level} />)}
      </ul>

      
      {leaderboard &&
      <>
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
          <tr key={data.id}>
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

    </section>
  )
}

export default Leaderboard;