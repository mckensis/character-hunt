import { useContext } from "react";
import GameContext from "../../context/GameContext";
import { returnPopupPosition } from "../../helpers/returnPopupPosition";

const GamePopup = ({ coordinates }) => {
  const {
    game,
    popupOpen,
  } = useContext(GameContext);
  
  if (!popupOpen) return;
  if (!coordinates) return;

  return (
    <>
    {popupOpen && 
    <ul className="game-popup" data-id="popup" style={returnPopupPosition(coordinates)}>
    {game?.characters?.map(character => (
      <li key={character.id} data-id={character.id} className={character.found ? 'found' : null}>
        {character.title}
        <img src={character.url || null} alt="" className={character.found ? "found-icon" : null}/>
      </li>
    ))}
    </ul>
    }
    </>
  )
}

export default GamePopup;