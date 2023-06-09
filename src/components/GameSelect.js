import { useContext } from "react";
import GameContext from "../context/GameContext";
import LevelCard from "./LevelCard";

const GameSelect = () => {

  const { 
    session,
    setSession,
    levels
  } = useContext(GameContext);

  const handleStartGame = (id) => {
    if (!id) return;

    // The ID of the game which was clicked / selected
    const game = levels.find(level => level.id === id);
    game.characters.forEach(character => {
      character.found = false;
    });
    
    setSession({ ...session, gameOver: false, page: 'Game', game });
    console.log(session);
  }

  return (
    <section className="game-select">
      <h2>Game Select</h2>

      <section className="buttons">
        <button onClick={() => setSession({ ...session, page: "Home" })}>Back to Home</button>
      </section>

      <h3>Select a level to begin:</h3>
      <ul className="levels" onClick={(e) => handleStartGame(e.target.dataset.id)}>
        {levels.map(level => (
          <LevelCard key={level.id} level={level} />
        ))}
      </ul>
      
    </section>
  )
}

export default GameSelect;