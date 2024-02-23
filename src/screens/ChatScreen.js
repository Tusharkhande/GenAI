import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Modal,
  StyleSheet,
  ImageBackground,
  BackHandler,
  ToastAndroid,
} from 'react-native';

// import Voice from '@react-native-community/voice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {apiCall, chatgptApiCall, dalleApiCall} from '../api/openAi';
import Features from '../components/Features';
import Tts from 'react-native-tts';
import {useRoute} from '@react-navigation/native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {assistantSpeech, startTextToSpeech} from '../constants/TextToSpeech';
import {sweep, select_beep} from '../constants/Sounds';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import Clipboard from '@react-native-clipboard/clipboard';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {downloadImage} from '../constants/DownloadImage';
import {vision} from '../api/gemini';
import {geminiChatApiCall} from '../api/gemini';
import {useUser} from '../context/userContext';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [text, setText] = useState('');
  const [base64String, setBase64String] = useState('');
  const [file, setFile] = useState('');
  const [openImagePickerModal, setOpenImagePickerModal] = useState(false);
  const param = useRoute().params;
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const {gUserAvatar} = useUser;

  useEffect(() => {
    console.log(param.selectedModel.name);
  }, []);

  const handleBackPress = () => {
    navigation.goBack(); // works best when the goBack is async
    Tts.stop();
    return true; // Return true to prevent the default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const clear = () => {
    sweep();
    Tts.stop();
    setLoading(false);
    setMessages([]);
  };

  const fetchResponse = async () => {
    try {
      if (text.trim().length > 0) {
        Tts.stop();
        setLoading(true);
        select_beep();
        let newMessages = [...messages];
        if (param.selectedModel.name != 'Vision') {
          newMessages.push({role: 'user', content: text.trim()});
        } else {
          newMessages.push({
            role: 'user',
            content: text.trim(),
            base64String: base64String,
          });
        }

        setMessages([...newMessages]);

        // scroll to the bottom of the view
        updateScrollView();

        console.log('Before Api Call', text);

        // Make the API call
        {
          if (param.selectedModel.name == 'Jarvis') {
            chatgptApiCall(text, newMessages).then(res => {
              console.log('after API Call');
              setText('');
              setLoading(false);
              if (res.success) {
                setMessages([...res.data]);
                console.log('res: ', res.data);
                updateScrollView();
                startTextToSpeech(res.data[res.data.length - 1]);

                // const lastMessage = res.data[res.data.length - 1];
                // if (lastMessage.content.includes('https')) {
                //   startTextToSpeech({ role: 'assistant', content: "Sure, I'll try to create that!" });
                // } else {
                //   startTextToSpeech(lastMessage);
                // }
              }
            });
          } else if (param.selectedModel.name == 'Friday') {
            dalleApiCall(text, newMessages).then(res => {
              console.log('after API Call');
              setText('');
              setLoading(false);
              if (res.success) {
                setMessages([...res.data]);
                updateScrollView();
                setImageLoading(true);
                // startTextToSpeech(res.data[res.data.length - 1]);

                const lastMessage = res.data[res.data.length - 1];
                if (
                  lastMessage.content.includes('https://oaidalleapiprodscus')
                ) {
                  startTextToSpeech({
                    role: 'assistant',
                    content: "Sure, I'll try to create that!",
                  });
                } else {
                  startTextToSpeech(lastMessage);
                }
              }
            });
          } else if (param.selectedModel.name == 'GenAI') {
            apiCall(text, newMessages).then(res => {
              console.log('after API Call');
              setText('');
              setLoading(false);
              if (res.success) {
                setMessages([...res.data]);
                updateScrollView();
                // startTextToSpeech(res.data[res.data.length - 1]);
                const lastMessage = res.data[res.data.length - 1];
                if (
                  lastMessage.content.includes('https://oaidalleapiprodscus')
                ) {
                  setImageLoading(true);
                  startTextToSpeech({
                    role: 'assistant',
                    content: "Sure, I'll try to create that!",
                  });
                } else {
                  startTextToSpeech(lastMessage);
                }
              }
            });
          } else if (param.selectedModel.name == 'Gemini') {
            const conversationHistory = messages.map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user', // Map 'assistant' to 'model'
              parts: [{text: m.content}],
            }));
            geminiChatApiCall(text, conversationHistory).then(newMessage => {
              setText('');
              setLoading(false);
              if (newMessage) {
                setMessages(prevMessages => [...prevMessages, newMessage]);
              } else {
                newMessage = {
                  role: 'assistant',
                  content:
                    "I'm currently experiencing high demand! Feel free to try again in a few moments.",
                };
                setMessages(prevMessages => [...prevMessages, newMessage]);
              }
              updateScrollView();
              startTextToSpeech(newMessage);
            });
          } else {
            vision(text, base64String).then(res => {
              console.log('after API Call');
              setText('');
              setLoading(false);
              setBase64String('');
              if (res.success) {
                console.log(res.data);
                newMessages.push({role: 'assistant', content: res.data});
                setMessages(newMessages);
                updateScrollView();
                assistantSpeech(res.data);
              }
            });
          }
        }
      } else {
        ToastAndroid.show('Please enter your query!', SHORT);
      }
    } catch (e) {
      // ToastAndroid.show('Something went wrong!', SHORT);
      setLoading(false);
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 200);
  };

  const copyToClipboard = msg => {
    Clipboard.setString(msg);
    clearInterval();
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT);
  };

  const camera = async () => {
    const options = {
      includeBase64: true,
      maxWidth: 512,
      maxHeight: 512,
    };
    const result = await launchCamera(options);
    if (!result.didCancel) {
      setOpenImagePickerModal(false);
      setBase64String(result.assets[0].base64);
    } else {
      ToastAndroid.show('No image clicked!', ToastAndroid.SHORT);
    }
    // vision(base64String)
    // console.log(result.assets[0].base64);
  };
  const gallery = async () => {
    const options = {
      includeBase64: true,
      maxWidth: 512,
      maxHeight: 512,
    };
    const result = await launchImageLibrary(options);
    if (!result.didCancel) {
      setOpenImagePickerModal(false);
      setBase64String(result.assets[0].base64);
    } else {
      ToastAndroid.show('No image selected!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (param.selectedModel.name == 'Jarvis') {
      Tts.setDefaultLanguage('en-GB');
      // Tts.setDefaultRate(0.6);
      Tts.setDefaultPitch(0.5);
      assistantSpeech(
        "Hello Boss, I'm Jarvis. I'm powered by the legacy gpt-3.5-turbo model by open-AI. Please feel free to ask me anything!",
      );
    } else if (param.selectedModel.name == 'Friday') {
      Tts.setDefaultLanguage('en-US');
      // Tts.setDefaultRate(0.6);
      Tts.setDefaultPitch(1.0);
      assistantSpeech(
        "Hello Boss, I'm Friday. I'm powered by the legacy Dall-E 2.0 model by OPEN-A I. Anything you can imagine, I can create!",
      );
    } else if (param.selectedModel.name == 'Gemini') {
      Tts.setDefaultLanguage('en-US');
      // Tts.setDefaultRate(0.6);
      Tts.setDefaultPitch(1.0);
      assistantSpeech(
        "Hello Boss, I'm Gemini. I'm powered by the latest gemini-pro model by Google A- I. Please feel free to ask me anything!",
      );
    } else if (param.selectedModel.name == 'GenAI') {
      Tts.setDefaultLanguage('en-GB');
      // Tts.setDefaultRate(0.6);
      Tts.setDefaultPitch(1.1);
      assistantSpeech(
        `{Hello Boss, I'm gen*. I'm powered by the legacy gpt-3.5-turbo and DALL -E 2.0 models by open-AI. I'm capable of generating content as well as stunning images. Please feel free to ask me anything!}`,
      );
    } else {
      Tts.setDefaultLanguage('en-US');
      // Tts.setDefaultRate(0.6);
      Tts.setDefaultPitch(0.4);
      assistantSpeech(
        `Hello Boss, I'm Vision. I'm powered by the latest gemini-pro-vision model by Google A- I. I'm capable of extracting content from images and describing them in detail. Lets pick an image and get started`,
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View className="flex-1 bg-slate-950">
        {/* <ImageBackground
      source={require("../../assets/images/bg1.jpg")}
      style={{ flex: 1 }}
      > */}
        <SafeAreaView className="flex-1 flex mx-5 pt-3">
          {messages.length == 0 && (
            <View className="flex-row justify-center">
              <Image
                // source={require('../../assets/images/bot1.png')}
                source={
                  param.selectedModel
                    ? param.selectedModel.image
                    : require('../../assets/images/bot3.png')
                }
                style={{height: hp(14), width: hp(14)}}
                className="rounded-full"
              />
            </View>
          )}

          {/* features || message history */}
          {messages.length > 0 ? (
            <View className="space-y-5 flex-1">
              <View className="flex-row justify-between">
                <Text
                  className="text-white font-semibold ml-1"
                  style={{fontSize: wp(5)}}>
                  {param.selectedModel.name}
                </Text>
                <Text
                  className="text-white font-thin mr-1 self-center"
                  style={{fontSize: wp(3)}}>
                  {param.selectedModel.provider}
                </Text>
              </View>

              <View
                style={{height: hp(76)}}
                className="bg-slate-400 rounded-3xl p-4 pl-1 pr-1">
                <ScrollView
                  ref={scrollViewRef}
                  bounces={false}
                  className="space-y-4"
                  showsVerticalScrollIndicator={false}>
                  {messages.map((message, index) => {
                    if (message.role == 'assistant') {
                      if (
                        message.content.includes('https://oaidalleapiprodscus')
                      ) {
                        // result is an ai image
                        return (
                          <View key={index} className="flex-row justify-start">
                            <View
                              className=" p-2 flex rounded-2xl rounded-tl-none"
                              // style={[{backgroundColor:param.selectedModel.primary}]}
                            >
                              <View className="flex-row">
                                <Image
                                  className="h-8 w-8 rounded-full mr-1"
                                  source={param.selectedModel.image}
                                />
                                <View className="flex-col">
                                  <Text className="text-slate-900 text-lg">
                                    {param.selectedModel.name}
                                  </Text>
                                  <Markdown style={markdownStyles}>
                                    Sure, I'll try to create that!
                                  </Markdown>
                                  <View>
                                    <Image
                                      source={
                                        message.content
                                          ? {uri: message.content}
                                          : require('../../assets/images/loading2.gif')
                                      }
                                      className="rounded-2xl self-start mr-4 z-10"
                                      resizeMode="contain"
                                      onLoad={() => setImageLoading(false)}
                                      style={{height: wp(60), width: wp(60)}}
                                    />
                                    {imageLoading && (
                                      <Image
                                        source={require('../../assets/images/dallePlaceholder.png')}
                                        className="absolute rounded-2xl self-start mr-4"
                                        resizeMode="contain"
                                        style={{height: wp(60), width: wp(60)}}
                                      />
                                    )}
                                  </View>
                                  {/* Add the Download button */}
                                  {/* <TouchableOpacity
                                    style={{
                                      alignItems: 'center',
                                      marginTop: 10,
                                    }}
                                    onPress={() =>
                                      downloadImage(message.content, setLoading)
                                    }>
                                    <Text
                                      style={{
                                        color: 'blue',
                                        textDecorationLine: 'none',
                                      }}
                                      className="">
                                      Download
                                    </Text>
                                  </TouchableOpacity> */}
                                  <Button
                                    style="self-end"
                                    image={require('../../assets/images/dwd2.png')}
                                    isize={'h-6 w-6'}
                                    // title={'Copy'}
                                    onPress={() =>
                                      downloadImage(message.content, setLoading)
                                    }
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        );
                      } else {
                        // chat gpt response
                        return (
                          <View
                            key={index}
                            style={[
                              {width: 'full'},
                              // ,{backgroundColor:param.selectedModel.primary}
                            ]}
                            className=" p-2 rounded-xl rounded-tl-none">
                            <View className="ml-0 flex-row">
                              <Image
                                className="h-7 w-7 rounded-full mr-1"
                                source={param.selectedModel.image}
                              />
                              <View className="flex-col">
                                <Text className="text-slate-900 text-lg">
                                  {param.selectedModel.name}
                                </Text>
                                <Text
                                  className="text-neutral-800"
                                  style={{fontSize: wp(4)}}>
                                  <Markdown
                                    style={markdownStyles}
                                    markdownit={MarkdownIt({
                                      typographer: true,
                                    }).disable(['link', 'image'])}>
                                    {message.content}
                                  </Markdown>
                                </Text>
                                <View
                                  className="m-0 opacity-80 right-0 flex-row self-end"
                                  key={message.content}>
                                  <Button
                                    image={require('../../assets/images/copy2.png')}
                                    isize={'h-6 w-6'}
                                    // title={'Copy'}
                                    onPress={() =>
                                      copyToClipboard(message.content)
                                    }
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        );
                      }
                    } else {
                      // user input text
                      return (
                        <View key={index} className="flex-row w-full">
                          <View className="  p-2 pr-0 rounded-xl rounded-tr-none w-full">
                            <View className="flex-row">
                              <Image
                                className="h-7 w-7 rounded-full mr-1"
                                source={param.selectedAvatar}
                              />
                              <View className="flex-col">
                                <Text className="text-slate-900 text-lg">
                                  You
                                </Text>
                                <Markdown
                                  // className="text-neutral-800"
                                  style={markdownStyles}>
                                  {message.content}
                                </Markdown>
                                {message.base64String && (
                                  <Image
                                    source={{
                                      uri: `data:image/png;base64,${message.base64String}`,
                                    }}
                                    style={{width: hp(10), height: hp(10)}}
                                    resizeMode="contain"
                                    className="m-2 mt-0 ml-0 rounded-xl shadow-black"
                                  />
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    }
                  })}
                </ScrollView>
              </View>
            </View>
          ) : (
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS !== 'ios' ? 'padding' : 'height'}>
              <Features
                model={param.selectedModel.name}
                provider={param.selectedModel.provider}
              />
            </KeyboardAvoidingView>
          )}

          {/* input field and clear button... */}
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
                      className="p-1 self-start pl-0 mt-2 ml-0 rounded-md mb-0  "
                      onPress={clear}>
                      <Image
                        source={require('../../assets/images/clear2.png')}
                        className="h-7 w-7 ml-0"
                      />
                    </TouchableOpacity>
                  )}
                  <View
                    style={{width: wp(85)}}
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
                      {param.selectedModel.name == 'Vision' && (
                        <TouchableOpacity
                          className=" p-2 my-auto rounded-md"
                          onPress={() => setOpenImagePickerModal(true)}>
                          <Image
                            source={require('../../assets/images/addImg.png')}
                            className="h-6 w-6"
                          />
                        </TouchableOpacity>
                      )}
                      {/* <View>
                        <PickDocument
                          onPress={() => setOpenImagePickerModal(true)} setFile={setFile} file = {file}
                        />
                      </View> */}
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
                </View>
              </KeyboardAvoidingView>
            )}
          </View>
        </SafeAreaView>
        {/* </ImageBackground> */}
      </View>
      {/* <ImagePickerModal openImagePickerModal={openImagePickerModal} setOpenImagePickerModal={setOpenImagePickerModal} /> */}
      <Modal visible={openImagePickerModal} animationType="slide" transparent>
        <View className="flex flex-1 bg-black/50 items-center justify-end">
          <View
            style={{width: wp(90), height: wp(40)}}
            className="flex flex-col bg-slate-800 p-2 justify-normal rounded-3xl">
            <View className="flex flex-row justify-between">
              <Text className="font-mono text-base self-start text-center text-slate-100 m-5 mt-2">
                Please select an option:
              </Text>
              <TouchableOpacity
                className="self-start"
                onPress={() => setOpenImagePickerModal(false)}>
                <Image
                  source={require('../../assets/images/close.png')}
                  className="h-6 w-6"
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-center self-center gap-8">
              <TouchableOpacity
                className="flex flex-col justify-center"
                onPress={gallery}>
                <Image
                  source={require('../../assets/images/gallery.png')}
                  className="h-10 w-10 self-center"
                />
                <Text className="text-white">Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-col justify-center"
                onPress={camera}>
                <Image
                  source={require('../../assets/images/camera.png')}
                  className="h-10 w-10 self-center"
                />
                <Text className="text-white">Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#000',
    // backgroundColor: '#rgb(2 6 23)',
    fontSize: wp(4),
    width: wp(73),
    marginTop: 0,
  },
  fence: {
    color: '#fff',
    fontSize: 10,
    backgroundColor: '#000',
    overflow: 'hidden',
    padding: 10,
    borderRadius: 5,
  },
  code_block: {
    color: '#fff',
    fontSize: 10,
    backgroundColor: '#000',
    overflow: 'hidden',
    padding: 10,
    borderRadius: 5,
  },
});
