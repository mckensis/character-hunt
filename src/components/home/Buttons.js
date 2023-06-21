import { useContext } from "react";
import GameContext from "../../context/GameContext";

const Buttons = () => {
  
  const { 
    setPage,
  } = useContext(GameContext);

  return (
    <article className="buttons">
      <button onClick={() => setPage("Leaderboard")}>View Leaderboards</button>
    </article>
  )
}

export default Buttons;