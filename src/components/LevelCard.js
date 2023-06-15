import { useContext, useEffect } from "react";
import GameContext from "../context/GameContext";

const LevelCard = ({ level }) => {

  const {
    session,
  } = useContext(GameContext);

  useEffect(() => {
    console.log(level.id);
    console.log(session.leaderboard);
  }, []);

  return (
    <li className={session.leaderboard === level.id ? "level-card active" : "level-card"} data-id={level.id}>
      <img src={level.url} alt="" />
      <div className="overlay"></div>
      <div className="info">
        <p>{level.title}</p>
        <p>{level.difficulty}</p>
      </div>
    </li>
  )
}

export default LevelCard;