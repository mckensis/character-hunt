import { useContext } from "react";
import { useForm } from "react-hook-form";
import GameContext from "context/GameContext";
import { checkInputForProfanity } from "helpers/checkInputForProfanity";
import { handleSetFirestoreUserData } from "handles/handleSetFirestoreData";
import { formatTime } from "helpers/formatTime";
import { handleUnlockScroll } from "helpers/handleUnlockScroll";
import { handleResetCharacterData } from "helpers/handleResetCharacterData";

const Form = ({ gameOver }) => {
  
  const {
    time,
    setTime,
    session,
    setSession,
  } = useContext(GameContext);
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  if (!gameOver) return;

  const handleUpdateSessionData = () => {
    const sessionCopy = { ...session, gameOver: true, page: "Leaderboard" };
    handleResetCharacterData(sessionCopy.game.characters);
    setSession(sessionCopy);
  }
  
  const handleSubmitForm = async (data) => {
    const { user } = data;
    
    if (checkInputForProfanity(user)) {
      setError("user", { type: "profanity" }, { shouldFocus: true });
      return;
    }

    await handleSetFirestoreUserData(session.firestoreId, user, time);
    setTime(0);
    handleUnlockScroll();
    handleUpdateSessionData();
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <h2>Well Done!</h2>
      <h3>Your time is <span>{formatTime(time)}</span></h3>
      <p>Enter your name below & submit your score to the leaderboards!</p>
      <label htmlFor="name">Name:</label>
      <input 
        autoFocus
        type="text"
        id="name"
        name="user"
        placeholder="Enter your name"
        maxLength={20}
        autoComplete="off"
        { ...register("user", { required: true, maxLength: 20 }) }
      />

      {errors.user?.type === "required" && <p role="alert">Please enter your name.</p>}
      {errors.user?.type === "maxLength" && <p role="alert">Maximum length is 20 characters.</p>}
      {errors.user?.type === "profanity" && <p role="alert">Please remove the profanity.</p>}
      
      <button>Submit Score to Leaderboard</button>
    </form>
  )
}

export default Form;