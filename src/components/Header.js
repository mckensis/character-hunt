import { useContext } from "react";
import GameContext from "../context/GameContext";

const Header = () => {

  const {session, setSession} = useContext(GameContext);

  return (
    <header>
      <h1>Character Hunt</h1>

      {!session.gameOver && <>
        <section className="game-info">
          <p>Timer</p>
          <ul className="characters">
            <li>Char 1</li>
            <li>Char 2</li>
            <li>Char 3</li>
          </ul>
        </section>

        <nav>
          <button onClick={() => setSession({ ...session, game: null, gameOver: true, page: "Home" })}>Quit Game</button>
        </nav>
      </>}

    </header>
  )
}

export default Header;