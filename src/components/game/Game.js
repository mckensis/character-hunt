import { useContext, useEffect, useState } from "react";
import GameContext from "context/GameContext";
import { handleSetFirestoreFinishData, handleSetFirestoreStartData } from "handles/handleSetFirestoreData";
import { compareCoordinates } from "helpers/compareCoordinates";
import { handleLockScroll } from "helpers/handleLockScroll";
import { handleUnlockScroll } from "helpers/handleUnlockScroll";
import ScrollButtons from "components/game/ScrollButtons";
import WelcomePopup from "components/game/WelcomePopup";
import ImageCredit from "components/game/ImageCredit";
import ZoomButtons from "components/game/ZoomButtons";
import Crosshair from "components/game/Crosshair";
import GameImage from "components/game/GameImage";
import Popup from "components/game/GamePopup";
import Flash from "components/game/Flash";
import Form from "components/game/Form";

const Game = () => {

  const {
    session,
    setSession,
    setTimerActive,
  } = useContext(GameContext);
  
  const [coordinates, setCoordinates] = useState({
    x: null,
    y: null
  });

  const [gameOver, setGameOver] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [crosshairVisible, setCrosshairVisible] = useState(false);
  const [welcomePopupVisible, setWelcomePopupVisible] = useState(false);
  const [guessResultVisible, setGuessResultVisible] = useState(false);

  const [found, setFound] = useState(null);

  const checkCoordinatesForMatch = (id, coordinates) => {
    const sessionCopy = { ...session };
    const character = sessionCopy.game.characters.find(character => character.id === id);
    
    // Compare the character's actual coordinates with where the user has clicked
    const result = compareCoordinates(coordinates, character);
    
    if (result) {
      character.found = true;
      setFound(character.title);
    }

    setSession(sessionCopy);
    setGuessResultVisible(true);
    
    setTimeout(() => {
      setGuessResultVisible(false);  
      setFound(null);
    }, 1000);
  }

  const handleOpenPopup = () => {
    handleLockScroll();
    setPopupOpen(true);
    setCrosshairVisible(true);
  }

  const handleClosePopup = () => {
    handleUnlockScroll();
    setPopupOpen(false);
    setCrosshairVisible(false);
    setCoordinates({ x: null, y: null });
  }

    const handleStartGame = async (e) => {
    e.stopPropagation();
    await handleSetFirestoreStartData(session.firestoreId);
    setWelcomePopupVisible(false);
    handleUnlockScroll();
    setTimerActive(true);
  }

  const handleClick = (e) => {
    if (gameOver) return;
    if (welcomePopupVisible) return;

    if (!e.target.className
      || e.target.className === "game-nav-buttons"
      || e.target.className === "pan-buttons") {
        handleClosePopup();
        return;
      } 
    
    // console.log("X: ", e.clientX - e.currentTarget.getBoundingClientRect().left, "Y: ", e.clientY - e.currentTarget.getBoundingClientRect().top);

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

  // Watch for game over criteria
  useEffect(() => {
    // Return if all characters haven't been found yet
    const allCharactersFound = session?.game?.characters?.every(character => character.found === true);
    if (!allCharactersFound) return;

    const handleGameOver = () => {
      setGameOver(true);
      setTimerActive(false);
      handleSetFirestoreFinishData(session.firestoreId);
      handleLockScroll();
    }
    
    handleGameOver();
  
  }, [session, setTimerActive]);

  // Set the start timer when the component mounts
  useEffect(() => {
    if (gameOver || session.gameOver) return;
    setWelcomePopupVisible(true);
    handleLockScroll();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="game" onClick={handleClick}>
      <GameImage image={session.game.url} />
      <Crosshair visible={crosshairVisible} coordinates={coordinates} />
      <WelcomePopup visible={welcomePopupVisible} handleStartGame={handleStartGame} />
      <Popup coordinates={coordinates} visible={popupOpen} />        
      <Form gameOver={gameOver} />
      <ImageCredit />
      <Flash visible={guessResultVisible} found={found} />
      <NavButtons visible={welcomePopupVisible} popupOpen={popupOpen} />
    </section>
  )
}

const NavButtons = ({ visible, popupOpen }) => {

  if (visible) return;

  return (
    <div className="game-nav-buttons">
      <ScrollButtons popupOpen={popupOpen} />
      {visible && <ZoomButtons />}
    </div>
  )
}

export default Game;