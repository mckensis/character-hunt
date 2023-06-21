export const scrollGame = (direction) => {
  switch (direction) {
    case "up":
      window.scroll(window.scrollX, window.scrollY - 10);
      break;
    case "down":
      window.scroll(window.scrollX, window.scrollY + 10);
      break;
    case "right":
      window.scroll(window.scrollX + 10, window.scrollY);
      break;
    case "left":
      window.scroll(window.scrollX - 10, window.scrollY);
      break;
    default:
      break;
  }
}