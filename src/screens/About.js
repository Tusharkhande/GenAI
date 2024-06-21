import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {select_beep} from '../constants/Sounds';
import Markdown from 'react-native-markdown-display';
import { useUser } from '../context/userContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = () => {
  const text = `**GenAI** is a cutting-edge AI assistant that engages users in dynamic conversations and produces captivating AI-generated images and artwork. Utilizing a range of advanced AI models, including:  
  \n+ OpenAI's **GPT-3.5** and **DALL·E 2.0**  
  \n+ Google's **Gemini**  
  \n+ Various open-source models from **Hugging Face**  
  \nGenAI offers a diverse and innovative experience.
  \nThe app features five interactive chat assistants, each designed with unique capabilities that cater to different user needs, including:  
  - **Image generation**  
  - **Text generation**  
  - **Image detection**  
  \nThese modes enhance the versatility of GenAI, making it a comprehensive tool for creative and interactive AI-powered tasks.
  \nTo ensure a seamless and secure user experience, GenAI incorporates **Firebase Authentication and Firestore** for robust data management and user personalization.
  \n **Mission**:
  \n Our mission is to provide an innovative and engaging AI-powered platform that constantly evolves. GenAI is committed to regular updates and improvements, aiming to deliver state-of-the-art AI functionalities and an unmatched user experience.`
  const navigation = useNavigation();
  const {colorScheme} = useUser();
  const markdownStyles = StyleSheet.create({
    body: {
      color: `${colorScheme == 'light' ? '#0F172A' : '#cbd5e1'}`,
      fontSize: wp(3.5),
      marginTop: 0,
    },
  });

  return (
    <SafeAreaView className="flex bg-slate-50 dark:bg-slate-950 flex-1 justify-normal ">
      <View className="flex absolute self-start p-3 pt-2 mt-8">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={() => [navigation.navigate('Dashboard'), select_beep()]}
          colorScheme={colorScheme}
        />
      </View>
      <ScrollView
        className="space-y-4 mt-8"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-center ">
          <Image
            source={require('../../assets/images/ai2.png')}
            style={{width: wp(20), height: wp(20)}}
            className=" rounded-full"
          />
        </View>
        <Text className="text-base text-slate-900 dark:text-slate-200 text-center m-5 mb-0">
          About GenAI
        </Text>
        <View className="text-justify text-sm p-7 pt-2 pb-3">
          <Markdown style={markdownStyles}>
            {text}
          </Markdown>
        </View>
        <View className="justify-end mb-0 self-center p-10 pt-2">
          <Text className=" text-slate-800 dark:text-slate-400 text-xs">© 2023 @ktushar</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
