// Returns true if the coordinates are similar
export const compareCoordinates = (first, second) => {
  if (!second) return;
  
  const lowX = second.x - 25;
  const highX = second.x + 25;
  const lowY = second.y - 50;
  const highY = second.y + 50;
  
  // Compare where was clicked against the stored coordinates of the selected character
  if ((first.x > lowX && first.x < highX) && (first.y > lowY && first.y < highY)) {
    return true;
  } else {
    return false;
  }
}