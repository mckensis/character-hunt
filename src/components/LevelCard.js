const LevelCard = ({ level }) => {
  return (
    <li className="level-card" data-id={level.id}>
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