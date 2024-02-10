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
  Modal,
  ToastAndroid,
  StyleSheet,
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
import Tts from 'react-native-tts';
// import Markdown from 'markdown-to-jsx';
// import MarkdownRenderer from 'react-native-markdown-renderer';
import Markdown from 'react-native-markdown-display';

import TypeWriterEffect from 'react-native-typewriter-effect';

const WritingScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
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

  const copyToClipboard = () => {
    Clipboard.setString(message);
    clearInterval();
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
  };

  const speakCurrResponse = msg => {
    setIsSpeaking(true);
    assistantSpeech(msg);
  };

  const handleBackPress = () => {
    select_beep();
    setIsLoading(false);
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  useEffect(() => {
    Tts.addEventListener('tts-finish', event => [
      console.log('finish', event),
      setIsSpeaking(false),
    ]);
  }, []);

  const initiate = async () => {
    setMessage('');
    let p = '';
    if (param.writingModel.options.length > 0) {
      p =
        param.writingModel.p1 + selectedOption + param.writingModel.p2 + prompt;
    } else if (param.writingModel.id == 2) {
      p = param.writingModel.p1 + prompt + param.writingModel.p2;
    } else {
      p = param.writingModel.p1 + prompt;
    }
    console.log(
      param.writingModel.p1 + selectedOption + param.writingModel.p2 + prompt,
    );
    try {
      setIsLoading(true);
      setFinishedTyping(false);
      const message = await gemini(p);
      if (message) {
        console.log(message);
        setMessage(message);
        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
      // setIsLoading(false);
      ToastAndroid.show(
        'Some Error occured please try later',
        ToastAndroid.SHORT,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    code_block: {
      backgroundColor: 'transparent',
      color: 'white',
    },
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
        // bounces={false}
        className="space-y-4"
        showsVerticalScrollIndicator={false}>
        <View className="flex mt-1 self-start p-5 pb-0">
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
            disabled={isLoading || !prompt}
            aria-disabled={isLoading || !prompt}
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
            <View className=" p-5 mt-5">
              <View className="mr-1 flex-row self-end">
                {isSpeaking ? (
                  <Button
                    image={require('../../assets/images/speaking.gif')}
                    // title={'Copy'}
                    onPress={() => Tts.stop()}
                  />
                ) : (
                  <Button
                    image={require('../../assets/images/sound.png')}
                    // title={'Copy'}
                    onPress={() => speakCurrResponse(message)}
                  />
                )}
                <Button
                  image={require('../../assets/images/speed.png')}
                  // title={'Copy'}
                  onPress={() => setFinishedTyping(true)}
                />
                <Button
                  image={require('../../assets/images/copy.png')}
                  // title={'Copy'}
                  onPress={copyToClipboard}
                />
              </View>
              {!finishedTyping ? (
                <TypeWriterEffect
                  content={message}
                  vibration={false}
                  onTypingEnd={() => setFinishedTyping(true)}
                  mindelay={-20}
                  maxdelay={-1}
                />
              ) : (
                // <MarkdownRenderer>{}</MarkdownRenderer>
                <Markdown style={markdownStyles}>{message}</Markdown>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <Modal visible={isLoading} animationType="fade" transparent>
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

const markdownStyles = StyleSheet.create({
  body: {
    color: '#fff',
    backgroundColor: '#rgb(2 6 23)',
  },
  fence: {
    color: '#fff',
    fontSize: 10,
    backgroundColor: '#000',
    overflow: 'hidden',
    padding: 10,
    borderRadius: 5,
  },
});

export default WritingScreen;