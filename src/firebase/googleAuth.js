import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default googleAuth = async () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1095480992319-v0428v3jqmn5htkl4fck1ko1f51mfuvc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    const getUser = async() => {
        try {
            const currentUser = await GoogleSignin.signInSilently();
            setUser(currentUser);
          } catch (error) {
            console.error('Error getting current user:', error);
          }
    }
    getUser();
  }, []);

  //   console.log("hello googleAuth:   ",user);

  return user;
};
