import { useContext, useState } from "react";
import GameContext from "../context/GameContext";

const Game = () => {

  const {
    session
  } = useContext(GameContext);
  
  const [coordinates, setCoordinates] = useState({
    clickX: null,
    clickY: null
  });
  const [popupOpen, setPopupOpen] = useState(false);
  
  // Position the popup depending on where the user clicks
  // Avoid positioning the popup where the page would overflow
  const popupStyle = () => {

    let top;
    let right;
    let bottom;
    let left;

    // Place the popup to the left or right of the mouse click
    if (coordinates.clickX < window.scrollX + window.innerWidth - 300) {
      left = coordinates.clickX + 10
      right = null;
    } else {
      left = null;
      right = window.innerWidth - coordinates.clickX - 10
    }

    // Place the popup above or below the mouse click
    if (coordinates.clickY < window.scrollY + window.innerHeight - 250) {
      top = coordinates.clickY - window.scrollY + 50;
      bottom = null;
    } else {
      top = null;
      bottom = (window.innerHeight - coordinates.clickY) + window.scrollY - 50;
    }

    const style = {
      top: `${top}px`,
      right: `${right}px`,
      bottom: `${bottom}px`,
      left: `${left}px`
    }

    return style;
  }

  const handleClick = (e) => {

    // Close the popup if open and the user clicks elsewhere
    if (popupOpen) {
      if (e.target.dataset.id) {
        console.log(e.currentTarget);
        return;
      } else {
        setCoordinates({ ...coordinates, x: null, y: null});
        setPopupOpen(false);
        return;
      }
    }

    const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const clickY = e.clientY - e.currentTarget.getBoundingClientRect().top;

    setCoordinates({ 
      ...coordinates,
      clickX: clickX, 
      clickY: clickY,
    });

    setPopupOpen(true);
  }

  return (
    <section className="game" onClick={handleClick}>
      <img src={session.game.url} alt=""/>
      
      {popupOpen && 
        <ul 
          className="game-popup"
          data-id="popup"
          style={popupStyle()}>
        <li>Test</li>
      </ul>}
    </section>
  )
}

export default Game;