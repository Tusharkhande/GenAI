import React, { useEffect } from 'react';
import { View, Text, Linking, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import { select_beep } from '../constants/Sounds';

const Info = ({navigation}) => {

    return (
        <View className='flex justify-center bg-slate-950 w-80 self-end'>
            <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 w-80 m-2 ml-0 mr-0 p-2' onPress={() => navigation.navigate('About')}>
                <Image source={require('../../assets/images/about.png')} className='self-center w-5 h-5 mr-1' />
                <Text className='self-center' >About</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={() => navigation.navigate('Documentation')}>
                <Image source={require('../../assets/images/documentation.png')} className='self-center w-5 h-5 mr-1' />
                <Text className='self-center'>Documentation</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Info;