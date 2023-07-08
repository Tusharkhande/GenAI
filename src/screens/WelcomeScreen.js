import { View, Text, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className='flex-1 flex justify-around bg-white' >
      <View className='space-y-2'>
        <Text style={{fontSize: wp(10)}} className='font-bold text-center text-gray-700'>
            GenAI
        </Text>
        <Text style={{fontSize: wp(5)}} className='text-center text-gray-600 tracking-wider font-semibold'>
            A meet with the Future
        </Text>
        </View>
        <View className='flex-row justify-center'>
            <Image source={require('../../assets/images/welcome.png')} style={{height: wp(75), width:wp(75)}} />
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('Home')} className='bg-blue-500 mx-5 rounded-2xl p-4'>
            <Text className='text-white text-center font-bold'>
                Get Started
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}