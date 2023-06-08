import { useContext } from "react";
import GameContext from "../context/GameContext";

const Leaderboard = () => {

  const { session, setSession } = useContext(GameContext);

  return (
    <section className="leaderboard">
      <h2>Leaderboards</h2>
      
      <section className="buttons">
        <button onClick={() => setSession({ ...session, page: "Home" })}>Back to Home</button>
      </section>

      <article>
        <h3>Select a level:</h3>
        <ul>
          <li>Level 1</li>
          <li>Level 2</li>
          <li>Level 3</li>
        </ul>
      </article>
      <article>
        <h3>Best scores for level:</h3>
        <p>Active leaderboard here</p>
      </article>

    </section>
  )
}

export default Leaderboard;