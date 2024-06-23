// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAdzxb8-SBYF5XDwZW7wXsJgTQp6lZn2bE",
//   authDomain: "genai-fcb66.firebaseapp.com",
//   projectId: "genai-fcb66",
//   storageBucket: "genai-fcb66.appspot.com",
//   messagingSenderId: "1095480992319",
//   appId: "1:1095480992319:web:321e8c59a6f3213b43ce8a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export {auth};

import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdzxb8-SBYF5XDwZW7wXsJgTQp6lZn2bE",
  authDomain: "genai-fcb66.firebaseapp.com",
  projectId: "genai-fcb66",
  storageBucket: "genai-fcb66.appspot.com",
  messagingSenderId: "1095480992319",
  appId: "1:1095480992319:web:321e8c59a6f3213b43ce8a"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage = getStorage();
const db = getFirestore(app);
export { auth, db, storage };

