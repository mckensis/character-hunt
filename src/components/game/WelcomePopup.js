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
        <li>Find all hidden characters to complete the level</li>
        <li>Click anywhere in the game to open the character hunt menu</li>
        <li>Scroll the screen with the mouse / touchpad / touchscreen</li>
        <li>Submit your score and see how you compare with others</li>
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

      <button onClick={(e) => handleStartGame(e)}>Start Game</button>
    </article>
  </section>  
  )
}

export default WelcomePopup;