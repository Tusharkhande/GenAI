import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { select_beep } from '../constants/Sounds';

const ManageAcc = ({ signOut, setDelModalVisible, guser, theme, colorScheme }) => {
    return (
    <View className='flex justify-start bg-slate-50 dark:bg-slate-950 w-80 self-start'>
        <TouchableOpacity className='flex flex-row gap-0 rounded-md bg-slate-200 dark:bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={signOut}>
            <Image style={colorScheme=='light' ? theme.light : theme.dark} source={require('../../assets/images/logout.png')} className='self-center w-5 h-5 mr-1' />
            <Text className='self-center text-slate-900 dark:text-slate-200' >Logout</Text>
        </TouchableOpacity>

        {!guser && <TouchableOpacity className='flex flex-row gap-0 rounded-md bg-slate-200 dark:bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={() => [setDelModalVisible(true), select_beep()]}>
            <Image source={require('../../assets/images/delete.png')} className='self-center w-5 h-5 mr-1' />
            <Text className='self-center text-slate-900 dark:text-slate-200'>Delete Account</Text>
        </TouchableOpacity>}
    </View>
    )
}


export default ManageAcc;