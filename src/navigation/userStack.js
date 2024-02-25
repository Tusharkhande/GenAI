import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import Dashboard from "../screens/DashBoard";
import About from "../screens/About";
import StabilityImageGen from "../screens/ImageGenScreen";
import ExploreAiScreen from "../screens/ExploreAiScreen";
import WritingScreen from "../screens/WritingScreen";
import History from "../screens/History";

const Stack = createNativeStackNavigator();

export default function UserStack() {
    return (
        <NavigationContainer>
            {console.log("user")}
            <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='About' component={About} />
                <Stack.Screen name='History' component={History} />
                <Stack.Screen name='ExploreAI' component={ExploreAiScreen} />
                <Stack.Screen name='StabilityImageGen' component={StabilityImageGen} />
                <Stack.Screen name='Writing' component={WritingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
