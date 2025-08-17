import {ref, uploadBytes, deleteObject, getDownloadURL} from 'firebase/storage';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  orderBy,
} from 'firebase/firestore';
import {auth, db, storage} from './firebase.config';
import {ToastAndroid} from 'react-native';
import gemini from '../api/gemini';

// export async function fetchUserImages(userId, setImages, setLoading) {
//   setLoading(true);
//   const images = [];
//   const imagesQuery = query(
//     collection(db, 'user_images'),
//     where('userId', '==', userId),
//   );
//   const querySnapshot = await getDocs(imagesQuery);

//   for (const doc of querySnapshot.docs) {
//     const data = doc.data();
//     // console.log(data);
//     // console.log(storage, data.fullPath);
//     const imageRef = ref(storage, data.fullPath);
//     const imageUrl = await getDownloadURL(imageRef);
//     images.push({
//       name: data.imageName,
//       url: imageUrl,
//       path: data.fullPath,
//       prompt: data.prompt,
//       date: data.createdAt,
//     });
//   }
//   const sortedImages = images.sort((a, b) => b.date - a.date);
//   setImages(sortedImages);
//   console.log(images);
//   setLoading(false);

//   // return images;
// }

export async function fetchUserImages(userId, setImages, setLoading) {
  try {
    setLoading(true);
    const images = [];
    const imagesQuery = query(
      collection(db, 'user_images'),
      where('userId', '==', userId),
    );
    const querySnapshot = await getDocs(imagesQuery);

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
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
  } catch (error) {
    console.error("Error fetching user images:", error);
    alert("Failed to fetch images. Please check your permissions.");
  } finally {
    setLoading(false);
  }
}


