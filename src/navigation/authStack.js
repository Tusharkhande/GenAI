import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GetStarted from '../screens/GetStarted';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import Dashboard from '../screens/DashBoard';
import About from '../screens/About';
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            {console.log("auth")}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Begin' component={GetStarted} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='About' component={About} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}