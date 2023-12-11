import { View, Text, Image, TouchableOpacity, ImageBackground, BackHandler, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { select_beep } from '../constants/Sounds'
// import EncryptedStorage from 'react-native-encrypted-storage';
import { stop } from '../constants/TextToSpeech'
// import { auth } from '../firebase/firebase.config';
import useAuth from '../firebase/useAuth'

export default function GetStarted() {
    const navigation = useNavigation();
    const [exit, setExit] = useState(false);
    const handleBackPress = () => {
        setExit(true);
        return true; // Return true to prevent the default back button behavior
    };

    // const user = auth.currentUser;
    const { user } = useAuth();

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         const token = await EncryptedStorage.getItem('user_session');
    //         console.log('User', token);
    //         if (token) {
    //             navigation.navigate('Welcome');
    //         }
    //     }
    //     // checkLoginStatus();
    // }, []);

    const handleModal = () => {
        setExit(false);
        select_beep();
        BackHandler.exitApp();
    };

    // useEffect(() => {
    //     assistantSpeech(`{Initializing startup sequence. Loading Custom Components. Fetching user data.}`);
    //     setTimeout(() => {
    //         if (user != '') {
    //             assistantSpeech("Logged in Successfully!");
    //         } else {
    //             assistantSpeech(" No user data found. Kindly create a new account or log in.");
    //         }
    //     }, 6000);

    // }, []);

    return (
        // <ImageBackground
        //     source={require("../../assets/images/bg6.gif")}
        //     style={{ flex: 1 }}
        // >
        <SafeAreaView className="flex-1 bg-black" >
            <View className="flex-1 flex justify-center my-4">
                <Text
                    className="text-white font-mono font-bold text-4xl text-center"
                    style={{ fontSize: wp(6), height: hp(10) }}
                >
                    Welcome to the Future of {'\n'} AI!
                </Text>
                <View className=" mt-14 flex bg-slate-750 mix-blend-hard-light">
                    <Image source={require("../../assets/images/arc.gif")}
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
                            className="text-xl font-mono justify-center font-bold text-center text-gray-700"
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center top-7">
                        <Text className="text-white font-semibold">Already have an account?</Text>
                        <TouchableOpacity onPress={() => [navigation.navigate('Login'), select_beep()]}>
                            <Text className="font-semibold font-mono text-blue-400"> Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal visible={exit} animationType="fade" transparent>
                <View className='flex flex-1 items-center justify-center self-center w-full' style={styles.modalContainer}>
                    <View style={{ width: wp(80), height: wp(40) }}
                        className="flex flex-col bg-slate-800 p-5 w-96 justify-center rounded-3xl">
                        <Text className="font-mono text-xl text-center mb-5 mt-0">Are you sure you want to Exit?</Text>
                        <View className='flex flex-row justify-center self-center gap-8'>
                            <View style={{ width: wp(20) }}
                                className="bg-slate-500 rounded-2xl flex justify-center text-center">
                                <Button title="Yes" onPress={() => handleModal()} />
                            </View>
                            <View style={{ width: wp(20) }}
                                className="bg-slate-500 rounded-2xl flex justify-center text-center">
                                <Button title="No" onPress={() => [setExit(false), select_beep()]} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        // </ImageBackground>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#3B96D2',
        width: '60%',
        padding: 16,
        borderRadius: 8,
        textAlign: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    modalTitle: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // alignSelf:'center',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#003249',
        width: 80,
        borderRadius: 8,
        marginLeft: 20,
        marginRight: 20,
    },
    buttonContainer1: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer2: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#003249',
        width: 200,
        borderRadius: 20,
        paddingTop: 11,
        marginLeft: 20,
        marginRight: 20,
    },

});