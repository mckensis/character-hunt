import { useContext } from "react";
import GameContext from "context/GameContext";
import CharacterList from "components/CharacterList";
import Timer from "components/Timer";

const Header = () => {

  const {
    session,
    welcomePopupVisible,
    handleQuitGame,
  } = useContext(GameContext);

  if (session.page === "Game") {
    if (welcomePopupVisible) return null;
    return (
      <header className="sticky">
        <section className="header-info">
          <Timer />
          <CharacterList component="header" />
          <button type="button" className="quit" onClick={() => handleQuitGame()}>Quit Game</button>
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