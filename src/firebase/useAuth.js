import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';


export default function useAuth() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser('');
      console.log("unsubscribe", unsubscribe);
      return unsubscribe;
      // if (user) {
      //   setUser(usr);
      //   console.log(usr);
      // } else {
      //   setUser(null);
      // }
    });
  }, []);
  console.log(user);
  
  return {user};
}