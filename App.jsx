import { PermissionsAndroid, StatusBar } from 'react-native'
import { useEffect } from 'react'
import AppNavigation from './src/navigation';
import { getAuth } from 'firebase/auth';
import { assistantSpeech } from './src/constants/TextToSpeech';
import { Context } from './src/context/userContext';
import SplashScreen from 'react-native-splash-screen';

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

  assistantSpeech(`{Initializing startup sequence. Loading Custom Components. Fetching user data.}`);
  useEffect(() => {
    SplashScreen.hide();
    permission();
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        assistantSpeech("Logged in Successfully!");
        console.log('User is signed in');
      } else {
        setTimeout(() => {
          assistantSpeech(" No user data found. Kindly create a new account or log in.");
        }, 2000);
        console.log('User is signed out');
      }
    });
  },[]);


  return (
    <Context>
      <AppNavigation />
    </Context>
  )
}