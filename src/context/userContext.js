import {createContext, useContext, useState, useEffect} from 'react';

import React from 'react';
import {assistantSpeech} from '../constants/TextToSpeech';
import {select_beep, err_beep} from '../constants/Sounds';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {
  GoogleSignin,
  statusCodes,
  
} from '@react-native-google-signin/google-signin';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function Context({children}) {
  const [user, setUser] = useState(null);
  const [guser, setGuser] = useState(null);
  const [gUserAvatar, setGUserAvatar] = useState('6');
  const [isLoggedin, setIsLoggedin] = useState(false);

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
          // Signed in
          // ToastAndroid.show("Logged in successfully!", ToastAndroid.SHORT);
          // assistantSpeech("Logged in successfully");
          console.log('Logged in successfully');
          // EncryptedStorage.setItem('user_session', JSON.stringify(userCredential.user));
          // navigation.navigate('Welcome');
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

/*   const loginWithGoogle = async (navigation) => {
    // setIsLoading(true);
    try {
      console.log('Checking Play Services...');
      await GoogleSignin.hasPlayServices();
      console.log('Signing in...');
      const userInfo = await GoogleSignin.signIn();
      setIsLoggedin(true);
      setGuser(userInfo.user);
      navigation.navigate('Welcome');
      // navigation.navigate('Welcome');
      console.log('Signed in. User info:', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

*/

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
        setGuser(firebaseUserCredential.user); // You might want to update this to handle Firebase user object
        setGUserAvatar(firebaseUserCredential.user.photoURL);
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        console.error('Firebase Auth with Google failed:', error);
      });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available or outdated
    } else {
      // Some other error happened
      console.log(error);
    }
  }finally{
    setIsLoading(false);
  }
};


  const createUser = async ( email, password, name, setErrorMessage, errorMessage, setIsLoading, setCurrentUser
  ) => {
    select_beep();
    if (email === '' || password === '' || name === '') {
      err_beep();
      setErrorMessage('Please fill in all fields.');
      assistantSpeech(errorMessage);
      return;
    }
    if (!email.includes('@')) {
      err_beep();
      setErrorMessage('Please enter a valid email address.');
      assistantSpeech(errorMessage);
      return;
    }
    if (password.length < 6) {
      err_beep();
      setErrorMessage('Password must be at least 6 characters.');
      assistantSpeech(errorMessage);
      return;
    }
    setErrorMessage('');
    setEmail(email.toLowerCase());
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          // console.log('User account created & signed in!');
          // console.log(result)
          // ToastAndroid.show("User account created & Signed in Successfully!", ToastAndroid.SHORT);
          // updateCurrentUser(auth.currentUser, {
          //   displayName: name,
          // });
          // navigation.navigate('Welcome')
          setCurrentUser(result.user);
          setGuser(result.user);
          updateProfile(result.user, {
            displayName: name,
            photoURL: selectedAvatar,
          })
            .then(() => {
              console.log('User account created & signed in!');
              console.log(result);
              assistantSpeech('Account Created successfully');
              // ToastAndroid.show("User account created & Signed in Successfully!", ToastAndroid.SHORT);
              // navigation.navigate('Welcome')
            })
            .catch(updateError => {
              console.error('Error updating displayName:', updateError);
            });
          // storeData();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('Entered email address is already in use!');
            setErrorMessage('Entered email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            console.log('Entered email address is invalid!');
            setErrorMessage('Entered email address is invalid!');
          } else if (error.code === 'auth/weak-password') {
            console.log('Password should be at least 6 characters!');
            setErrorMessage('Password should be at least 6 characters!');
          } else if (error.code === 'auth/wrong-password') {
            console.log('Wrong password!');
            setErrorMessage('Wrong password!');
          }
          console.error(error);
        });
    } catch (error) {
      console.log(error);
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
        try {
          const guser = (await GoogleSignin.signInSilently()).user;
          setGuser(guser);
        } catch (error) {
          console.error('Error getting current user:', error);
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
    // if (guser) {
    //   try {
    //     //  GoogleSignin.signOut();
    //     await GoogleSignin.revokeAccess();
    //     console.log('Signed out Successfully');
    //     assistantSpeech('Logged out successfully');
    //     navigation.navigate('Begin');
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else if (user) {
    //   auth
    //     .signOut()
    //     .then(() => {
    //       logout_beep();

    //       assistantSpeech('Logged out successfully');
    //       // ToastAndroid.show("Sign out successful", ToastAndroid.SHORT);
    //       // navigation.navigate('Welcome');
    //     })
    //     .catch(error => console.log(error.message));
    // }
    auth
        .signOut()
        .then(() => {
          logout_beep();

          assistantSpeech('Logged out successfully');
          // ToastAndroid.show("Sign out successful", ToastAndroid.SHORT);
          // navigation.navigate('Welcome');
        })
        .catch(error => console.log(error.message));
        await GoogleSignin.signOut();
    setLoading(false);
  };

  const deleteAccount = async (setDelModalVisible,navigation, setLoading) => {
    select_beep();
    setDelModalVisible(false);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.currentUser
        .delete()
        .then(() => {
          console.log('User deleted successfully');
          assistantSpeech('Account deletion successfull');
          // ToastAndroid.show("User deleted successfully", ToastAndroid.SHORT);
          navigation.navigate('Begin');
        })
        .catch(error => {
          console.log('Error deleting user', error);
          Alert.alert('Error deleting user try again: ' + error.message);
        });
    } catch (e) {
      console.log(e);
      Alert.alert('Error deleting user try again: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{user, setUser, guser, setGuser, login, loginWithGoogle, createUser, getUserData, setGUserAvatar, gUserAvatar, isLoggedin, signOut, deleteAccount}}>
      {children}
    </UserContext.Provider>
  );
}
