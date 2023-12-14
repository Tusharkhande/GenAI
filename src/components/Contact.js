import React, { useEffect } from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import { select_beep } from '../constants/Sounds';

const Contact = () => {

    // const handleBackButton = () => {
    //     setContact(false);
    //     return true;
    // };

    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    //     };
    // }, []);

    const handleMailButtonPress = () => {
        select_beep();
        Linking.openURL('mailto:khandetushar2001@gmail.com');
    };

    const handleWhatsAppButtonPress = () => {
        select_beep();
        Linking.openURL('https://wa.me/919322392593'); // Replace with the actual WhatsApp number
    };

    const handleWebsiteButtonPress = () => {
        select_beep();
        Linking.openURL('https://www.google.com/'); // Replace with the actual website URL
    };

    return (
        <View className='flex justify-center bg-slate-950 w-80 self-center'>
            <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 m-2 p-2' onPress={handleMailButtonPress}>
                <Image source={require('../../assets/images/mail.png')} className='self-center w-5 h-5' />
                <Text className='self-center' >Mail</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 m-2 p-2' onPress={handleWhatsAppButtonPress}>
                <Image source={require('../../assets/images/whatsapp.png')} className='self-center w-5 h-5' />
                <Text className='self-center'>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 m-2 p-2' onPress={handleWebsiteButtonPress}>
                <Image source={require('../../assets/images/web.png')} className='self-center w-5 h-5' />
                <Text className='self-center' >Website</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: -350,
        marginLeft: 20,
        marginBottom: 50,
        width: '100%',
        backgroundColor: '#007EA7',
        zIndex: -1,
    },
    button: {
        flexDirection: 'row',
        // alignItems: 'center',
        backgroundColor: '#007EA7',
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonImage: {
        width: 24,
        height: 24,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'normal',
        margin: 10,
    },
});

export default Contact;
