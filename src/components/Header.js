import { useContext } from "react";
import GameContext from "../context/GameContext";
import Timer from "./Timer";

const Header = () => {

  const {
    session,
    setSession,
    setSeconds,
  } = useContext(GameContext);

  const handleQuitGame = () => {
    // TO-DO: Delete data from firestore for incomplete session
    const sessionCopy = { ...session };
    sessionCopy.game.characters.forEach(character => {
      character.found = false;
    });
    setSeconds(0);
    setSession({ ...sessionCopy, game: null, gameOver: true, page: "Home", leaderboard: null });
  }

  return (
    <>
    {session.page === "Game" ?
      <header className="sticky">
        <section className="game-info">
          <Timer />
          <CharacterList />
          <button onClick={() => handleQuitGame()}>Quit</button>
        </section>
      </header>
    : <header>
        <h1 className="heading">(Character Hunt)</h1>
      </header>
    }
    </>
  )
}

const CharacterList = () => {
  const {
    session,
  } = useContext(GameContext);

  return (
    <ul className="characters">            
      {session?.game?.characters?.map(character => (
        <li key={character.id} className={character.found ? "found-icon" : null} title={character.title}>
          <img src={character.url || null} alt=""/>
        </li>
      ))}
    </ul>
  )
}

export default Header;