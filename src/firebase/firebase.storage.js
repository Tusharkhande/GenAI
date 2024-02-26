import {  ref, uploadBytes, deleteObject } from "firebase/storage";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc  } from "firebase/firestore";
import { auth, db, storage  } from "./firebase.config";
import { ToastAndroid } from "react-native";

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


async function deleteImageMetadata(fullPath) {
  const imagesRef = collection(db, "user_images");
  const q = query(imagesRef, where("fullPath", "==", fullPath));

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, "user_images", document.id));
    });
    console.log('Image metadata successfully deleted from Firestore');
  } catch (error) {
    console.error('Error deleting image metadata from Firestore', error);
  }
}

export async function deleteImageFromStorage(fullPath) {
    const imageRef = ref(storage, fullPath);
  
    try {
      await deleteObject(imageRef);
      await deleteImageMetadata(fullPath);
      ToastAndroid.show('Deletion Successful!', ToastAndroid.SHORT);
      console.log('Image successfully deleted from storage');
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      console.error('Error deleting image from storage', error);
    }
  }