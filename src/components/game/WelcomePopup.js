import { useContext } from "react";
import GameContext from "context/GameContext";

const WelcomePopup = ({ visible, handleStartGame }) => {
  
  const {
    session,
  } = useContext(GameContext);

  if (!visible) return;

  return (
  <section className="starting-info">
    <article className="not-transparent">
      <h3>{session.game.title}</h3>
  
      <ul className="rules">
        <li>Find all hidden characters to finish the level</li>
        <li>Touch / Click the game to target characters</li>
        <li>Navigate with the buttons / touchscreen / touchpad</li>
        <li>Submit your score to the leaderboards</li>
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

      <button onClick={(e) => handleStartGame(e)}>Start Game</button>
    </article>
  </section>  
  )
}

export default WelcomePopup;