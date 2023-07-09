import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-black">
      <View className="flex flex-col items-center space-y-2">
        <Text style={{ fontSize: wp(10) }} className="font-bold text-center text-white">
          GenAI
        </Text>
        <Text style={{ fontSize: wp(5) }} className="text-center text-white tracking-wider font-semibold">
          A Meeting with the Future
        </Text>
      </View>
      <View className="flex items-center justify-center">
        <Image
          source={require('../../assets/images/bot3.png')}
          style={{ height: wp(75), width: wp(75) }}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="bg-blue-500 mx-10 rounded-3xl p-4"
      >
        <Text className="text-white text-center font-bold text-lg">Initialize</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
