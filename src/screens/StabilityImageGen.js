import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  BackHandler,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {select_beep} from '../constants/Sounds';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../components/Button';
import RNFetchBlob from 'rn-fetch-blob';
import {downloadBase64Image, downloadBlobImage} from '../constants/DownloadImage';
import generateImage, {stableDiffusionXL} from '../api/stability';

const GenerateByPromptNative = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const [blobImage, setBlobImage] = useState('');
  const navigation = useNavigation();
  const param = useRoute().params;
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

  const initiate = async () => {
    let para = '';
    if(param.imageModel.name ==='Cyberpunk Avatars'){
      // para = `Create an avatar of a ${prompt} and a futuristic costume with a cyberpunk city in the background`;
      para = `Candid portrait of  ${prompt} in the year 2330, cyberpunk, neon lighting, 35mm f/2.8`;
    }else if(param.imageModel.name === "Pop Art"){
      para = `Create an Andy Warhol style illustration of ${prompt}`;
    }else if(param.imageModel.name === "Anime Avatars"){
      para = `Create an image of a digital anime avatar. The avatar should feature a ${prompt}`;
    }else if(param.imageModel.name === "3D Toy Art"){
      para = `Generate a cute and childlike 3D ${prompt}, incorporating elements of fantasy, adventure or romantic. digital art. high resolution. smooth and curved lines. bright and saturated colors.`;
    }else if(param.imageModel.name === "Time Travel"){
      para = `Create a picture of  ${prompt}. Time travel to Ancient Rome. High resolution. 4K.`;
    }else if(param.imageModel.name === "Miniature paintings"){
      para = `Create a photo of ${prompt} in the style of miniature photography.`;
    }else if(param.imageModel.name === "Pet under fisheye lens"){
      para = `Generate a photo of ${prompt}. Use the Sigma fisheye lens, f/3.5.`;
    }else if(param.imageModel.name === "Modern Architectural Design"){
      para = `Generate an architectural design of  ${prompt}, using the modern style. The result is a photorealistic rendering.`;
    }else if(param.imageModel.name === "Wish"){
      para = `${prompt}`;
    }else{
      para = `${prompt}`;
    }
    // const para = `${param.imageModel.p1} ${prompt} ${param.imageModel.p2}`;
    // const para = `Create a detailed and visually rich avatar of a ${prompt} set in a futuristic cyberpunk world. This character embodies the essence of cyberpunk aesthetics. The avatar should have look showcasing advanced technology embedded in their attire. u may add holographic accessories.Background: night, sprawling cityscape filled with towering skyscrapers, flying vehicles, and bustling streets`;
    console.log(para);
    // generateImage(para, setLoading, setImage, setBase64Image);

    // if(image.includes('file:///data')){
    //   await RNFetchBlob.fs.unlink(`file:///${blobImage}`).then(() => {
    //     console.log("deletion successful");
    //   })
    // }
    setImage('');
    setLoading(true);
    await stableDiffusionXL({"inputs": para}, setLoading, setImage, setBlobImage, blobImage);
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
      <View className="flex mt-1 self-start p-5">
        <Text className="font-semibold text-left font-mono mt-1 text-xl text-slate-50">
          {/* Cyberpunk Avatars */}
          {param.imageModel.name}
        </Text>
        <Text className="font-semibold text-left font-mono mt-1 text-sm text-slate-200">
          {/* Design futuristic, edgy avatars in the Cyberpunk Genre */}
          {param.imageModel.desc}
        </Text>
      </View>
      <View className="flex">
        <View className="flex-row mt-4 mb-4 justify-around">
          <TextInput
            className="h-24 rounded-xl border-solid border-2 border-indigo-800"
            onChangeText={setPrompt}
            placeholder={param.imageModel.demo}
            multiline={true}
            // numberOfLines={1}
            style={{color: 'white', textAlignVertical: 'top', width: wp(90)}}
            />
        </View>
        <TouchableOpacity
          onPress={initiate}
          disabled={loading || !prompt}
          aria-disabled={loading || !prompt}
          className="flex-row mt-0 mx-24 rounded-3xl p-2 justify-center bg-indigo-800">
          <Image
              source={require('../../assets/images/send-2.png')}
              className="h-6 w-6 mr-1"
            />
            <Text className="text-center font-bold text-base ml-1 text-slate-50">
              Generate
            </Text>
        </TouchableOpacity>
        <View className="flex mx-auto justify-center mt-6">
          <View
            className=" flex rounded-2xl bg-black p-4 justify-center items-center"
            // style={[{backgroundColor:param.selectedModel.primary}]}
          >
            {image && !loading ? (
              <Image
                source={{
                  uri: image,
                }}
                className="rounded-2xl"
                resizeMode="contain"
                style={{height: wp(60), width: wp(60)}}
              />  
            ) : (
              !loading && (
                <Image
                  //   source={require('../../assets/images/loading.gif')}
                  source={param.imageModel.image}
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
                onPress={() => blobImage? downloadBlobImage(blobImage, setImage, setBlobImage) : downloadBase64Image(base64Image)}>
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

export default GenerateByPromptNative;
