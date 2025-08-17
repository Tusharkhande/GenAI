import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {chatgptApiCall} from '../api/openAi';
import Features from '../components/Features';
import Tts from 'react-native-tts';
import {useRoute} from '@react-navigation/native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {assistantSpeech, startTextToSpeech} from '../constants/TextToSpeech';
import {sweep, select_beep} from '../constants/Sounds';
import Markdown, {MarkdownIt} from 'react-native-markdown-display';
import Clipboard from '@react-native-clipboard/clipboard';
import {downloadBase64Image, downloadImage} from '../constants/DownloadImage';
import {vision} from '../api/gemini';
import {geminiChatApiCall} from '../api/gemini';
import {useUser} from '../context/userContext';
import {saveChatSession} from '../firebase/firebase.storage';
import {auth} from '../firebase/firebase.config';
import generateImage from '../api/huggingface';
import {fetchMessagesForSession} from '../firebase/firebase.storage';
import MultiInput from '../components/MultiInput';
import ImagePickerModal from '../components/ImagePickerModal';
import ViewImage from '../components/ViewImage';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [text, setText] = useState('');
  const [base64String, setBase64String] = useState('');
  const [openImagePickerModal, setOpenImagePickerModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [image, setImage] = useState({prompt: 'Try Again', url: require('../../assets/images/dallePlaceholder.png')});
  const param = useRoute().params;
  const scrollViewRef = useRef();
  const navigation = useNavigation();
  const {gUserAvatar, colorScheme} = useUser();
  const user = auth.currentUser;
  const selectedAvatar =
    param.selectedAvatar ||
    gUserAvatar ||
    require('../../assets/images/avatars/thor.jpeg');

  useEffect(() => {
    console.log(param.selectedModel.name);
  }, []);

  const handleBackPress = () => {
    console.log(messages.length);
    if (messages.length >= 2) {
      saveChatSession(user.uid, messages, param.selectedModel, param.sessionId);
    }
    navigation.goBack();
    Tts.stop();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [messages]);

  useEffect(() => {
    if (param.sessionId && param.sessionId.trim() !== '') {
      console.log(param.sessionId.trim());
      fetchMessagesForSession(param.sessionId, setLoading, setMessages);
    }
  }, [param.sessionId]);

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
        if (!base64String) {
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
          } else if (param.selectedModel.name == 'Picasso') {
            /* 
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
            */
            generateImage(text, setLoading).then(newMessage => {
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
          });
          } else if (param.selectedModel.name == 'GenAI') {
            console.log('first');
            if (base64String) {
              console.log('vis');
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
            } else if (
              text.includes('create a image') ||
              text.includes('image') ||
              text.includes('create an image') ||
              text.includes('sketch') ||
              text.includes('generate a image') ||
              text.includes('picture') ||
              text.includes('drawing')
            ) {
              console.log('image');
              generateImage(text, setLoading).then(newMessage => {
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
              });
            } else {
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
            }
            // apiCall(text, newMessages).then(res => {
            //   console.log('after API Call');
            //   setText('');
            //   setLoading(false);
            //   if (res.success) {
            //     setMessages([...res.data]);
            //     updateScrollView();
            //     // startTextToSpeech(res.data[res.data.length - 1]);
            //     const lastMessage = res.data[res.data.length - 1];
            //     if (
            //       lastMessage.content.includes('https://oaidalleapiprodscus')
            //     ) {
            //       setImageLoading(true);
            //       startTextToSpeech({
            //         role: 'assistant',
            //         content: "Sure, I'll try to create that!",
            //       });
            //     } else {
            //       startTextToSpeech(lastMessage);
            //     }
            //   }
            // });
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

  useEffect(() => {
    if (param.selectedModel.name == 'Jarvis') {
      Tts.setDefaultLanguage('en-GB');
      // Tts.setDefaultRate(0.6);
      Tts.setDefaultPitch(0.5);
      assistantSpeech(
        "Hello Boss, I'm Jarvis. I'm powered by the legacy gpt-3.5-turbo model by open-AI. Please feel free to ask me anything!",
      );
    } else if (param.selectedModel.name == 'Picasso') {
      Tts.setDefaultLanguage('en-US');
      // Tts.setDefaultRate(0.6);
      Tts.setDefaultPitch(1.0);
      assistantSpeech(
        "Hello Boss, I'm Picasso. I'm powered by the legacy Dall-E 2.0 model by OPEN-A I. Anything you can imagine, I can create!",
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
  // console.log(messages)

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View className="flex-1 bg-slate-50 dark:bg-slate-950">
        {/* <ImageBackground
      source={require("../../assets/images/bg1.jpg")}
      style={{ flex: 1 }}
      > */}
        <SafeAreaView className="flex-1 flex mx-5 mt-10 pt-3">
          {messages.length == 0 && (
            <View className="flex-row justify-center">
              <Image
                // source={require('../../assets/images/bot1.png')}
                source={
                  param.selectedModel
                    ? param.selectedModel.image
                    : require('../../assets/images/gemini.jpeg')
                }
                style={{height: hp(14), width: hp(14)}}
                className="rounded-full"
              />
            </View>
          )}

          {/* features || message history */}
          {messages.length > 0 ? (
            <View className="space-y-6 flex-1">
              <View className="flex-row justify-between">
                <Text
                  className="text-slate-900 dark:text-slate-200 font-semibold ml-1"
                  style={{fontSize: wp(5)}}>
                  {param.selectedModel.name}
                </Text>
                <View className="flex flex-row items-center">
                  <Text
                    className="text-slate-900 dark:text-slate-200 font-thin mr-2"
                    style={{fontSize: wp(3)}}>
                    {param.selectedModel.provider}
                  </Text>
                  <Button
                    image={require('../../assets/images/history1.png')}
                    onPress={() => navigation.navigate('ChatHistory')}
                    style={'h-6 w-6 mr-1'}
                    colorScheme={colorScheme}
                  />
                </View>
              </View>

              <View
                style={{height: hp(80)}}
                className="bg-slate-200 dark:bg-slate-400 rounded-3xl p-4 pl-1 pr-1">
                <ScrollView
                  ref={scrollViewRef}
                  bounces={false}
                  className="space-y-4"
                  showsVerticalScrollIndicator={false}>
                  {messages.map((message, index) => {
                    if (message.role == 'assistant') {
                      if (
                        message.content.includes(
                          'https://oaidalleapiprodscus',
                        ) ||
                        !message.content.includes(' ')
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
                                  <TouchableOpacity onPress={()=>[setViewImage(true), setImage({url: message.content, prompt: messages[index-1].content})]}>
                                    <Image
                                      source={
                                        message.content.includes(
                                          'https://oaidalleapiprodscus',
                                        )
                                          ? {uri: message.content}
                                          : {
                                              uri: `data:image/png;base64,${message.content}`,
                                            }
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
                                  </TouchableOpacity>
                                  <Button
                                    style="self-end"
                                    image={require('../../assets/images/dwd2.png')}
                                    isize={'h-6 w-6'}
                                    // title={'Copy'}
                                    onPress={() =>
                                      message.content.includes(
                                        'https://oaidalleapiprodscus',
                                      )
                                        ? downloadImage(message.content)
                                        : downloadBase64Image(message.content)
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
                          <View className="  p-2 pr-0 rounded-xl  w-full">
                            <View className="flex-row">
                              <Image
                                className="h-7 w-7 rounded-full mr-1"
                                source={selectedAvatar}
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

          <MultiInput loading={loading} base64String={base64String} fetchResponse={fetchResponse} param={param} messages={messages} setText={setText} text={text} clear={clear} setOpenImagePickerModal={setOpenImagePickerModal} setRecording={setRecording} recording={recording} />
        </SafeAreaView>
        {/* </ImageBackground> */}
      </View>
      <ImagePickerModal openImagePickerModal={openImagePickerModal} setOpenImagePickerModal={setOpenImagePickerModal} setBase64String={setBase64String} colorScheme={colorScheme}/>
      <ViewImage viewImage={viewImage} setViewImage={setViewImage} image={image} message={image}/>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

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
