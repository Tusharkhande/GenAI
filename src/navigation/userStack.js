import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import Dashboard from "../screens/DashBoard";
import About from "../screens/About";
import GetStarted from "../screens/GetStarted";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/SignUpScreen";
import StabilityImageGen from "../screens/StabilityImageGen";
import ExploreAiScreen from "../screens/ExploreAiScreen";
import WritingScreen from "../screens/WritingScreen";

const Stack = createNativeStackNavigator();

export default function UserStack() {
    return (
        <NavigationContainer>
            {console.log("user")}
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='Writing' component={WritingScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='About' component={About} />
                <Stack.Screen name='ExploreAI' component={ExploreAiScreen} />
                <Stack.Screen name='StabilityImageGen' component={StabilityImageGen} />
                {/* <Stack.Screen name='Begin' component={GetStarted} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
