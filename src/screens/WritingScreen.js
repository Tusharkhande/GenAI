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
import Markdown from 'react-native-markdown-display';
import TypeWriterEffect from 'react-native-typewriter-effect';
import Options from '../components/Options';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/userContext';

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
  const {colorScheme} = useUser();

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 200);
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
    Tts.stop();
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

  useEffect(() => {
    if (param.writingModel.models && param.writingModel.models.length > 0) {
      setSelectedModel(param.writingModel.models[0]);
    }
    if (param.writingModel.options) {
      setSelectedOption(param.writingModel.options[0]);
    }
  }, [param.writingModel.models]);

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

  const markdownStyles = StyleSheet.create({
    body: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
      backgroundColor: colorScheme === 'dark' ? '#rgb(2 6 23)' : 'rgb(248 250 252)',
    },
    fence: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
      fontSize: 10,
      backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
      overflow: 'hidden',
      padding: 10,
      borderRadius: 5,
    },
    code_block: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
      fontSize: 10,
      backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
      overflow: 'hidden',
      padding: 10,
      borderRadius: 5,
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950 justify-normal">
      <View className="flex flex-row self-start p-3">
          <Button
            image={require('../../assets/images/back.png')}
            onPress={handleBackPress}
            colorScheme={colorScheme}
          />
      </View>
      <ScrollView
        ref={scrollViewRef}
        // bounces={false}
        className="space-y-4"
        showsVerticalScrollIndicator={false}>
        <View
          className={`flex mt-1 self-start px-5`}>
          <Text className="font-semibold text-left font-mono mt-1 text-xl text-slate-950 dark:text-slate-50">
            {param.writingModel.name}
          </Text>
          <Text className="font-semibold text-left font-mono mt-1 text-sm text-slate-950 dark:text-slate-200">
            {/* Design futuristic, edgy avatars in the Cyberpunk Genre */}
            {param.writingModel.desc}
          </Text>
        </View>
        <View className="">
          {param.writingModel.options && (
            <Options
              optionsLength={param.writingModel.options.length}
              optionsDesc={param.writingModel.optionsDesc}
              options={param.writingModel.options}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          )}
          <View
            className={`flex flex-col mb-4 self-start ${
              param.writingModel.options.length > 0
                ? 'p-5 pt-2 pb-0'
                : 'p-5 pt-0'
            }`}>
            <Text className="font-semibold text-left font-mono mt-1 mb-1 text-sm text-slate-800 dark:text-slate-200">
              {param.writingModel.textInputDesc}
            </Text>
            <TextInput
              className="h-24 rounded-xl border-solid border-2 border-indigo-800"
              onChangeText={setPrompt}
              placeholder={param.writingModel.demo}
              placeholderTextColor={colorScheme=='dark' ? 'rgb(229 231 235)' : 'rgb(107 114 128)'}
              multiline={true}
              // numberOfLines={3}
              style={{color: colorScheme=='dark' ? 'white' : 'black' , textAlignVertical: 'top', width: wp(90)}}
            /> 
          </View>

          <TouchableOpacity
            onPress={initiate}
            disabled={isLoading || !prompt}
            aria-disabled={isLoading || !prompt}
            className={`flex-row mt-0 mx-24 rounded-3xl p-2 ${
              isLoading || !prompt ? 'bg-slate-600' : 'bg-indigo-800'
            } justify-center`}>
            <Image
              source={require('../../assets/images/send-2.png')}
              className="h-6 w-6 mr-1"
            />
            <Text className="text-center font-bold text-base ml-1 text-slate-50 ${isLoading || !prompt ? 'bg-slate-600' : 'bg-indigo-800'} justify-center ">
              Generate
            </Text>
          </TouchableOpacity>
          {message.length > 0 && (
            <View className=" p-5 mt-5">
              <View className="mr-1 flex-row self-end">
                {isSpeaking ? (
                  <Button
                    image={require('../../assets/images/speaking.gif')}
                    onPress={() => [Tts.stop(), setIsSpeaking(false)]}
                  />
                ) : (
                  <Button
                    image={require('../../assets/images/sound.png')}
                    onPress={() => speakCurrResponse(message)}
                  />
                )}
                <Button
                  image={require('../../assets/images/speed.png')}
                  onPress={() => [setFinishedTyping(true), updateScrollView()]}
                />
                <Button
                  image={require('../../assets/images/copy2.png')}
                  isize={'h-6 w-6'}
                  onPress={copyToClipboard}
                />
              </View>
              {!finishedTyping ? (
                <TypeWriterEffect
                  content={message}
                  vibration={false}
                  onTypingEnd={() => [setFinishedTyping(true), updateScrollView()]}
                  mindelay={-20}
                  maxdelay={-1}
                  style={colorScheme === 'dark' ? {color: '#fff'} : {color: '#000'}}
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
    </SafeAreaView>
  );
};



export default WritingScreen;
