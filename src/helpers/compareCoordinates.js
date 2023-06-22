// Returns true if the coordinates are similar
export const compareCoordinates = (guess, character) => {
  if (!character) return;
  
  const lowX = character.x.start - 10;
  const highX = character.x.end + 10;
  const lowY = character.y.start - 10;
  const highY = character.y.end + 10;
  
  // Compare where was clicked against the stored coordinates of the selected character
  if ((guess.x > lowX && guess.x < highX) && (guess.y > lowY && guess.y < highY)) {
    return true;
  } else {
    return false;
  }
}