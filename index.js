/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import { assistantSpeech } from './src/constants/TextToSpeech';

// assistantSpeech("Initializing startup sequence. Loading Custom Components. Fetching user data.");
AppRegistry.registerComponent(appName, () => App);
