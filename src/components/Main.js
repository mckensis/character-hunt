import { useContext } from "react";
import Game from "components/game/Game";
import Home from "components/home/Home";
import Leaderboards from "components/leaderboard/Leaderboards";
import GameContext from "context/GameContext";

const Main = () => {

  const { session } = useContext(GameContext);

  return (
    <main>
      {session?.page === "Home" && <Home />}
      {session?.page === "Leaderboard" && <Leaderboards />}
      {session?.page === "Game" && <Game />}
    </main>
  )
}

export default Main;