import React, {useEffect} from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Voice from '@react-native-voice/voice';
import {useUser} from '../context/userContext';
import { assistantSpeech } from '../constants/TextToSpeech';

const MultiInput = ({
  loading,
  base64String,
  messages,
  param,
  setText,
  fetchResponse,
  text,
  clear,
  setOpenImagePickerModal,
  recording,
  setRecording,
}) => {
  const {permission} = useUser();

  const onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
  };

  const onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
  };

  const onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    setText(e.value[0]);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    const status = await permission();
    if(!status){
      assistantSpeech('Please enable Audio Permission from the settings or restart the app to proceed!');
      ToastAndroid.show('Audio Permission Denied!', ToastAndroid.SHORT);
      return;
    }
    setRecording(true);
    try {
      setText('');
      await Voice.start('en-US');
    } catch (error) {
      console.log('Error in recording', error);
      ToastAndroid.show(
        'Failed to start recording. Please try again.',
        ToastAndroid.SHORT,
      );
      setRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      setText('');
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    } catch (error) {
      console.log('Error stopping recording', error);
      ToastAndroid.show(
        'Failed to stop recording. Please try again.',
        ToastAndroid.SHORT,
      );
      setRecording(false);
    }
  };

  return (
    <View className="flex bg-slate-950 justify-center ">
      {loading ? (
        <Image
          source={require('../../assets/images/loading2.gif')}
          style={{width: hp(10), height: hp(10)}}
          className="m-2"
        />
      ) : (
        <KeyboardAvoidingView style={{padding: 10}}>
          {base64String && (
            <>
              <Image
                source={{
                  uri: `data:image/png;base64,${base64String}`,
                }}
                style={{width: hp(10), height: hp(10)}}
                resizeMode="contain"
                className="m- rounded-2xl opacity-70"
              />
              <Image
                source={require('../../assets/images/uploading1.gif')}
                style={{width: hp(10), height: hp(10)}}
                className=" rounded-2xl absolute self-start ml-0 left-3 top-2"
              />
            </>
          )}
          <View className="flex flex-row justify-center p-2 pb-8">
            {messages.length > 0 && (
              <TouchableOpacity
                className={`p-1 pl-0 mt-2 ml-0 rounded-md mb-0 ${recording ? 'absolute self-center left-0' : 'self-start '}`}
                onPress={clear}>
                <Image
                  source={require('../../assets/images/clear2.png')}
                  className="h-7 w-7 ml-0"
                />
              </TouchableOpacity>
            )}
            {!recording ? (
              <>
                <View
                  style={{width: wp(75)}}
                  // className='flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-gray-700 dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs'
                  className="flex flex-col justify-center">
                  <TextInput
                    className="m-0 border-slate-500 border-opacity-5 border-solid border rounded-xl bg-slate-800 p-3 text-white"
                    onChangeText={setText}
                    placeholder="Send a message"
                    multiline={true}
                    numberOfLines={1}
                    style={{color: 'white'}}
                  />
                  <View className="flex flex-row self-end absolute">
                    {(param.selectedModel.name == 'Vision' ||
                      param.selectedModel.name == 'GenAI') && (
                      <TouchableOpacity
                        className=" p-2 my-auto rounded-md"
                        onPress={() => setOpenImagePickerModal(true)}>
                        <Image
                          source={require('../../assets/images/addImg.png')}
                          className="h-6 w-6"
                        />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      className=" p-2 my-auto rounded-md"
                      onPress={fetchResponse}
                      disabled={!text.trim()}>
                      <Image
                        source={require('../../assets/images/send-2.png')}
                        className="h-6 w-6"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    className=" pl-2 py-2 my-auto rounded-md"
                    onPress={startRecording}>
                    <Image
                      source={
                        !recording
                          ? require('../../assets/images/mic.png')
                          : require('../../assets/images/rec.gif')
                      }
                      className="h-7 w-7"
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <TouchableOpacity
                className=" pl-2 bottom-0 my-auto rounded-md"
                onPress={stopRecording}>
                <Image
                  source={
                    !recording
                      ? require('../../assets/images/mic.png')
                      : require('../../assets/images/rec.gif')
                  }
                  className="h-24 w-24"
                />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default MultiInput;
