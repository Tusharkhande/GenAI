import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/SignUpScreen';
import {useUser} from '../context/userContext';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const {colorScheme} = useUser();
  return (
    <>
      <StatusBar
        animated={true}
        // translucent={true}
        backgroundColor={colorScheme === 'dark' ? 'black' : '#f8fafc'}
        barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'}
        showHideTransition="fade"
        // hidden={true}
      />
      <NavigationContainer>
        {console.log('auth')}
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
