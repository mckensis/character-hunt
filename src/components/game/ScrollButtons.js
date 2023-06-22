import { scrollGame } from "helpers/scrollGame";
import { useEffect, useState } from "react";

const ScrollButtons = ({ popupOpen }) => {
  
  const [directionToScroll, setDirectionToScroll] = useState(null);

  const handleSetScrollDirection = (direction, e) => {
    if (popupOpen) return;
    e.stopPropagation();
    setDirectionToScroll(direction);
    return;
  }

  useEffect(() => {
    let interval;

    if (directionToScroll) {
      interval = setInterval(() => {
        scrollGame(directionToScroll);
      }, 10);
    
    } else if (!directionToScroll) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  
  }, [directionToScroll]);

  return (
    <div className="pan-buttons">
    <button
      className="nav pan"
      onMouseDown={(e) => handleSetScrollDirection("up", e)}
      onMouseUp={(e) => handleSetScrollDirection(null, e)}
    >
      &#708;
    </button>
    <button 
      className="nav pan"
      onMouseDown={(e) => handleSetScrollDirection("right", e)}
      onMouseUp={(e) => handleSetScrollDirection(null, e)}
    >
      &#707;
    </button>
    <button
      className="nav pan"
      onMouseDown={(e) => handleSetScrollDirection("down", e)}
      onMouseUp={(e) => handleSetScrollDirection(null, e)}
    >
      &#709;
    </button>
    <button
      className="nav pan"
      onMouseDown={(e) => handleSetScrollDirection("left", e)}
      onMouseUp={(e) => handleSetScrollDirection(null, e)}
    >
      &#706;
    </button>
  </div>
  )
}

export default ScrollButtons;