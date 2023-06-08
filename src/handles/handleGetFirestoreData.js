import { collection, getDocs } from "firebase/firestore";
import { firestore, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

export const handleGetFirestoreData = async () => {
  const ref = collection(firestore, "levels")
  const response = await getDocs(ref);
  const levels = [];
  response.docs.forEach(doc => {
    levels.push({ ...doc.data(), id: doc.id });
  });
  
  levels.forEach(level => {
    handleDownloadImageFromStorage(level.image)
      .then(url => {
        level.url = url;
      });
  });
  return levels;
}

// Pass in storage url of each image from firestore data
const handleDownloadImageFromStorage = async (url) => {
  try {
    const gsRef = ref(storage, url);
    const response = await getDownloadURL(gsRef);
    return response;
  } catch (err) {
    console.log(err.message);
  }
}