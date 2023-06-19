import { useContext, useEffect, useState } from "react";
import GameContext from "../context/GameContext";
import { returnPopupPosition, returnTargetPosition } from "../helpers/returnPopupPosition";
import { compareCoordinates } from "../helpers/compareCoordinates";
import { handleSetFirestoreFinishData, handleSetFirestoreStartData } from "../handles/handleSetFirestoreData";
import Form from "./Form";

const Game = () => {

  const {
    setTime,
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

  const checkCoordinatesForMatch = (id, coordinates) => {
    const sessionCopy = { ...session };
    const character = sessionCopy.game.characters.find(character => character.id === id);
    
    // Compare the character's actual coordinates with where the user has clicked
    const result = compareCoordinates(coordinates, character);
    if (!result) return;
    
    character.found = true;
    setSession(sessionCopy);
  }

  const handleOpenPopup = () => {
    document.body.style.overflow = "hidden";
    setPopupOpen(true);
    setCrosshairVisible(true);
  }

  const handleClosePopup = () => {
    document.body.style.overflow = "scroll";
    setPopupOpen(false);
    setCrosshairVisible(false);
    setCoordinates({ x: null, y: null });
  }

  const handleClick = (e) => {
    if (gameOver) return;
    
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
      document.body.style.overflow = "hidden";
    }
    
    handleGameOver();
  
  }, [session, setTimerActive]);

  // Set the start timer when the component mounts
  useEffect(() => {
    if (gameOver || session.gameOver) return;

    const handleStartGame = async () => {
      await handleSetFirestoreStartData(session.firestoreId);
      setTime(0);
      setTimerActive(true);
    }

    handleStartGame();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="game" onClick={handleClick}>
      <img src={session.game.url} alt=""/>

      {crosshairVisible && 
        <div className="crosshair" style={returnTargetPosition(coordinates)}></div>
      }

      <ImageCredit />
      {popupOpen && <Popup coordinates={coordinates} />}        
      {gameOver && <Form />}
    </section>
  )
}

const ImageCredit = () => {
  return (
    <p className="credits">
      Image Credit:
      <a href="https://www.instagram.com/chekavo/">
        Egor Klyuchnyk
      </a>
    </p>
  )
}

const Popup = ({ coordinates }) => {
  const {
    session
  } = useContext(GameContext);

  return (
    <ul className="game-popup" data-id="popup" style={returnPopupPosition(coordinates)}>
    {session?.game?.characters?.map(character => (
        <li key={character.id} data-id={character.id} className={character.found ? 'found' : null}>
        {character.title}
        <img src={character.url || null} alt="" className={character.found ? "found-icon" : null}/>
        {/* {character.found && <div className="found-overlay">Found!</div>} */}
        </li>
    ))}

  </ul>
  )
}

export default Game;