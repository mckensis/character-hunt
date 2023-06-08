import { useContext } from "react";
import Game from "./Game";
import GameSelect from "./GameSelect";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import GameContext from "../context/GameContext";

const Main = () => {

  const { session } = useContext(GameContext);

  return (
    <main>

      {session?.gameOver && <>
        {session?.page === "Home" && <Home />}
        {session?.page === "Select" && <GameSelect />}
        {session?.page === "Leaderboard" && <Leaderboard />}
      </>}

      {!session?.gameOver && <>
        {session?.page === "Game" && <Game />}
      </>}

    </main>
  )
}

export default Main;