import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Button from './Button';

const ManageAcc = ({ signOut, setDelModalVisible }) => {
    return (
    <View className='flex justify-start bg-slate-950 self-start'>
        <TouchableOpacity className='flex flex-row gap-0 w-80 bg-slate-900 m-2 p-2' onPress={signOut}>
            <Image source={require('../../assets/images/logout.png')} className='self-center w-5 h-5' />
            <Text className='self-center' >Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity className='flex flex-row gap-0 bg-slate-900 m-2 p-2' onPress={() => setDelModalVisible(true)}>
            <Image source={require('../../assets/images/delete.png')} className='self-center w-5 h-5' />
            <Text className='self-center'>Delete Account</Text>
        </TouchableOpacity>
    </View>
    )
}

export default ManageAcc;