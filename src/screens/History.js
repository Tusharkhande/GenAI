import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
  RefreshControl,
} from 'react-native';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {getDownloadURL, ref} from 'firebase/storage';
import {db, storage} from '../firebase/firebase.config';
import Button from '../components/Button';
import {auth} from '../firebase/firebase.config';
import {select_beep} from '../constants/Sounds';
import {useNavigation} from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import Card from '../components/Card';
import HorizontalLine from '../components/HorizontalLine';

const History = () => {
  const navigation = useNavigation();

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
    <View className="flex bg-slate-950 w-full h-full">
      <View className='flex'>
        <View className="flex absolute flex-row self-start p-3">
          <Button
            image={require('../../assets/images/back.png')}
            onPress={handleBackPress}
          />
        </View>
        <View className="flex flex-row flex-wrap justify-center p-2 mt-2">
          <Text
            className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-50`}>
            History
          </Text>
        </View>
      </View>
      <View className="p-5 w-full h-3/4 flex flex-col justify-center">
        <View className=" p-5 self-center items-center">
          <Card
            imageSource={require('../../assets/images/phoenix.jpeg')}
            text={'Images...'}
            color={'#ffd'}
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
    </View>
  );
};

export default History;
