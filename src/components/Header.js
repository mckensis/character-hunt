import { useContext } from "react";
import GameContext from "../context/GameContext";

const Header = () => {

  const {levels, session, setSession} = useContext(GameContext);

  const handleGameOver = () => {
    const sessionCopy = { ...session };
    sessionCopy.game.characters.forEach(character => {
      character.found = false;
    });
    console.log(levels);
    setSession({ ...sessionCopy, game: null, gameOver: true, page: "Home" });
  }

  return (
    <header>
      <h1>Character Hunt</h1>

      {!session.gameOver && <>
        <section className="game-info">
          <p>Timer</p>
          <ul className="characters">
            
            {session?.game?.characters?.map(character => (
              <li key={character.id} className={character.found ? "found-icon" : null} title={character.title}>
                <img src={character.url || null} alt=""/>
              </li>
            ))}

          </ul>
        </section>

        <nav>
          <button onClick={() => handleGameOver()}>Quit Game</button>
        </nav>
      </>}

    </header>
  )
}

export default Header;