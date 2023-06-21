import { useContext } from "react";
import GameContext from "context/GameContext";

const Buttons = () => {
  
  const { 
    session,
    setSession
  } = useContext(GameContext);

  return (
    <section className="button-container">
      <button onClick={() => setSession({ ...session, page: "Leaderboard" })}>View Leaderboards</button>
    </section>
  )
}

export default Buttons;