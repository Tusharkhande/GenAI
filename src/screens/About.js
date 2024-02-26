import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {select_beep} from '../constants/Sounds';

const About = () => {
  const navigation = useNavigation();
  return (
    <View className="flex bg-slate-950 flex-1 justify-normal ">
        <View className="flex absolute flex-row self-start p-3">
          <Button
            image={require('../../assets/images/back.png')}
            onPress={() => [navigation.goBack(), select_beep()]}
          />
        </View>
      <ScrollView className="space-y-4 mt-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-center mt-6">
          <Image
            source={require('../../assets/images/genAI2.jpeg')}
            style={{width: wp(20), height: wp(20)}}
            className=' rounded-full'
          />
        </View>
        <Text className="text-xl text-slate-400 text-center m-5">About GenAI</Text>
        <Text className="text-justify text-slate-400 text-sm p-10 pt-2 pb-3">
          {'\u2022'} "GenAI" is an innovative AI-powered assistant that engages
          users in interactive conversations and generates captivating AI images
          and artwork using OpenAI's GPT3.5 and DALL·E 2.0.{'\n\n'}• The app
          features three unique modes: Jarvis, Friday, and GenAI, each with its
          own set of capabilities, including content and image generation.{' '}
          {'\n\n'}
          {'\u2022'} We employ Firebase Authentication to enhance user security
          and personalization.{'\n\n'}• Our mission is to provide a seamless and
          creative AI-powered experience for our users.{'\n\n'}• GenAI is
          constantly evolving with updates and improvements to deliver
          cutting-edge AI functionalities.{'\n\n'}
        </Text>
        <View className="justify-end mb-0 self-center p-10 pt-2">
          <Text className='text-slate-400'>© 2023 @ktushar</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', 
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
  },
});

export default About;
