import {createContext, useContext, useState, useEffect} from 'react';

import React from 'react';
import {assistantSpeech} from '../constants/TextToSpeech';
import {select_beep, err_beep, logout_beep} from '../constants/Sounds';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {
  GoogleSignin,
  statusCodes,
  
} from '@react-native-google-signin/google-signin';
import { ToastAndroid } from 'react-native';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function Context({children}) {
  const [user, setUser] = useState(null);
  const [guser, setGuser] = useState(null);
  const [gUserAvatar, setGUserAvatar] = useState('9');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [name, setName] = useState('Sir');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1095480992319-v0428v3jqmn5htkl4fck1ko1f51mfuvc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    // getUserData();
  }, []);

  const login = async (
    email,
    password,
    setErrorMessage,
    errorMessage,
    setIsLoading,
  ) => {
    select_beep();
    // const auth = getAuth();
    if (email.trim() === '' && password === '') {
      err_beep();
      setErrorMessage('Please enter email and password.');
      assistantSpeech(errorMessage);
      return;
    } else if (email.trim() === '') {
      err_beep();
      setErrorMessage('Please enter email.');
      assistantSpeech(errorMessage);
      return;
    } else if (password === '') {
      err_beep();
      setErrorMessage('Please enter password.');
      assistantSpeech(errorMessage);
      return;
    }
    setErrorMessage('');
    // setEmail(email.toLowerCase());
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          console.log('Logged in successfully');
          // EncryptedStorage.setItem('user_session', JSON.stringify(userCredential.user));
          const user = userCredential.user;
          setIsLoggedin(true);
          setUser(user);
          setGUserAvatar(user.photoURL);
          console.log(user);
        })
        .catch(error => {
          const errorCode = error.code;
          const errormessage = error.message;
          setErrorMessage('Invalid email or password');
          err_beep();
          assistantSpeech(errorMessage);
          console.log(errorCode, errormessage);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

const loginWithGoogle = async (navigation, setIsLoading) => {
  try {
    setIsLoading(true);
    console.log('Checking Play Services...');
    await GoogleSignin.hasPlayServices();
    console.log('Signing in...');
    const userInfo = await GoogleSignin.signIn();
    
    // Obtain the ID token from the Google Sign-In response
    const idToken = userInfo.idToken;
    // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken);
    // Sign-in to Firebase with the Google credential
    await signInWithCredential(auth, googleCredential)
      .then((firebaseUserCredential) => {
        console.log('Firebase Auth successful, user:', firebaseUserCredential.user);
        setIsLoggedin(true);
        setName(firebaseUserCredential.user.displayName);
        setGuser(firebaseUserCredential.user);
        if(firebaseUserCredential.user.photoURL.includes('https')){
          setGUserAvatar(require('../../assets/images/avatars/arc.jpg'));
        }else{
          setGUserAvatar(firebaseUserCredential.user.photoURL);
        }
        // navigation.navigate('Welcome');
      })
      .catch((error) => {
        console.error('Firebase Auth with Google failed:', error);
      });
  } catch (error) {
    let msg = error.message;
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }finally{
    setIsLoading(false);
  }
};


  const createUser = async ( setEmail, email, password, name, setErrorMessage, errorMessage, setIsLoading, selectedAvatar
  ) => {
    select_beep();
    if (email === '' || password === '' || name === '') {
      err_beep();
      setErrorMessage('Please fill in all fields.');
      return;
    }
    // if (!email.includes('@')) {
    //   err_beep();
    //   setErrorMessage('Please enter a valid email address.');
    //   assistantSpeech(errorMessage);
    //   return;
    // }
    // if (password.length < 6) {
    //   err_beep();
    //   setErrorMessage('Password must be at least 6 characters.');
    //   assistantSpeech(errorMessage);
    //   return;
    // }
    setEmail(email.toLowerCase());
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          // setCurrentUser(result.user);
          setName(name);
          setGUserAvatar(selectedAvatar);
          // setGuser(result.user);
          updateProfile(result.user, {
            displayName: name,
            photoURL: selectedAvatar,
          })
            .then(() => {
              console.log('User account created & signed in!');
              console.log(result);
              assistantSpeech('Account Created successfully');
            })
            .catch(updateError => {
              console.error('Error updating displayName:', updateError);
            });
          // storeData();
        })
        .catch(error => {
          const msg = error.message;
          if (msg.includes('(auth/email-already-in-use)')) {
            console.log('Entered email address is already in use!');
            setErrorMessage('Entered email address is already in use!');
          } else if (msg.includes('(auth/invalid-email)')) {
            console.log('Entered email address is invalid!');
            setErrorMessage('Entered email address is invalid!');
          } else if (msg.includes('(auth/weak-password)')) {
            console.log('Password should be at least 6 characters!');
            setErrorMessage('Password should be at least 6 characters!');
          } else if (msg.includes('(auth/wrong-password)')) {
            console.log('Wrong password!');
            setErrorMessage('Wrong password!');
          }else{
            setErrorMessage('Something went wrong!');
          }
          
          // const error = err.nativeErrorMessage;
          console.log(error);
        });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
       const currentUser = auth.currentUser;
      setUser(currentUser);
      // Check if the user is signed in with Google
      // if (currentUser) {
      //   const unsubscribe = onAuthStateChanged(auth, (user) => {
      //     user ? setUser(user) : setUser(undefined);
      //     console.log("unsubscribe", unsubscribe);
      //     // return unsubscribe;
      //   });
      // }else{
        // try {
        //   const guser = (await GoogleSignin.signInSilently()).user;
        //   guser?setGuser(guser):setGuser(null);
        // } catch (error) {
        //   console.error('Error getting current user:', error);
        // }
        if (currentUser && currentUser.providerData.some(provider => provider.providerId === 'google.com')) {
          setGuser(currentUser);
        }
      // }
  
      // Check if the user is signed in with Facebook
      // if (currentUser && currentUser.providerData.some(provider => provider.providerId === 'facebook.com')) {
      //   console.log('User signed in with Facebook');
      // }
  
      // Check other providers,
      // Else, your're signed in with email

    } catch (error) {
      console.error(error.message);
    }
  };

  const signOut = async (setLoading) => {
    setLoading(true);
    try{
      await auth.signOut();
      await GoogleSignin.signOut();
      console.log("logged out")
      logout_beep();
      assistantSpeech('Logged out successfully');
      setUser(null);
      setGuser(null);
    }catch(e){
      console.log(e);
    }
    setLoading(false);
  };

  const deleteAccount = async (setDelModalVisible, setLoading, email, password) => {
    select_beep();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.currentUser
        .delete()
        .then(() => {
          console.log('User deleted successfully');
          assistantSpeech('Account deletion successfull');
          setUser(null);
          setDelModalVisible(false);
          // ToastAndroid.show("User deleted successfully", ToastAndroid.SHORT);
          // navigation.navigate('Welcome');
        })
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Wrong Password!', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };


  return (
    <UserContext.Provider value={{user, setUser, guser,name, login, loginWithGoogle, createUser, getUserData, setGUserAvatar, gUserAvatar, isLoggedin, signOut, deleteAccount}}>
      {children}
    </UserContext.Provider>
  );
}
