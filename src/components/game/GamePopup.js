import { useContext } from "react";
import GameContext from "context/GameContext";
import { returnPopupPosition } from "helpers/returnPopupPosition";

const Popup = ({ coordinates, visible }) => {
  
  const {
    session
  } = useContext(GameContext);

  if (!visible) return;

  return (
    <ul className="game-popup" data-id="popup" style={returnPopupPosition(coordinates)}>
      {session?.game?.characters?.map(character => (
        <li key={character.id} data-id={character.id} className={character.found ? 'found' : null}>
          {character.title}
          <img src={character.url || null} alt="" className={character.found ? "found-icon" : null}/>
        </li>
      ))}
    </ul>
  )
}

export default Popup;