async function saveImageMetadata(metadata, userId, prompt) {
  try {
    await addDoc(collection(db, 'user_images'), {
      userId: userId,
      imageName: metadata.name,
      fullPath: metadata.fullPath,
      prompt: prompt,
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
  if (user) {
    userId = user.uid;
    try {
      const blob = await fetch(imagePath).then(r => r.blob());

      const fileName = `image_${new Date().toISOString()}.jpg`;
      const storageRef = ref(storage, `images/${userId}/${fileName}`);

      const snapshot = await uploadBytes(storageRef, blob);
      console.log('Image uploaded from cache', snapshot);
      await saveImageMetadata(snapshot.metadata, user.uid, prompt);
      console.log('saved image metadata');
    } catch (error) {
      console.error('Error uploading image from cache', error);
    }
  } else {
    console.log('user is not signed in');
  }
}

async function deleteImageMetadata(fullPath) {
  const imagesRef = collection(db, 'user_images');
  const q = query(imagesRef, where('fullPath', '==', fullPath));

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async document => {
      await deleteDoc(doc(db, 'user_images', document.id));
    });
    console.log('Image metadata successfully deleted from Firestore');
  } catch (error) {
    console.error('Error deleting image metadata from Firestore', error);
  }
}

export async function deleteImageFromStorage(fullPath, images, setImages) {
  const imageRef = ref(storage, fullPath);

  try {
    await deleteObject(imageRef);
    await deleteImageMetadata(fullPath);
    ToastAndroid.show('Deletion Successful!', ToastAndroid.SHORT);
    const updatedImages = images.filter(image => image.path !== fullPath);
    const sortedImages = updatedImages.sort((a, b) => b.date - a.date);
    setImages(sortedImages);
    console.log('Image successfully deleted');
  } catch (error) {
    ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    console.error('Error deleting image ', error);
  }
}

export async function fetchChatSessions(userId, setLoading, setChatSessions) {
  setLoading(true);
  try {
    const sessionsQuery = query(
      collection(db, 'chat_sessions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    );
    const querySnapshot = await getDocs(sessionsQuery);
    const chatSessions = [];
    querySnapshot.forEach(doc => {
      chatSessions.push({id: doc.id, ...doc.data()});
    });
    console.log(chatSessions);
    setChatSessions(chatSessions);
    setLoading(false);
  } catch (e) {
    console.log(e);
    setLoading(false);
    ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
  }
}

export async function fetchMessagesForSession(
  sessionId,
  setLoading,
  setMessages,
) {
  if (!sessionId) {
    console.error('Session ID is undefined');
    return;
  }
  setLoading(true);
  const q = query(
    collection(db, 'messages'),
    where('sessionId', '==', sessionId),
    orderBy('createdAt', 'asc'),
  );

  try {
    const querySnapshot = await getDocs(q);
    console.log(`Found ${querySnapshot.docs.length} documents`);

    const messages = querySnapshot.docs.map(doc => {
      const data = doc.data();
      if (data.base64String) {
        return {
          role: data.role,
          content: data.content,
          base64String: data.base64String,
        };
      } else {
        return {role: data.role, content: data.content};
      }
    });

    console.log('Messages:', messages); // Debug log
    setMessages(messages);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching messages:', error);
    setLoading(false);
  }
}

export async function saveChatSession(
  userId,
  messages,
  selectedModel,
  existingSessionId,
) {
  try {
    let sessionRef;
    let filteredMessages = messages.map(({base64String, ...rest}) => rest);
    if (selectedModel.name === 'GenAI' || selectedModel.name === 'Vision') {
      const base64Pattern =
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

      filteredMessages = messages.map(({content, role}) => ({
        content:
          role === 'assistant' && base64Pattern.test(content)
            ? 'https://th.bing.com/th/id/OIG2.ifBa_Tkj1cGKx5Do3YLd?pid=ImgGn'
            : content,
        role,
      }));
    }
    const messagesString = JSON.stringify(filteredMessages);
    console.log(messagesString);
    if (existingSessionId) {
      const sessionDocRef = doc(db, 'chat_sessions', existingSessionId);
      sessionRef = {id: existingSessionId};
      await updateDoc(sessionDocRef, {
        lastModified: serverTimestamp(),
      });
    } else {
      const title = await gemini(
        'Take a look at this ' +
          messagesString +
          '. Respond ONLY with a short title. Do not add any explanation or extra text.'
      );
      const newSessionRef = await addDoc(collection(db, 'chat_sessions'), {
        userId,
        title,
        selectedModel: selectedModel,
        createdAt: serverTimestamp(),
      });
      sessionRef = newSessionRef;
    }

    const existingMessagesQuery = query(
      collection(db, 'messages'),
      where('sessionId', '==', sessionRef.id),
    );
    const existingMessagesSnapshot = await getDocs(existingMessagesQuery);
    const existingMessages = existingMessagesSnapshot.docs.map(
      doc => doc.data().content,
    );

    for (const message of messages) {
      if (!existingMessages.includes(message.content)) {
        await addDoc(collection(db, 'messages'), {
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

export async function deleteSessionAndMessages(
  // userId,
  sessionId,
  setLoading,
  setChatSessions,
  chatSessions,
) {
  setLoading(true);
  const messagesRef = collection(db, 'messages');
  const messagesQuery = query(messagesRef, where('sessionId', '==', sessionId));

  try {
    const querySnapshot = await getDocs(messagesQuery);
    const deletePromises = [];
    querySnapshot.forEach(document => {
      const deletePromise = deleteDoc(doc(db, 'messages', document.id));
      deletePromises.push(deletePromise);
    });
    await Promise.all(deletePromises);
    console.log('All associated messages successfully deleted');
  } catch (error) {
    setLoading(false);
    console.error('Error deleting associated messages', error);
    return;
  }

  try {
    await deleteDoc(doc(db, 'chat_sessions', sessionId));
    console.log('Session successfully deleted');
    setLoading(false);
    // fetchChatSessions(userId, setLoading, setChatSessions);
    const updatedChatSessions = chatSessions.filter(
      session => session.id !== sessionId,
    );
    setChatSessions(updatedChatSessions);
    ToastAndroid.show('Deletion Successful!', ToastAndroid.SHORT);
  } catch (error) {
    setLoading(false);
    console.error('Error deleting session', error);
    ToastAndroid.show(
      'Something went wrong while deleting the session',
      ToastAndroid.SHORT,
    );
  }
}
