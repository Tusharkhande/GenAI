import { PermissionsAndroid, StatusBar } from 'react-native'
import { useEffect } from 'react'
import AppNavigation from './src/navigation';
import { getAuth } from 'firebase/auth';
import { assistantSpeech } from './src/constants/TextToSpeech';
import { Context } from './src/context/userContext';
import SplashScreen from 'react-native-splash-screen';
import Tts from 'react-native-tts';

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

  // Tts.setDefaultRate(0.6);
  // Tts.speak("Initializing startup sequence. Loading Custom Components. Fetching user data.", {
  //   androidParams: {
  //     KEY_PARAM_PAN: -1,
  //     KEY_PARAM_VOLUME: 1,
  //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
  //   },
  // });
  useEffect(() => {
    const initializeApp = async () => {
      try {
        permission();
        
        getAuth().onAuthStateChanged((user) => {
          if (user) {
            assistantSpeech("Logged in Successfully!");
            console.log('User is signed in');
          } else {
            setTimeout(() => {
              assistantSpeech("No user data found. Kindly create a new account or log in.");
            }, 2000);
            console.log('User is signed out');
          }
        });
  
        SplashScreen.hide();
      } catch (error) {
        console.error('Error during app initialization:', error);
      }
    };
    
    assistantSpeech("Initializing startup sequence. Loading Custom Components. Fetching user data.");
    initializeApp();
  },[]);


  return (
    <Context>
      <AppNavigation />
    </Context>
  )
}