import { firestore, storage } from "../firebase";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

export const handleGetFirestoreLevelData = async () => {
  try {
    // Get all levels data from firestore and push into the levels array
    const levels = [];
    const ref = collection(firestore, "levels");
    const response = await getDocs(ref);
    
    response.docs.forEach(doc => {
      levels.push({ ...doc.data(), id: doc.id });
    });
    
    // Download the images from firebase storage for the levels and characters
    for (const level of levels) {
      if (!level.image) throw new Error("No level image to look up.");
      const url = await handleDownloadImageFromStorage(level.image);
      level.url = url;

      for (const character of level.characters) {
        if (!character.image) throw new Error("No character image to look up.")
        const url = await handleDownloadImageFromStorage(character.image);
        character.url = url;
        character.found = false;
      }
    }
    return levels;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export const handleGetFirestoreDataById = async (id) => {
  try {
    if (!id) throw new Error("No ID to look up.");

    const ref = doc(firestore, "leaderboards", id);
    const response = await getDoc(ref);
    
    const data = { ...response.data() };
    const time = new Date(data.start.seconds * 1000);
    
    return time;

  } catch (err) {
    console.log(err.message);
    return err;
  }
}

// Pass in storage url of each image from firestore data
export const handleDownloadImageFromStorage = async (url) => {
  try {
    if (!url) throw new Error("No URL to look up.");

    const gsRef = ref(storage, url);
    const response = await getDownloadURL(gsRef);
    
    return response;

  } catch (err) {
    console.log(err.message);
    return err;
  }
}

export const handleGetFirestoreTimes = async (id) => {
  try {
    if (!id) throw new Error("Can't look up times.");

    const ref = doc(firestore, "leaderboards", id);
    const response = await getDoc(ref);
    const data = { ...response.data(), id: response.id };
    console.log(data);
    return data;

  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

export const handleGetLeaderboardData = async (id) => {
  try {
    if (!id) throw new Error("No ID Provided.");

    const leaderboard = [];

    const ref = collection(firestore, "leaderboards");
    const q = query(ref, where("level", "==", id), orderBy("score", "asc"));

    const response = await getDocs(q);

    response.docs.forEach(doc => {
      leaderboard.push({ ...doc.data(), id: doc.id });
    });

    // Only return leaderboard data which has user and seconds properties
    const filtered = [ ...leaderboard.filter(doc => doc.user && doc.score) ];

    return filtered;

  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}