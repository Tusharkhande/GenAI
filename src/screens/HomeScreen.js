import React, { useEffect, useRef, useState } from 'react';
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
  StyleSheet
} from 'react-native';
// import Voice from '@react-native-community/voice';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { apiCall, chatgptApiCall, dalleApiCall } from '../api/openAi';
import Features from '../components/Features';
import Tts from 'react-native-tts';
import { useRoute } from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import Button from '../components/Button';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageDownloaded, setImageDownloaded] = useState(false);
  const [text, setText] = useState('');
  const param = useRoute().params;
  const scrollViewRef = useRef();

  useEffect(() => {
    console.log(param.selectedModel.name)
  }, [])

 /*  const downloadImage = (url) => {
    //to open the image URL in the device's default browser
    Linking.openURL(url).catch((err) => console.error('Error while opening URL:', err));
  }; */

  const generateRandomName = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${timestamp}_${randomNumber}`;
  };
  const downloadImage = async (url) => {
    try {
      setLoading(true);
      const imageName = generateRandomName();
      const response = await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: RNFetchBlob.fs.dirs.DownloadDir + `/${imageName}.jpg`,
          description: 'Image',
        },
      }).fetch('GET', url);
      setLoading(false);
      setImageDownloaded(true);
  
      console.log('File saved to: ', response.path());
      // Alert.alert('Download complete', 'Image has been downloaded successfully.');
    } catch (error) {
      console.error('Error while downloading image:', error);
      Alert.alert('Error', 'Something went wrong while downloading the image.');
    }
  };

  const clear = () => {
    Tts.stop();
    setLoading(false);
    setMessages([]);
  };

  const fetchResponse = async () => {
    if (text.trim().length > 0) {
      Tts.stop();
      setLoading(true);
      let newMessages = [...messages];
      newMessages.push({ role: 'user', content: text.trim() });
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();

      console.log("Before Api Call", text)

      // Make the API call
      {
        if (param.selectedModel.name == "Jarvis") {
          chatgptApiCall(text, newMessages)
            .then(res => {
              console.log("after API Call");
              setText('');
              setLoading(false);
              if (res.success) {
                setMessages([...res.data]);
                updateScrollView();
                startTextToSpeech(res.data[res.data.length - 1]);
                // const lastMessage = res.data[res.data.length - 1];
                // if (lastMessage.content.includes('https')) {
                //   startTextToSpeech({ role: 'assistant', content: "Sure, I'll try to create that!" });
                // } else {
                //   startTextToSpeech(lastMessage);
                // }

              } else {
                newMessages.push({ role: 'assistant', content: "Error: Wait for a bit and try again" });
              }
            })
            .catch(error => {
              setLoading(false);
              Alert.alert('Error', 'Something went wrong');
              console.error('API call error:', error);
            });
        } else if (param.selectedModel.name == 'Friday') {
          dalleApiCall(text, newMessages)
            .then(res => {
              console.log("after API Call");
              setText('');
              setLoading(false);
              if (res.success) {
                setMessages([...res.data]);
                updateScrollView();
                // startTextToSpeech(res.data[res.data.length - 1]);
                const lastMessage = res.data[res.data.length - 1];
                if (lastMessage.content.includes('https')) {
                  startTextToSpeech({ role: 'assistant', content: "Sure, I'll try to create that!" });
                } else {
                  startTextToSpeech(lastMessage);
                }

              } else {
                newMessages.push({ role: 'assistant', content: "Error: Wait for a bit and try again" });
              }
            })
            .catch(error => {
              setLoading(false);
              Alert.alert('Error', 'Something went wrong');
              console.error('API call error:', error);
            });
        } else {
          apiCall(text, newMessages)
            .then(res => {
              console.log("after API Call");
              setText('');
              setLoading(false);
              if (res.success) {
                setMessages([...res.data]);
                updateScrollView();
                // startTextToSpeech(res.data[res.data.length - 1]);
                const lastMessage = res.data[res.data.length - 1];
                if (lastMessage.content.includes('https')) {
                  startTextToSpeech({ role: 'assistant', content: "Sure, I'll try to create that!" });
                } else {
                  startTextToSpeech(lastMessage);
                }

              } else {
                newMessages.push({ role: 'assistant', content: "Error: Wait for a bit and try again" });
              }
            })
            .catch(error => {
              setLoading(false);
              Alert.alert('Error', 'Something went wrong');
              console.error('API call error:', error);
            });
        }
      }
    } else {
      Alert.alert('Error', 'Please enter a message');
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 200)
  }

  const startTextToSpeech = message => {
    if (!message.content.includes('https')) {
      // playing response with the voice id and voice speed
      Tts.speak(message.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  }

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // text to speech events
    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
  }, [])


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 bg-black">
        <SafeAreaView className="flex-1 flex mx-5">
          {/* bot icon */}
          <View className="flex-row justify-center">
            <Image
              // source={require('../../assets/images/bot1.png')}
              source={param.selectedModel ? param.selectedModel.image : require('../../assets/images/bot3.png')}
              style={{ height: hp(15), width: hp(15) }}
            />
          </View>

          {/* features || message history */}
          {messages.length > 0 ? (
            <View className="space-y-5 flex-1">

              <Text className="text-white font-semibold ml-1" style={{ fontSize: wp(5) }}>{param.selectedModel.name}</Text>

              <View
                style={{ height: hp(58) }}
                className="bg-gray-300 rounded-3xl p-4"
              >
                <ScrollView
                  ref={scrollViewRef}
                  bounces={false}
                  className="space-y-4"
                  showsVerticalScrollIndicator={false}
                >
                  {messages.map((message, index) => {
                    if (message.role == 'assistant') {
                      if (message.content.includes('https')) {
                        // result is an ai image
                        return (
                          <View key={index} className="flex-row justify-start">
                            <View
                              className="p-2 flex rounded-2xl bg-blue-300 rounded-tl-none"
                              // style={[{backgroundColor:param.selectedModel.primary}]}
                            >
                              <Text
                                className="text-neutral-800"
                                style={{ fontSize: wp(4) }}
                              >
                                Sure, I'll try to create that!
                              </Text>
                              <Image
                                source={{ uri: message.content }}
                                className="rounded-2xl"
                                resizeMode="contain"
                                style={{ height: wp(60), width: wp(60) }}
                              />
                              {/* Add the Download button */}
                              <TouchableOpacity
                                style={{ alignItems: 'center', marginTop: 10 }}
                                onPress={() => downloadImage(message.content)}
                              >
                                <Text style={{ color: 'blue', textDecorationLine: 'none' }} className='' >Download</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      } else {
                        // chat gpt response
                        return (
                          <View
                            key={index}
                            style={[{ width: wp(70) }
                              // ,{backgroundColor:param.selectedModel.primary}
                            ]}
                            className="bg-blue-300 p-2 rounded-xl rounded-tl-none"
                          >
                            <Text
                              className="text-neutral-800"
                              style={{ fontSize: wp(4) }}
                            >
                              {message.content}
                            </Text>
                          </View>
                        );
                      }
                    } else {
                      // user input text
                      return (
                        <View key={index} className="flex-row justify-end">
                          <View
                            style={{ width: wp(70) }}
                            className="bg-blue-100 p-2 rounded-xl rounded-tr-none"
                          >
                            <Text
                              className="text-neutral-800"
                              style={{ fontSize: wp(4) }}
                            >
                              {message.content}
                            </Text>
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
              style={{ flex: 1 }}
              behavior={Platform.OS !== 'ios' ? 'padding' : 'height'}
            >
              <Features model={param.selectedModel.name} />
            </KeyboardAvoidingView>
          )}

          {/* recording, clear and stop buttons */}
          <View className="flex bg-black justify-center mb-8">
            {loading ? (
              <Image
                source={require('../../assets/images/loading2.gif')}
                style={{ width: hp(10), height: hp(10) }}
                className="ml-5"
              />
            ) : (
              <KeyboardAvoidingView
                style={{ padding: 10 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                <View className="flex flex-row p-2 relative">
                  {messages.length > 0 && (
                    <TouchableOpacity
                      className="p-1 mt-2 ml-0 rounded-md mb-0  dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-0 transition-colors disabled:opacity-40"
                      onPress={clear}
                    >
                      <Image
                        source={require('../../assets/images/clear1.png')}
                        className="h-6 w-6 ml-0"
                      />
                    </TouchableOpacity>
                  )}
                  <View className='flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs'>
                    <TextInput
                      className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-12 pl-3 md:pl-0"
                      onChangeText={setText}
                      placeholder="Send a message"
                      multiline={true}
                      numberOfLines={1}
                      style={{ color: 'white' }}
                    />
                    <TouchableOpacity
                      className="absolute p-1 rounded-md md:bottom-3 md:p-2 md:right-3 dark:hover:bg-gray-900 dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors disabled:opacity-40"
                      onPress={fetchResponse}
                      disabled={!text.trim()}
                    >
                      <Image
                        source={require('../../assets/images/send-icon.png')}
                        className="h-6 w-6"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            )}
          </View>
        </SafeAreaView>
      </View>
      <Modal visible={imageDownloaded} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Download Completed Successfully! {"\n"} Kindly check your Gallery!</Text>
              <View style={styles.buttonContainer1}>
              <View style={styles.buttonContainer}>
                <Button title="       OK" onPress={() => setImageDownloaded(false)} />
              </View>
              </View>
            </View>
          </View>
        </Modal>
    </KeyboardAvoidingView>
  );
};

export default App;

const styles = StyleSheet.create({
  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
modalContent: {
  backgroundColor: '#3B96D2',
  width: '60%',
  padding: 16,
  borderRadius: 8,
  textAlign: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
},
modalTitle: {
  fontSize: 22,
  textAlign: 'center',
  fontWeight: 'bold',
  marginBottom: 16,
  color: '#000',
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  backgroundColor: '#003249',
  width: 80,
  borderRadius: 8,
  marginLeft: 20,
  marginRight: 20,
},
buttonContainer1: {
flexDirection: 'row',
justifyContent: 'center',
},
buttonContainer2: {
flexDirection: 'row',
justifyContent: 'center',
backgroundColor: '#003249',
width: 200,
borderRadius: 20,
paddingTop: 11,
marginLeft: 20,
marginRight: 20,
},

});