import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, create } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import Dashboard from "../screens/DashBoard";
import About from "../screens/About";
import StabilityImageGen from "../screens/ImageGenScreen";
import ExploreAiScreen from "../screens/ExploreAiScreen";
import WritingScreen from "../screens/WritingScreen";
import ImageGenHistory from "../screens/ImageGenHistory";
import ChatHistory from "../screens/ChatHistory";
import History from "../screens/History";
import Documentation from "../screens/Documentation";
import { StatusBar } from "react-native";
import { useUser } from "../context/userContext";

const Stack = createNativeStackNavigator();

export default function UserStack() {
    const { colorScheme } = useUser();
    return (
        <>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={colorScheme === 'dark' ? 'black' : 'white'}
        barStyle={colorScheme === 'dark' ? 'dark-content' : 'light-content'}
        showHideTransition="fade"
        // hidden={true}
      />
        <NavigationContainer>
            {console.log("user")}
            <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Chat' component={ChatScreen} />
                <Stack.Screen name='Dashboard' component={Dashboard} />
                <Stack.Screen name='About' component={About} />
                <Stack.Screen name='Documentation' component={Documentation} />
                <Stack.Screen name='ImageGenHistory' component={ImageGenHistory} />
                <Stack.Screen name='ChatHistory' component={ChatHistory} />
                <Stack.Screen name='History' component={History} />
                <Stack.Screen name='ExploreAI' component={ExploreAiScreen} />
                <Stack.Screen name='StabilityImageGen' component={StabilityImageGen} />
                <Stack.Screen name='Writing' component={WritingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
}
