import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {select_beep} from '../constants/Sounds';
import Markdown from 'react-native-markdown-display';

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
  \nOur mission is to provide an innovative and engaging AI-powered platform that constantly evolves. GenAI is committed to regular updates and improvements, aiming to deliver state-of-the-art AI functionalities and an unmatched user experience.`
  const navigation = useNavigation();
  return (
    <View className="flex bg-slate-950 flex-1 justify-normal ">
      <View className="flex absolute flex-row self-start p-3 pt-2">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={() => [navigation.goBack(), select_beep()]}
        />
      </View>
      <ScrollView
        className="space-y-4 mt-8"
        showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-center mt-6">
          <Image
            source={require('../../assets/images/ai2.png')}
            style={{width: wp(20), height: wp(20)}}
            className=" rounded-full"
          />
        </View>
        <Text className="text-base text-slate-400 text-center m-5 mb-0">
          About GenAI
        </Text>
        <View className="text-justify text-slate-400 text-sm p-10 pt-2 pb-3">
          <Markdown style={markdownStyles}>
            {text}
          </Markdown>
        </View>
        <View className="justify-end mb-0 self-center p-10 pt-2">
          <Text className="text-slate-400 text-xs">© 2023 @ktushar</Text>
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

const markdownStyles = StyleSheet.create({
  body: {
    color: '#999999',
    fontSize: wp(3.1),
    marginTop: 0,
  },
});


export default About;
