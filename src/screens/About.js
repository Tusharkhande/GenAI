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
        <View className="flex absolute flex-row self-end m-0">
          <Button
            image={require('../../assets/images/close.png')}
            onPress={() => [navigation.goBack(), select_beep()]}
          />
        </View>
      <ScrollView className="space-y-4 mt-8" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-center mt-6 ">
          <Image
            source={require('../../assets/images/bot4.png')}
            style={{width: wp(20), height: wp(20)}}
          />
        </View>
        <Text className="text-xl text-center m-5">About GenAI</Text>
        <Text className="text-justify text-sm p-10 pb-3">
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
        <View className="justify-end mb-0 self-center p-10">
          <Text>© 2023 @TK Solutions</Text>
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
    backgroundColor: '#ffffff', // Adjust the background color as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333', // Adjust the text color as needed
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666', // Adjust the text color as needed
  },
});

export default About;
