import * as React from 'react';
import { View, Text } from 'react-native';
import useAuth from '../firebase/useAuth';

import UserStack from './userStack';
import AuthStack from './authStack';

export default function AppNavigation() {
    const { user } = useAuth();
    return user ? <UserStack /> : <AuthStack />;
}

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../screens/HomeScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/SignUpScreen';
// import GetStarted from '../screens/GetStarted';

// const Stack = createNativeStackNavigator();

// function AppNavigation() {
//     return (
//       <NavigationContainer>
//       <Stack.Navigator initialRouteName='Begin'>
//         <Stack.Screen name="Begin" options={{headerShown: false}} component={GetStarted}  />
//         <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}  />
//         <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
//         <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
//         <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppNavigation;

/* import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/SignUpScreen';
import GetStarted from '../screens/GetStarted';
import useAuth from '../firebase/useAuth';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { user } = useAuth();
  
  return (
    <NavigationContainer>
        {user ? (
          <>
          {console.log("if")}
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
          </>
        ) : (
          <>
          {console.log("else")}
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Begin'>
            <Stack.Screen name="Begin" component={GetStarted} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
          </>
        )}
    </NavigationContainer>
  );
}

export default AppNavigation;
 */


// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from '../screens/HomeScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import LoginScreen from '../screens/LoginScreen';
// import RegisterScreen from '../screens/SignUpScreen';
// import GetStarted from '../screens/GetStarted';
// import useAuth from '../firebase/useAuth';

// const Stack = createNativeStackNavigator();

// function AppNavigation() {
//   const { user } = useAuth();

//   if (user) {
//     console.log("if");
//     return (
//       <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Welcome'>
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     );
//   } else {
//     console.log("else");
//     return (
//       <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Begin'>
//         <Stack.Screen name="Begin" component={GetStarted} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     );
//   }


// }

// export default AppNavigation;
