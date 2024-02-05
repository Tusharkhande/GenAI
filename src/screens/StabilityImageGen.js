import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
  BackHandler,
} from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RNFetchBlob from 'rn-fetch-blob';
import {assistantSpeech} from '../constants/TextToSpeech';
import {select_beep} from '../constants/Sounds';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';

const GenerateByPromptNative = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const navigation = useNavigation();

  const apiKey = '';

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

  const generateImage = async para => {
    try {
      setLoading(true);
      if (!apiKey) {
        throw new Error('Missing Stability API key.');
      }

      const response = await axios.post(
        `https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image`,
        {
          text_prompts: [
            {
              text: para,
            },
          ],
          cfg_scale: 7,
          height: 512,
          width: 512,
          steps: 30,
          samples: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      setImage(`data:image/png;base64,${response.data.artifacts[0].base64}`);
      setBase64Image(response.data.artifacts[0].base64);
    } catch (error) {
      console.error('Error generating image:', error.message);
    }
  };

  const createPromptAndRun = () => {
    // const para = `Create an avatar of a ${prompt} and a futuristic costume with a cyberpunk city in the background`;
    const para = `Create a detailed and visually rich avatar of a ${prompt} set in a futuristic cyberpunk world. This character embodies the essence of cyberpunk aesthetics. The avatar should have look showcasing advanced technology embedded in their attire. u may add holographic accessories.Background: night, sprawling cityscape filled with towering skyscrapers, flying vehicles, and bustling streets`;
    setLoading(true);
    generateImage(para);
    setLoading(false);
  };

  const generateRandomName = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);
    return `${timestamp}_${randomNumber}`;
  };

  const downloadBase64Image = async () => {
    select_beep();
    try {
      const imageName = generateRandomName(base64Image);
      const filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${imageName}.jpg`;
      await RNFetchBlob.fs
        .writeFile(filePath, base64Image, 'base64')
        .then(res => {
          console.log('File : ', res);
        });
      assistantSpeech(
        'Download Completed Successfully! Kindly check your Gallery!',
      );
      ToastAndroid.show('Download Completed', ToastAndroid.SHORT);
      RNFetchBlob.fs
        .scanFile([{path: filePath, mime: 'image/png'}])
        .then(() => {
          console.log('Scan file success');
        })
        .catch(err => {
          console.error('Scan file error:', err);
        });

      console.log('File saved to: ', filePath);
    } catch (error) {
      console.error('Error while saving the image:', error);
      Alert.alert('Error', 'Something went wrong while saving the image.');
    }
  };

  useEffect(() => {
    // setImage(require('../../assets/images/avatars/catavt.jpeg'));
  }, []);
  // Other component functions and useEffect hook remain unchanged
  //   console.log("image", image)
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
      <View className="flex mt-1 self-start p-5">
        <Text className="font-semibold text-left font-mono mt-1 text-xl text-slate-50">
          Cyberpunk Avatars
        </Text>
        <Text className="font-semibold text-left font-mono mt-1 text-sm text-slate-200">
          Design futuristic, edgy avatars in the Cyberpunk Genre
        </Text>
      </View>
      <View className="flex">
        <View className="flex-row mt-4 mb-4 justify-around">
          <TextInput
            className="h-16 w-3/4 rounded-xl border-solid border-2 border-indigo-800"
            onChangeText={setPrompt}
            placeholder="Send a message"
            multiline={true}
            numberOfLines={1}
            style={{color: 'white'}}
          />
        </View>
        <TouchableOpacity
          onPress={createPromptAndRun}
          className="mt-0 mx-24 rounded-3xl p-2 bg-indigo-800">
          <Text className="text-center font-bold text-base">Generate</Text>
        </TouchableOpacity>
        <View className="flex mx-auto justify-center mt-6">
          <View
            className=" flex rounded-2xl bg-black p-4 justify-center items-center"
            // style={[{backgroundColor:param.selectedModel.primary}]}
          >
            {image && !loading ? (
              <Image
                source={{
                  uri: image ? image : 'https://via.placeholder.com/150',
                }}
                className="rounded-2xl"
                resizeMode="contain"
                style={{height: wp(60), width: wp(60)}}
              />
            ) : (
              !loading && (
                <Image
                  //   source={require('../../assets/images/loading.gif')}
                  source={{
                    uri: 'https://via.placeholder.com/150',
                  }}
                  className="rounded-2xl"
                  resizeMode="contain"
                  style={{height: wp(60), width: wp(60)}}
                />
              )
            )}
            {loading && (
              <Image
                source={require('../../assets/images/loading.gif')}
                className="rounded-2xl"
                resizeMode="contain"
                style={{height: wp(60), width: wp(60)}}
              />
            )}
            {image && (
              <TouchableOpacity
                style={{alignItems: 'center', marginTop: 10}}
                onPress={() => downloadBase64Image()}>
                <Text
                  style={{color: 'blue', textDecorationLine: 'none'}}
                  className="">
                  Download
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40, // Set the height
    borderColor: 'gray', // Set the border color
    borderWidth: 1, // Set the border width
    borderRadius: 5, // Optional: set the border radius to make it rounded
    paddingHorizontal: 10, // Add some padding on the sides
    color: '#fff', // Set the text color
    backgroundColor: '#333', // Set the background color
    fontSize: 16, // Set the font size
    marginHorizontal: 20, // Add some margin on the sides
    marginTop: 10, // Add some margin at the top
  },
  // Add other styles as needed
});

export default GenerateByPromptNative;
