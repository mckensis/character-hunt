// Returns true if the coordinates are similar
export const compareCoordinates = (first, second) => {
  const lowX = second.x - 50;
  const highX = second.x + 50;
  const lowY = second.y - 50;
  const highY = second.y + 50;
  
  // Compare where was clicked against the stored coordinates of the selected character
  if ((first.x > lowX && first.x < highX) && (first.y > lowY && first.y < highY)) {
    console.log("matching");
    return true;
  } else {
    return false;
  }
}