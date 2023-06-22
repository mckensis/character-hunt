import { useContext } from "react";
import GameContext from "context/GameContext";

const WelcomePopup = ({ visible, handleStartGame }) => {
  
  const {
    session,
    handleQuitGame,
  } = useContext(GameContext);

  if (!visible) return;

  return (
  <section className="starting-info">
    <article className="not-transparent">
      <h3>{session.game.title}</h3>
  
      <ul className="rules">
        <li>Find all three characters to finish the level</li>
        <li>Touch or click to target a character</li>
        <li><strong>Desktop:</strong> Navigate with the on-screen buttons, keyboard arrow keys or touchpad</li>
        <li><strong>Mobile & Tablet:</strong> Navigate with the touchscreen</li>
      </ul>
    
      <h3>Find these characters</h3>
      <ul>
        {session.game.characters.map((character => (
          <li className="details" key={character.id}>
            <p>{character.title}</p>
            <img src={character.url} alt="" />
          </li>
        )))}
      </ul>

      <p>Start the game to begin the timer and commence your character hunt!</p>

      <div className="button-container">
        <button type="button" onClick={() => handleQuitGame()}>Quit Game</button>
        <button type="button" onClick={(e) => handleStartGame(e)}>Start Game</button>
      </div>
    </article>
  </section>  
  )
}

export default WelcomePopup;