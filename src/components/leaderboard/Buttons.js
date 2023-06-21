import { useContext } from "react";
import GameContext from "../../context/GameContext";

const Buttons = () => {

  const {
    setPage,
  } = useContext(GameContext);

  return (
    <article className="buttons">
      <button onClick={() => setPage("Home")}>Return to Home</button>
    </article>
  )
}

export default Buttons;