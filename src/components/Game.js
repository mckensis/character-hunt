import { useContext, useState } from "react";
import GameContext from "../context/GameContext";
import { returnPopupPosition, returnTargetPosition } from "../helpers/returnPopupPosition";
import { compareCoordinates } from "../helpers/compareCoordinates";

const Game = () => {

  const {
    session,
    setSession,
  } = useContext(GameContext);
  
  const [coordinates, setCoordinates] = useState({
    x: null,
    y: null
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [crosshairVisible, setCrosshairVisible] = useState(false);

  const checkCoordinatesForMatch = (id, coordinates) => {
    const sessionCopy = { ...session };
    const character = sessionCopy.game.characters.find(character => character.id === id);
    
    // Compare the character's actual coordinates with where the user has clicked
    const result = compareCoordinates(coordinates, character);
    if (result) character.found = true;
    
    setSession(sessionCopy);
  }

  const handleClick = (e) => {
    // If there has already been a click to open the popup
    if (popupOpen) {
      
      // If a character's name was clicked within the list (to make a guess at the location)
      if (e.target.dataset.id) {
        const { id } = e.target.dataset;
        checkCoordinatesForMatch(id, coordinates);
        setPopupOpen(false);
        setCoordinates({ ...coordinates, x: null, y: null });
        return;

      // If anywhere else in the image was clicked while the popup is open 
      } else {
        // Close the popup and reset the coordinates
        setCoordinates({ ...coordinates, x: null, y: null});
        setPopupOpen(false);
        setCrosshairVisible(false);
        return;
      }
    }

    setCoordinates({ 
      ...coordinates,
      x: e.clientX - e.currentTarget.getBoundingClientRect().left, 
      y: e.clientY - e.currentTarget.getBoundingClientRect().top
    });
    setPopupOpen(true);
    setCrosshairVisible(true);
  }

  return (
    <section className="game" onClick={handleClick}>
      <img src={session.game.url} alt=""/>
      
      {popupOpen && 
        <ul className="game-popup" data-id="popup" style={returnPopupPosition(coordinates)}>
          {session.game.characters.map(character => (
              <li key={character.id} data-id={character.id} className={character.found ? 'found' : null}>
              {character.title}
              <img src={character.url || null} alt=""/>
              {character.found && <div className="found-overlay">Found!</div>}
              </li>
          ))}

        </ul>}

        {crosshairVisible && 
          <div className="crosshair" style={returnTargetPosition(coordinates)}></div>
        }

    </section>
  )
}

export default Game;