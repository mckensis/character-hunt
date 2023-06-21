import { useContext } from "react";
import GameContext from "context/GameContext";
import CharacterList from "components/CharacterList";

// Card used by leaderboard and home page to display each level
const LevelCard = ({ level, type }) => {

  const {
    session,
  } = useContext(GameContext);

  return (
    <li className={session.leaderboard === level.id ? "level-card active" : "level-card"} data-id={level.id}>
      <div className="info">
        <p>{level.title}</p>
        {type === "select" &&
          <CharacterList level={level} component="card"/>
        }
      </div>
      <img src={level.thumbnail} alt="" />
    </li>
  )
}

export default LevelCard;