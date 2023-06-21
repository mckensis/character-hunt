import { useContext } from "react";
import GameContext from "context/GameContext";

const CharacterList = ({ level, component }) => {
  
  const {
    session,
  } = useContext(GameContext);

  let copy;

  if (component === "header") {
    copy = { ...session.game };
  } else {
    copy = { ...level };
  }

  return (
    <ul className="characters">            
      {copy?.characters?.map(character => (
        <li
          key={character.id}
          className={character.found ? "found-icon" : "icon"}
          title={character.title}
        >
          <img src={character.url} alt=""/>
        </li>
      ))}
    </ul>
  )
}

export default CharacterList;