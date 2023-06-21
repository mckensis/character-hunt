import { useContext } from "react";
import GameContext from "../../context/GameContext";
import { formatTime } from "../../helpers/formatTime";

const Leaderboard = () => {

  const {
    firestoreId,
    leaderboard,
    loadingLeaderboard,
  } = useContext(GameContext);

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

        {loadingLeaderboard &&
          <tr>
            <td className="loading">
              Loading high scores...
            </td>
          </tr>
        }
        {!loadingLeaderboard && leaderboard?.map(data => (
          <tr key={data.id} className={data.id === firestoreId ? "highlight" : null}>
            <td>{leaderboard.indexOf(data) + 1}</td>
            <td>{data.user}</td>
            <td>{formatTime(data.score)}</td>
          </tr>
          ))
        }

        {!loadingLeaderboard && leaderboard.length === 0 && 
          <tr>
            <td className="empty">
              No high scores yet - Be the first to add your name!
            </td>
          </tr>}

        </tbody>
      </table>
      </>
      }
    </article>
  )
}

export default Leaderboard;