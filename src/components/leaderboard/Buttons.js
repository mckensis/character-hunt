import { useContext } from "react";
import GameContext from "context/GameContext";

const Buttons = () => {
  
  const {
    session,
    setSession,
  } = useContext(GameContext);
  
  return (
    <section className="buttons">
      <button onClick={() => setSession({ ...session, page: "Home", leaderboard: null })}>Return to Home</button>
    </section>
  )
}

export default Buttons;