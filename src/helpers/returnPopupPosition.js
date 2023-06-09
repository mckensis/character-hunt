  // Position the popup depending on where the user clicks
  // Avoid positioning the popup where the page would overflow
  export const returnPopupPosition = (coordinates) => {
    let top;
    let right;
    let bottom;
    let left;

    // Place the popup to the left or right of the mouse click
    if (coordinates.x < window.scrollX + window.innerWidth - 300) {
      left = coordinates.x + 10
      right = null;
    } else {
      left = null;
      right = window.innerWidth - coordinates.x
    }

    // Place the popup above or below the mouse click
    if (coordinates.y < window.scrollY + window.innerHeight - 250) {
      top = coordinates.y - window.scrollY + 75;
      bottom = null;
    } else {
      top = null;
      bottom = (window.innerHeight - coordinates.y) + window.scrollY - 60;
    }

    const style = {
      top: `${top}px`,
      right: `${right}px`,
      bottom: `${bottom}px`,
      left: `${left}px`
    }

    return style;
  }