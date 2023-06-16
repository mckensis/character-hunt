import { useContext } from "react";
import GameContext from "../context/GameContext";

const LevelCard = ({ level }) => {

  const {
    session,
  } = useContext(GameContext);

  return (
    <li className={session.leaderboard === level.id ? "level-card active" : "level-card"} data-id={level.id}>
      <div className="overlay"></div>
      <div className="info">
        <p>{level.title}</p>
        <CharacterList level={level}/>
      </div>
      <img src={level.url} alt="" />
    </li>
  )
}

const CharacterList = ({ level }) => {
  return (
    <ul className="characters">            
      {level?.characters?.map(character => (
        <li key={character.id} className="icon" title={character.title}>
          <img src={character.url || null} alt=""/>
        </li>
      ))}
    </ul>
  )
}

export default LevelCard;