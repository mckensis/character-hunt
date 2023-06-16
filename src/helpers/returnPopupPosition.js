// Position the popup depending on where the user clicks
// Avoid positioning the popup where the page would overflow
export const returnPopupPosition = (coordinates) => {
  let top;
  let right;
  let bottom;
  let left;

  // Place the popup to the left or right of the mouse click
  if (coordinates.x < window.scrollX + window.innerWidth - 250) {
    left = coordinates.x - window.scrollX + 10
    right = null;
  } else {
    left = null;
    right = window.innerWidth - coordinates.x + window.scrollX + 8;
  }

  // Place the popup above or below the mouse click
  if (coordinates.y < window.scrollY + window.innerHeight - 300) {
    top = coordinates.y - window.scrollY + 75;
    bottom = null;
  } else {
    top = null;
    bottom = (window.innerHeight - coordinates.y) + window.scrollY - 57;
  }

  const style = {
    top: top ? `${top}px` : null,
    right: right ? `${right}px` : null,
    bottom: bottom ? `${bottom}px` : null,
    left: left ? `${left}px` : null
  }

  return style;
}

  // Position the popup depending on where the user clicks
  // Avoid positioning the popup where the page would overflow
export const returnTargetPosition = (coordinates) => {
  const left = coordinates.x - window.scrollX - 24;
  const top = coordinates.y - window.scrollY + 42;

  const style = {
    top: `${top}px`,
    left: `${left}px`
  }
  return style;
}