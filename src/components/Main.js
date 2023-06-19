import { useContext } from "react";
import Game from "./Game";
import Home from "./Home";
import Leaderboards from "./Leaderboards";
import GameContext from "../context/GameContext";

const Main = () => {

  const { session } = useContext(GameContext);

  return (
    <main>

      {session?.gameOver && <>
        {session?.page === "Home" && <Home />}
        {session?.page === "Leaderboard" && <Leaderboards />}
      </>}

      {!session?.gameOver && <>
        {session?.page === "Game" && <Game />}
      </>}

    </main>
  )
}

export default Main;