import { useContext } from "react";
import GameContext from "../context/GameContext";
import { useForm } from "react-hook-form";
import { checkInputForProfanity } from "../helpers/checkInputForProfanity";
import { handleSetFirestoreUsername } from "../handles/handleSetFirestoreData";

const Form = () => {
  
  const {
    session,
    setSession,
    seconds,
    formatSeconds,
  } = useContext(GameContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm();

  const handleSubmitForm = (data) => {
    const { user } = data;
    
    if (checkInputForProfanity(user)) {
      setError("user", { type: "profanity" }, { shouldFocus: true });
      return;
    }

    handleSetFirestoreUsername(session.firestoreId, user);
    setSession({ ...session, gameOver: true, page: "Leaderboard" });
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <h2>Well Done!</h2>
      <p>Your time is <span>{formatSeconds(seconds)}</span></p>
      <label htmlFor="name">Enter your name below:</label>
      <input 
        type="text"
        id="name"
        name="user"
        placeholder={"Enter your name"}
        autoFocus
        maxLength={20}
        autoComplete="off"
        { ...register("user", { required: true, maxLength: 20 }) }
      />

      {errors.user?.type === "required" && <p role="alert">Please enter your name.</p>}
      {errors.user?.type === "maxLength" && <p role="alert">Maximum length is 20 characters.</p>}
      {errors.user?.type === "profanity" && <p role="alert">Please remove the profanity.</p>}
      
      <button>Submit</button>
    </form>
  )
}

export default Form;