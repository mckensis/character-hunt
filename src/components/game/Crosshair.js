import { returnTargetPosition } from "helpers/returnPopupPosition";

const Crosshair = ({ visible, coordinates }) => {
  
  if (!visible) return;
  
  return (
    <div className="crosshair" style={returnTargetPosition(coordinates)}></div>
  )
}

export default Crosshair;