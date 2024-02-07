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
  KeyboardAvoidingView,
    Modal,
    ToastAndroid,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {assistantSpeech} from '../constants/TextToSpeech';
import {select_beep} from '../constants/Sounds';
import {Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../components/Button';
import Clipboard from '@react-native-clipboard/clipboard';
import gemini from '../api/gemini';

const GenerateByPromptNative = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');
  const navigation = useNavigation();
  const param = useRoute().params;
  const [selectedOption, setSelectedOption] = useState('');
  const scrollViewRef = useRef();

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 200);
  };
  console.log(message);

  const onOptionSelect = option => {
    setSelectedOption(option);
    console.log('Selected option:', option);
  };

  const copyToClipboard = () => {
    Clipboard.setString(message);
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
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

  useEffect(() => {
    if (message) {
      // Check if the message is not empty
      const words = message.split(' '); // Split message into words
      setDisplayedMessage(''); // Clear previous displayed message
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < words.length) {
          setDisplayedMessage(prev => `${prev}${words[index]} `);
          index++;
          updateScrollView();
        } else {
          clearInterval(intervalId); // Stop the interval when all words have been displayed
        }
      }, 150); // Adjust this value to control the speed of the "typing"

      return () => clearInterval(intervalId); // Cleanup interval on component unmount or message change
    }
  }, [message]); // Effect runs whenever `message` changes

  const initiate = () => {
    
    let p='';
    if(param.writingModel.options.length > 0) {
        p=param.writingModel.p1 + selectedOption + param.writingModel.p2 + prompt;
    } else if(param.writingModel.id == 2 ) {
        p=param.writingModel.p1 + prompt + param.writingModel.p2;
    }else{
        p=param.writingModel.p1 + prompt;
    }
    console.log(param.writingModel.p1 + selectedOption + param.writingModel.p2 + prompt)
    gemini(
        p,
        setLoading,
        setMessage
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

              <KeyboardAvoidingView>
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
          </KeyboardAvoidingView>
          {message.length > 0 && (
            <View className=" p-5 mt-5">
              <View className="mr-1 self-end">
                {/* <TouchableOpacity onPress={copyToClipboard}>
                  <Text style={{color: 'white'}}>Copy</Text>
                </TouchableOpacity> */}
                <Button
                    image={require('../../assets/images/copy.png')}
                    title={'Copy'}
                    onPress={copyToClipboard}
                />
              </View>
              <Text className="text-neutral-100">{displayedMessage}</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal visible={loading} animationType="fade" transparent>
        <View className="flex flex-1 items-center bg-transparent w-full">
          <View
            style={{width: wp(100)}}
            className="flex flex-1  flex-col bg-slate-500 opacity-50 w-auto justify-center">
            <Image
              source={require('../../assets/images/loading2.gif')}
              style={{width: hp(10), height: hp(10)}}
              className="mx-auto"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GenerateByPromptNative;
