import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { select_beep } from '../constants/Sounds';

const ManageAcc = ({ signOut, setDelModalVisible, guser }) => {
    return (
    <View className='flex justify-start bg-slate-950 w-80 self-start'>
        <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={signOut}>
            <Image source={require('../../assets/images/logout.png')} className='self-center w-5 h-5' />
            <Text className='self-center' >Logout</Text>
        </TouchableOpacity>

        {guser==null && <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={() => [setDelModalVisible(true), select_beep()]}>
            <Image source={require('../../assets/images/delete.png')} className='self-center w-5 h-5' />
            <Text className='self-center'>Delete Account</Text>
        </TouchableOpacity>}
    </View>
    )
}

export default ManageAcc;