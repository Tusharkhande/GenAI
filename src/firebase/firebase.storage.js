import {  ref, uploadBytes, deleteObject,getDownloadURL } from "firebase/storage";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, serverTimestamp, updateDoc, setDoc  } from "firebase/firestore";
import { auth, db, storage  } from "./firebase.config";
import { ToastAndroid } from "react-native";
import gemini from "../api/gemini";

export async function fetchUserImages(userId, setImages) {
  // setLoading(true);
  const images = [];
  const imagesQuery = query(
    collection(db, 'user_images'),
    where('userId', '==', userId),
  );
  const querySnapshot = await getDocs(imagesQuery);

  for (const doc of querySnapshot.docs) {
    const data = doc.data();
    // console.log(data);
    // console.log(storage, data.fullPath);
    const imageRef = ref(storage, data.fullPath);
    const imageUrl = await getDownloadURL(imageRef);
    images.push({
      name: data.imageName,
      url: imageUrl,
      path: data.fullPath,
      prompt: data.prompt,
      date: data.createdAt,
    });
  }
  const sortedImages = images.sort((a, b) => b.date - a.date);
  setImages(sortedImages);
  // console.log(images);
  // setLoading(false);

  // return images;
}

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

  // export async function saveChatSession(userId, messages, selectedModel) {
  //   try {
  //     // Save the chat session
  //     const messagesString = JSON.stringify(messages);
  //     console.log(messagesString)
  //     const title = await gemini("take a look at this "+ messagesString + "and tell a short title for it");
  //     const sessionRef = await addDoc(collection(db, "chat_sessions"), {
  //       userId,
  //       title,
  //       selectedModel,
  //       createdAt: serverTimestamp(),
  //     });
  
  //     // Save each message under the messages collection with a reference to the chat session
  //     for (const message of messages) {
  //       await addDoc(collection(db, "messages"), {
  //         ...message,
  //         sessionId: sessionRef.id,
  //         createdAt: serverTimestamp(),
  //       });
  //     }
  //     console.log('Chat session and messages saved');
  //   } catch (error) {
  //     console.error('Error saving chat session', error);
  //   }
  // }


  export async function saveChatSession(userId, messages, selectedModel, existingSessionId) {
    try {
      let sessionRef;
      const messagesString = JSON.stringify(messages);
      console.log(messagesString);
      if (existingSessionId) {
        const sessionDocRef = doc(db, "chat_sessions", existingSessionId);
        sessionRef = { id: existingSessionId };
        await updateDoc(sessionDocRef, {
          lastModified: serverTimestamp(),
        });
      } else {
        const title = await gemini("take a look at this " + messagesString + " and tell a short title for it");
        const newSessionRef = await addDoc(collection(db, "chat_sessions"), {
          userId,
          title,
          selectedModel: selectedModel, 
          createdAt: serverTimestamp(),
        });
        sessionRef = newSessionRef;
      }
  
      const existingMessagesQuery = query(
        collection(db, "messages"),
        where("sessionId", "==", sessionRef.id)
      );
      const existingMessagesSnapshot = await getDocs(existingMessagesQuery);
      const existingMessages = existingMessagesSnapshot.docs.map(doc => doc.data().content); 

      for (const message of messages) {
        if (!existingMessages.includes(message.content)) {
          await addDoc(collection(db, "messages"), {
            ...message,
            sessionId: sessionRef.id,
            createdAt: serverTimestamp(),
          });
        }
      }
      console.log('Chat session and messages saved/updated');
    } catch (error) {
      console.error('Error saving/updating chat session', error);
    }
  }