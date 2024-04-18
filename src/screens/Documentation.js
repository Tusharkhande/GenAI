import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {select_beep} from '../constants/Sounds';
import Markdown from 'react-native-markdown-display';

const Documentation = () => {
  const navigation = useNavigation();
  const [viewImg, setViewImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImagePress = (image) => {
    setSelectedImage(image);
    setViewImg(true);
  };

  return (
    <View className="flex bg-slate-950 flex-1 justify-normal ">
      <View className="flex absolute flex-row self-start p-3 pt-1">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={() => [navigation.navigate('Dashboard'), select_beep()]}
        />
      </View>
      <View className="flex flex-row flex-wrap justify-center mt-2">
        <Text
          className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-50`}>
          Docs
        </Text>
      </View>

      <ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>
        {/* <View className="flex-row justify-center mt-6">
          <Image
            source={require('../../assets/images/ai2.png')}
            style={{width: wp(20), height: wp(20)}}
            className=" rounded-full"
          />
        </View> */}
        {/* <Text className="text-base text-slate-400 text-center m-5 mb-0">
          About GenAI
        </Text> */}
        <View className="text-justify text-slate-400 text-sm p-7 pt-0 pb-3">
          {/* \n **Features** */}

          <Markdown style={markdownStyles}>
            {/* {text} */}
            {`**GenAI** is a cutting-edge AI assistant that engages users in dynamic conversations and produces captivating AI-generated images and artwork.
              \n #### Chat Assistants:`}
          </Markdown>
          <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/chatAssistants.jpg'))} className="py-2 self-center">
            <Image
              source={require('../../assets/images/documentation/chatAssistants.jpg')}
              style={{height: wp(70), width: wp(35)}}
              className="rounded-sm mx-auto"
            />
            <Text className="self-center text-xs">Chat Assistants</Text>
          </TouchableOpacity>
          <Markdown style={markdownStyles}>
            {`\n It includes 5 interactive chat assistants, each designed with unique capabilities that cater to different user needs.
              \n 1. **Jarvis** - A general-purpose chatbot that can engage in dynamic conversations.
              \n 2. **Picasso** - An AI artist that generates AI-generated images based on user input.
              \n 3. **Gemini** - A knowledge-based chatbot that can answer questions and provide information.
              \n 4. **Vision** - An image detection AI that can identify objects and scenes in images.
              \n 5. **GenAI** - Multimodal AI assistant that generates images and text and can also detect objects from images.
              `}
          </Markdown>
          <View className="py-2 pb-4 self-center flex-row ">
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/chatAssistants-demo.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/chatAssistants-demo.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">GenAI</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/chatAssistants-vision.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/chatAssistants-vision.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Vision</Text>
            </TouchableOpacity>
          </View>
          <Markdown style={markdownStyles}>
            {`#### Image Generation using various models: **(Explore AI section)**`}
          </Markdown>
          <View className="py-2 pb-4 self-center flex-row ">
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/chatAssistants-exploreAi.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/chatAssistants-exploreAi.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">ExploreAI</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/chatAssistants-exploreAIScreen.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/chatAssistants-exploreAIScreen.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Vision</Text>
            </TouchableOpacity>
          </View>
          <Markdown style={markdownStyles}>
            {`\n It includes various models that can generate captivating images based on textual descriptions.
              \n+ **DALL·E 2.0** - A transformer-based model that generates images from textual descriptions.
              \n+ **Stability-Diffusion** - A diffusion-based model that generates high-quality images.
              \n+ **Hugging Face Models** - Various open-source models that can generate images.
                - *stable-diffusion-xl-base-1.0*
                - *Paint-Diffuion-V2*
                - *ProteusV0.2*
                - *playground-v1*
                - *playground-v2-1024px-aesthetic*
                - *OpenDalleV1.1*
                - *animagine-xl-3.0*
                - *BRIA-2.2*
                - *juggernaut-xl-v8*
                - *aether-glitch-lora-for-sdxl*
                - *animefull-latest*`}
          </Markdown>
          <View className="py-2 pb-4 self-center flex-row ">
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/exploreai-mystic.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/exploreai-mystic.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Mystic Art</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/exploreai-timetravel.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/exploreai-timetravel.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Time Travel Art</Text>
            </TouchableOpacity>
          </View>

          <Markdown style={markdownStyles}>
            {`#### Object Detection:
            \n This feature is included in two of the chat assistants:
            \n+ *Vision*
            \n+ *GenAI*.`}
          </Markdown>
          <View className="py-2 pb-4 self-center flex-row ">
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/imagedetection.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/imagedetection.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Mystic Art</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/imagedetection-open.jpg'))} className="">
              <Image
                source={require('../../assets/images/documentation/imagedetection-open.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Time Travel Art</Text>
            </TouchableOpacity>
          </View>
          <Markdown style={markdownStyles}>
            {`\n These assistants use the gemini-pro-vision model to detect objects and scenes in images.`}
          </Markdown>

          <Markdown style={markdownStyles}>
            {`#### History:
            \n The history can be accessed from the following screen:
            \n+ *Chat Screen in the upper right corner*
            \n+ *Explore AI Screen in the upper right corner*
            \n+ *Home Screen in the upper right corner*`}
          </Markdown>
          <View className="py-2 pb-4 self-center flex-row flex-wrap justify-center">
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/history-chatscreen.jpg'))} className="m-2">
              <Image
                source={require('../../assets/images/documentation/history-chatscreen.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs mt-2">
                ChatScreen-History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/history-exploreai.jpg'))} className="m-2">
              <Image
                source={require('../../assets/images/documentation/history-exploreai.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs mt-2">
                ExploreAIScreen-History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/history-homescreen.jpg'))} className="m-2">
              <Image
                source={require('../../assets/images/documentation/history-homescreen.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs mt-2">Time Travel Art</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/history.jpg'))} className="m-2">
              <Image
                source={require('../../assets/images/documentation/history.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs mt-2">Time Travel Art</Text>
            </TouchableOpacity>
          </View>
          <Markdown style={markdownStyles}>
            {`From the history icon on the homescreen both the chat history and image generation history can be accessed.`}
          </Markdown>
          <View className="py-2 pb-4 self-center flex-row ">
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/chathistory.jpg'))} className="m-2">
              <Image
                source={require('../../assets/images/documentation/chathistory.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Chat-History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImagePress(require('../../assets/images/documentation/imagegenhistory.jpg'))} className="m-2">
              <Image
                source={require('../../assets/images/documentation/imagegenhistory.jpg')}
                style={{height: wp(70), width: wp(35)}}
                className="rounded-sm mx-auto"
              />
              <Text className="self-center text-xs">Generation-History</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="justify-end mb-0 self-center p-10 pt-2">
          <Text className="text-slate-400 text-xs">© 2023 @ktushar</Text>
        </View>
      </ScrollView>
      <Modal visible={viewImg} animationType="fade" transparent onRequestClose={() => setViewImg(false)}>
      <View className="flex h-full bg-black/70 items-center justify-center self-center w-full">
      <View className="flex absolute flex-row self-start top-0 p-3 pt-1">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={() => setViewImg(false)}
        />
      </View>
        <View
          style={{ width: wp(80), height: wp(35) }}
          className="flex flex-col justify-center rounded-3xl"
        >
          <Image source={selectedImage} className="self-center mb-5 rounded-3xl"  style={{ width: wp(70), height: hp(70) }} />
        </View>
      </View>
    </Modal>
    </View>
  );
};

const markdownStyles = StyleSheet.create({
  body: {
    color: '#999999',
    fontSize: wp(3.7),
    marginTop: 0,
  },
  heading4: {
    color: '#8576FF',
    marginBottom: 2,
    marginTop: 2,
  },
});

export default Documentation;
