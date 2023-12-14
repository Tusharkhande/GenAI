import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function googleStatus() {
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    const isSignedIn = async () => {
     GoogleSignin.configure({
        webClientId:
          '1095480992319-v0428v3jqmn5htkl4fck1ko1f51mfuvc.apps.googleusercontent.com',
        offlineAccess: true,
      });
      const isSignedIn = await GoogleSignin.isSignedIn();
      setIsSigned(isSignedIn);
    };

    isSignedIn();
  }, []); // Only run the effect when user changes

  //   console.log("hello googleAuth:   ",user);

  return isSigned;
}
