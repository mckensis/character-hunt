import { firestore } from "../firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { checkIfTwoTimesAreSimilar } from "../helpers/checkIfTwoTimesAreSimilar";
import { getDifferenceBetweenTwoTimes } from "../helpers/getDifferenceBetweenTwoTimes";

export const handleSetFirestoreData = async (levelId) => {
  try {
    const ref = collection(firestore, "leaderboards");
    const response = await addDoc(ref, {
      level: levelId,
    });
    const { id } = response;
    return id;
  } catch (err) {
    console.log(err.message);
    return err;
  }
}

export const handleSetFirestoreStartData = async (id) => {
  try {
    const ref = doc(firestore, "leaderboards", id);
    await updateDoc(ref, {
      start: serverTimestamp(),
    });
  } catch (err) {
    console.log(err.message);
  }
}

export const handleSetFirestoreFinishData = async (id) => {
  try {
    const ref = doc(firestore, "leaderboards", id);
    await updateDoc(ref, {
      finish: serverTimestamp(),
    });
  } catch (err) {
    console.log(err.message);
  }
}

export const handleSetFirestoreUserData = async (id, user, time) => {
  try {
    const ref = doc(firestore, "leaderboards", id);
    let score;
    
    // Get the user's data from firestore
    const response = await getDoc(ref);
    // Get the total time elapsed according to the server timestamps
    const serverTimeElapsed = getDifferenceBetweenTwoTimes(response);
    
    // Compare the server time elapsed with the user's time
    if (checkIfTwoTimesAreSimilar(serverTimeElapsed, time)) {
      score = time;
    } else {
      score = serverTimeElapsed;
    }

    await updateDoc(ref, {
      user,
      score,
    });
  } catch (err) {
    console.log(err.message);
  }
}