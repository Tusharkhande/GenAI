import { PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigation from './src/navigation'

export default function App() {
  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Record audio permission granted');
      } else {
        console.log('Record audio permission denied');
      }
    } catch (error) {
      console.log('Error while requesting record audio permission:', error);
    }
  };
  

  useEffect(() => {
    permission();

  },[]);


  return (
    <AppNavigation />
  )
}