import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TextInput,
  BackHandler,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import {assistantSpeech} from '../constants/TextToSpeech';
import {select_beep} from '../constants/Sounds';
import {Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../components/Button';
import {downloadBase64Image} from '../constants/DownloadImage';

const GenerateByPromptNative = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const param = useRoute().params;
  const [selectedOption, setSelectedOption] = useState('');
  const scrollViewRef = useRef();

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 200);
  };

  const onOptionSelect = option => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };
  console.log(param);

  const handleBackPress = () => {
    select_beep();
    navigation.goBack(); // works best when the goBack is async
    return true; // Return true to prevent the default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const API_KEY = '';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  const apicall = async prompt => {
    try {
      const data = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      axios
        .post(endpoint, data, {headers})
        .then(response => {
          console.log(
            'Response from the API: ',
            response.data.candidates[0].content.parts[0].text,
          );
          setMessage(response.data.candidates[0].content.parts[0].text);
        })
        .catch(error => {
          console.error('Error calling the API: ', error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const initiate = () => {
    // let para = '';
    // if (param.imageModel.name === 'Cyberpunk Avatars') {
    //   // para = `Create an avatar of a ${prompt} and a futuristic costume with a cyberpunk city in the background`;
    //   para = `Candid portrait of  ${prompt} in the year 2330, cyberpunk, neon lighting, 35mm f/2.8`;
    // } else if (param.imageModel.name === 'Pop Art') {
    //   para = `Create an Andy Warhol style illustration of ${prompt}`;
    // } else if (param.imageModel.name === 'Anime Avatars') {
    //   para = `Create an image of a digital anime avatar. The avatar should feature a ${prompt}`;
    // } else if (param.imageModel.name === '3D Toy Art') {
    //   para = `Generate a cute and childlike 3D ${prompt}, incorporating elements of fantasy, adventure or romantic. digital art. high resolution. smooth and curved lines. bright and saturated colors.`;
    // } else if (param.imageModel.name === 'Time Travel') {
    //   para = `Create a picture of  ${prompt}. Time travel to Ancient Rome. High resolution. 4K.`;
    // } else if (param.imageModel.name === 'Miniature paintings') {
    //   para = `Create a photo of ${prompt} in the style of miniature photography.`;
    // } else if (param.imageModel.name === 'Pet under fisheye lens') {
    //   para = `Generate a photo of ${prompt}. Use the Sigma fisheye lens, f/3.5.`;
    // } else if (param.imageModel.name === 'Modern Architectural Design') {
    //   para = `Generate an architectural design of  ${prompt}, using the modern style. The result is a photorealistic rendering.`;
    // } else {
    //   para = `${prompt}`;
    // }
    // const para = `${param.imageModel.p1} ${prompt} ${param.imageModel.p2}`;
    // const para = `Create a detailed and visually rich avatar of a ${prompt} set in a futuristic cyberpunk world. This character embodies the essence of cyberpunk aesthetics. The avatar should have look showcasing advanced technology embedded in their attire. u may add holographic accessories.Background: night, sprawling cityscape filled with towering skyscrapers, flying vehicles, and bustling streets`;
    // console.log(para);
    // generateImage(para);
    apicall(
      'Please act as a rewriting expert in different tones. Your role is to rewrite my content into the specific tone I have chosen. Remember to maintain the original meaning. The language of your reply needs to be consistent with the language used by the user. Now, let’s start. Please rewrite the content into the formal tone. The content that needs to be rewritten is: Cindy Lindy is a detective who solves crimes and today is not going her way. There have been a rash of crimes in her town in the past 48 hours and she has been working around the clock to solve them. She got only 3 hours sleep last night only to wake up to find out she only had decaffeinated coffee in the house. Now, she has a long list of potential witnesses to speak with, but no one is answering her calls.',
    );
  };

  return (
    <View className="flex-1 bg-slate-950 justify-normal">
      <View className="flex flex-row self-end m-0">
        <View className="">
          <Button
            image={require('../../assets/images/close.png')}
            onPress={handleBackPress}
          />
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        className="space-y-4"
        showsVerticalScrollIndicator={false}>
        <View className="flex mt-1 self-start p-5">
          <Text className="font-semibold text-left font-mono mt-1 text-xl text-slate-50">
            {param.writingModel.name}
          </Text>
          <Text className="font-semibold text-left font-mono mt-1 text-sm text-slate-200">
            {/* Design futuristic, edgy avatars in the Cyberpunk Genre */}
            {param.writingModel.desc}
          </Text>
        </View>
        <View className="">
          {param.writingModel.options && (
            <View
              className={`flex flex-col  self-start ${
                param.writingModel.options.length > 0 ? 'p-5' : 'p-0'
              } `}>
              <Text className="font-semibold text-left font-mono mt-1 mb-1 text-sm text-slate-200">
                {/* Design futuristic, edgy avatars in the Cyberpunk Genre */}
                {param.writingModel.optionsDesc}
              </Text>
              <View className="flex flex-row flex-wrap">
                {param.writingModel.options.map((option, index) => (
                  <TouchableHighlight
                    key={index}
                    onPress={() => onOptionSelect(option)}
                    //   underlayColor="#DDDDDD"
                    className={`m-2 p-2 rounded-xl ${
                      selectedOption === option
                        ? 'bg-indigo-800'
                        : 'bg-slate-700'
                    }`}>
                    <Text
                      className={`text-center ${
                        selectedOption === option
                          ? 'text-slate-50'
                          : 'text-slate-50'
                      }`}>
                      {option}
                    </Text>
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          )}
          <View className="flex flex-col mb-4 self-start p-5 pt-0">
            <Text className="font-semibold text-left font-mono mt-1 mb-1 text-sm text-slate-200">
              {param.writingModel.textInputDesc}
            </Text>
            <TextInput
              className="h-24 rounded-xl border-solid border-2 border-indigo-800"
              onChangeText={setPrompt}
              placeholder={param.writingModel.demo}
              // placeholder={'Enter'}
              multiline={true}
              // numberOfLines={3}
              style={{color: 'white', textAlignVertical: 'top', width: wp(90)}}
            />
          </View>

          <TouchableOpacity
            onPress={initiate}
            disabled={loading || !prompt}
            className="flex-row mt-0 mx-24 rounded-3xl p-2 justify-center bg-indigo-800">
            <Image
              source={require('../../assets/images/send-2.png')}
              className="h-6 w-6 mr-1"
            />
            <Text className="text-center font-bold text-base ml-1 text-slate-50">
              Generate
            </Text>
          </TouchableOpacity>

          {message.length > 0 && (
            <View className="p-5">
              <View
                style={{height: hp(40)}}
                className="bg-gray-300 rounded-3xl p-4">
                {/* <ScrollView
                ref={scrollViewRef}
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}> */}
                <View
                  style={[{width: wp(90)}]}
                  className="bg-blue-300 p-2 rounded-xl rounded-tl-none">
                  <Text className="text-neutral-800">{message.content}</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default GenerateByPromptNative;
