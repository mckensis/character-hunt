import { useContext } from "react";
import GameContext from "context/GameContext";
import { handleDeleteFirestoreTempData } from "handles/handleSetFirestoreData";
import { handleUnlockScroll } from "helpers/handleUnlockScroll";
import CharacterList from "components/CharacterList";
import Timer from "components/Timer";

const Header = () => {

  const {
    session,
    setSession,
    setSeconds,
  } = useContext(GameContext);

  const handleQuitGame = () => {
    handleUnlockScroll();
    // TO-DO: Delete data from firestore for incomplete session
    const sessionCopy = { ...session };
    sessionCopy.game.characters.forEach(character => {
      character.found = false;
    });
    setSeconds(0);
    handleDeleteFirestoreTempData(session.firestoreId);
    setSession({ ...sessionCopy, game: null, gameOver: true, page: "Home", leaderboard: null, firestoreId: null });
  }

  if (session.page === "Game") {
    return (
      <header className="sticky">
        <section className="header-info">
          <Timer />
          <CharacterList component="header" />
          <button onClick={() => handleQuitGame()}>Quit Game</button>
        </section>
      </header>
    )
  } else {
    return (
      <header>
        <h1 className="heading">(Character Hunt)</h1>
      </header>
    )
  }
}

export default Header;