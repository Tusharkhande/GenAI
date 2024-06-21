import { View, Text, Image, TouchableOpacity, ImageBackground, BackHandler, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { select_beep } from '../constants/Sounds';
import AppExit from '../components/AppExit'
import { useUser } from '../context/userContext';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    const [exit, setExit] = useState(false);
    const {colorScheme} = useUser();
    const handleBackPress = () => {
        setExit(true);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    return (
        // <ImageBackground
        //     source={require("../../assets/images/bg6.gif")}
        //     style={{ flex: 1 }}
        // >
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" >
            <View className="flex-1 flex justify-center my-4">
                <Text
                    className="text-slate-900 dark:text-slate-200 font-mono font-bold text-4xl text-center"
                    style={{ fontSize: wp(6), height: hp(10) }}
                >
                    Welcome to the Future of {'\n'} AI!
                </Text>
                <View className=" mt-14 flex bg-slate-750 mix-blend-hard-light">
                    <Image source={colorScheme === 'dark' ? require('../../assets/images/arc.gif') : require("../../assets/images/arc2.gif")}
                        style={{ width: wp(65), height: wp(65) }}
                        className="mx-auto"
                    />
                </View>
                <View className="py-4 flex mt-14 flex-col justify-between">
                    <TouchableOpacity
                        onPress={() => [navigation.navigate('Register'), select_beep()]}
                        className="py-3 bg-blue-400 w-80 mx-auto rounded-xl "
                        style={{ width: wp(75) }}
                    >
                        <Text
                            className="text-base font-mono justify-center font-bold text-center text-gray-700"
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center top-7">
                        <Text className="text-slate-900 dark:text-slate-200 font-mono">Already have an account?</Text>
                        <TouchableOpacity onPress={() => [navigation.navigate('Login'), select_beep()]}>
                            <Text className="font-semibold font-mono text-blue-500"> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <AppExit exit={exit} setExit={setExit} />
        </SafeAreaView>
        // </ImageBackground>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});