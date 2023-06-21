import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/GameContext";
import { handleSetFirestoreFinishData, handleSetFirestoreStartData } from "../../handles/handleSetFirestoreData";
import Form from "./Form";
import GameImage from "./GameImage";
import GamePopup from "./GamePopup";
import WelcomePopup from "./WelcomePopup";
import Crosshair from "./Crosshair";
import ImageCredit from "./ImageCredit";
import { handleLockScroll } from "../../helpers/handleLockScroll";
import { compareCoordinates } from "../../helpers/compareCoordinates";
import { handleUnlockScroll } from "../../helpers/handleUnlockScroll";

const Game = () => {

  const {
    game,
    firestoreId,
    setTime,
    setGame,
    gameOver,
    setGameOver,
    setWelcomePopupVisible,
    timerActive,
    setTimerActive,
  } = useContext(GameContext);

  const [coordinates, setCoordinates] = useState({
    x: null,
    y: null
  });

  const checkCoordinatesForMatch = (id, coordinates) => {
    const gameCopy = { ...game };
    const character = gameCopy.characters.find(character => character.id === id);
    
    // Compare the character's actual coordinates with where the user has clicked
    const result = compareCoordinates(coordinates, character);
    if (!result) return;
    
    character.found = true;
    setGame(gameCopy);
  }

  const handleOpenPopup = (coordinates) => {
    handleLockScroll();
    setPopupOpen(true);
    setCrosshairVisible(true);
  }

  const handleClosePopup = () => {
    handleUnlockScroll();
    setPopupOpen(false);
    setCrosshairVisible(false);
    // setCoordinates({ x: null, y: null });
  }

  const [popupOpen, setPopupOpen] = useState(false);
  const [crosshairVisible, setCrosshairVisible] = useState(false);

  // Watch for game over criteria
  useEffect(() => {
    // Return if all characters haven't been found yet
    const allCharactersFound = game?.characters?.every(character => character.found === true);
    if (!allCharactersFound) return;

    const handleGameOver = () => {
      setGameOver(true);
      setTimerActive(false);
      handleSetFirestoreFinishData(firestoreId);
      handleLockScroll();
    }
    
    handleGameOver();
  
  }, [game, firestoreId, setTimerActive, setGameOver]);

  const handleClick = (e) => {
    if (gameOver || !timerActive) return;
    
    console.log("X: ", e.clientX - e.currentTarget.getBoundingClientRect().left, "Y: ", e.clientY - e.currentTarget.getBoundingClientRect().top);
    
    // If there has already been a click to open the popup
    if (popupOpen) {
      // If a character's name was clicked within the list (to make a guess at the location)
      if (e.target.dataset.id) {
        const { id } = e.target.dataset;
        checkCoordinatesForMatch(id, coordinates);
      }

      handleClosePopup();
      return;
    }

    setCoordinates({ 
      x: e.clientX - e.currentTarget.getBoundingClientRect().left, 
      y: e.clientY - e.currentTarget.getBoundingClientRect().top
    });
    handleOpenPopup();
  }
  
  // Display the welcome screen
  // Set the start timer to zero when the component mounts
  useEffect(() => {

    if (!gameOver) return;

    console.log("Hello");

    const handleDisplayStartingInfo = async () => {
      await handleSetFirestoreStartData(firestoreId);
      setTime(0);
      handleLockScroll();
      setWelcomePopupVisible(true);
    }

    return () => handleDisplayStartingInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="game" onClick={(e) => handleClick(e)}>
      <GameImage image={game.url} />
      <WelcomePopup />
      <Crosshair />
      <ImageCredit />
      <GamePopup />
      <Form />
    </section>
  )
}

export default Game;