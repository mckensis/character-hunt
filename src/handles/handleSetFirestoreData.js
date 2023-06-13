import { firestore } from "../firebase";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const handleSetFirestoreData = async (levelId) => {
  try {
    const ref = collection(firestore, "leaderboards");
    const response = await addDoc(ref, {
      level: levelId,
      user: null,
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

export const handleSetFirestoreUsername = async (id, user) => {
  try {
    const ref = doc(firestore, "leaderboards", id);
    await updateDoc(ref, {
      user
    });
  } catch (err) {
    console.log(err.message);
  }
}