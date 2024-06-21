import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
} from 'react-native';
import Button from '../components/Button';
import {select_beep} from '../constants/Sounds';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/Card';
import HorizontalLine from '../components/HorizontalLine';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/userContext';

const History = () => {
  const navigation = useNavigation();
  const {colorScheme} = useUser();
  const handleBackPress = () => {
    select_beep();
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <SafeAreaView className="flex bg-slate-100 dark:bg-slate-950 w-full h-full">
      <View className='flex'>
        <View className="flex absolute flex-row self-start p-3">
          <Button
            image={require('../../assets/images/back.png')}
            onPress={handleBackPress}
            colorScheme={colorScheme}
          />
        </View>
        <View className="flex flex-row flex-wrap justify-center p-2 mt-2">
          <Text
            className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-900 dark:text-slate-200`}>
            History
          </Text>
        </View>
      </View>
      <View className="p-5 w-full h-3/4 flex flex-col justify-center">
        <View className=" p-5 self-center items-center">
          <Card
            imageSource={require('../../assets/images/imageModels/mystic.jpg')}
            text={'Images...'}
            color={'#fff'}
            textStyle={'self-center bottom-2'}
            onPress={() => [navigation.navigate('ImageGenHistory')]}
          />
        </View>
        <HorizontalLine/>
        <View className="flex p-5 self-center justify-center items-center">
          <Card
            imageSource={require('../../assets/images/chatcat.jpeg')}
            text={'Chats...'}
            color={'#fff'}
            textStyle={'self-center bottom-2'}
            onPress={() => [navigation.navigate('ChatHistory')]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default History;
