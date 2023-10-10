import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.config';

export default function useAuth() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setUser(user) : setUser(undefined);
      console.log(unsubscribe);
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