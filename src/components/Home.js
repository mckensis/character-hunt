import { useContext } from "react";
import GameContext from "../context/GameContext";

const Home = () => {
  
  const { session, setSession } = useContext(GameContext);

  return (
    <section className="home">
      <section className="buttons">
        <button onClick={() => setSession({ ...session, page: "Select" })}>Game Select</button>
        <button onClick={() => setSession({ ...session, page: "Leaderboard" })}>View Leaderboards</button>
      </section>

      <h3>How to Play:</h3>
      <ul className="rules">
        <li>Rule</li>
        <li>Rule</li>
        <li>Rule</li>
        <li>Rule</li>
      </ul>

    </section>
  )
}

export default Home;