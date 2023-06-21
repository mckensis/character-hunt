import { AiOutlineZoomIn } from "react-icons/ai";
import { AiOutlineZoomOut } from "react-icons/ai";
import { MdOutlineZoomOutMap } from "react-icons/md";

const ZoomButtons = () => {

  const zoomIn = (e) => {
    const game = document.querySelector(".game");
    game.style.transform = "scale(1.1)";
  }

  return (
    <div className="zoom-buttons">
      <button
        onClick={(e) => zoomIn(e)}
        >
        <AiOutlineZoomIn />
      </button>
      
      <button><MdOutlineZoomOutMap /></button>
      
      <button><AiOutlineZoomOut /></button>
    </div>
  )
}

export default ZoomButtons;