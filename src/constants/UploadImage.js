import { getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";


async function saveImageMetadata(metadata, userId, prompt) {
  try {
    await addDoc(collection(db, "user_images"), {
      userId: userId,
      imageName: metadata.name,
      fullPath: metadata.fullPath,
      prompt : prompt,
      createdAt: new Date().getTime(),
    });
    console.log('Image metadata saved in Firestore');
  } catch (error) {
    console.error('Error saving image metadata', error);
  }
}



export async function uploadImageFromCache(imagePath, prompt) {
  const user = auth.currentUser;
  let userId = user.uid;
  if(user){
    userId = user.uid;
  try {
    const blob = await fetch(imagePath).then(r => r.blob());

    const fileName = `image_${new Date().toISOString()}.jpg`;
    const storageRef = ref(storage, `images/${userId}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, blob);
    console.log('Image uploaded from cache', snapshot);
    await saveImageMetadata(snapshot.metadata, user.uid, prompt);
    console.log("saved image metadata");

  } catch (error) {
    console.error('Error uploading image from cache', error);
  }
}else{
  console.log('user is not signed in');
}
}
