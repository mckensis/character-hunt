import { useContext } from "react";
import GameContext from "context/GameContext";
import { formatTime } from "helpers/formatTime";

const Leaderboard = ({ leaderboard, loading }) => {

  const {
    session
  } = useContext(GameContext);

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

export default Leaderboard;