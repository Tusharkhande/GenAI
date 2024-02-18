import { View, Text, Image, TouchableOpacity, FlatList, BackHandler, StyleSheet, Modal, ImageBackground, Appearance } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import Models from '../constants/Models';
import Button from '../components/Button';
import useAuth from '../firebase/useAuth';
import { select_beep } from '../constants/Sounds';
import { useUser } from '../context/userContext';

export default function WelcomeScreen () {
  const navigation = useNavigation();
  const route = useRoute();
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [exit, setExit] = useState(false);
  const [name, setName] = useState('Sir');
  const [avatar, setAvatar] = useState('1');
  const { user } = useAuth();
  const { guser, gUserAvatar } = useUser();
  const selectedAvatar = route.params?.selectedAvatar || gUserAvatar;


  useEffect(() => {
    setModel(Models);
    setSelectedModel(Models[1]);
  }, []);

  useEffect(() => {
    // console.log(user)
    const colorScheme = Appearance.getColorScheme();
    colorScheme === 'dark' ? Appearance.setColorScheme('dark') : Appearance.setColorScheme('dark');
  }, []);

  const handleBackPress = () => {
    setExit(true);
    return true; // Return true to prevent the default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleModal = () => {
    setExit(false);
    select_beep();
    BackHandler.exitApp();
  };


  return (
    // <ImageBackground
    //     source={require("../../assets/images/bg1.jpg")}
    //     style={{ flex: 1 }}
    //   >
    <SafeAreaView className="flex-1 font-mono flex justify-around bg-slate-950" style={{ width: wp(100), height: wp(100)}}>
      <View className="flex flex-row justify-between"
        style={{ width: wp(90), alignSelf: 'center' }}
      >
        <View className='mr-3' >
          <TouchableOpacity
            onPress={() => [navigation.navigate('Dashboard'), select_beep()]}
            className="flex top-0 px-2 py-2 my-0 rounded-3xl"
            style={{ alignSelf: 'flex-start' }}
          >
            <Image
            source={selectedAvatar}
              // source={user ? user.photoURL : guser ? gUserAvatar : require("../../assets/images/avatars/thor.jpeg")}
              // source={avatar ? avatar : require("../../assets/images/avatars/arc.jpg")}
              style={{ height: wp(11), width: wp(11) }}
              className="rounded-full w-14 h-14 mx-auto"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="flex mx-auto justify-center ">
          <Text style={[{ fontSize: wp(8) },
            //  {color:selectedModel.primary}
          ]}
            className=" font-semibold text-center font-mono mt-1 text-slate-50"
          >
            {/* Welcome {user.displayName == undefined || googleUser.name==undefined ? "Sir" : user.displayName.split(" ")[0]}! */}
            {/* Welcome {user.displayName ? user.displayName.split(" ")[0] : googleUser.name ? googleUser.name.split(" ")[0] : "Sir"} */}

            Welcome {user ? user.displayName.split(" ")[0] : guser ? guser.displayName.split(" ")[0] : "Sir"}!
          </Text>
        </View>
        <View>
          <View className='ml-3'>
            <TouchableOpacity
              onPress={() => [navigation.navigate('About'), select_beep()]}
              className="flex top-0 px-2 py-2 my-0 rounded-xl"
            >
              <Image
                source={require("../../assets/images/about.png")}
                style={{ height: wp(11), width: wp(9) }}
                className="rounded-full mx-auto"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex flex-col items-center  mt-0 top-0">

        <Text style={[{ fontSize: wp(7) }, { color: selectedModel.primary }]} className="text-center tracking-wider font-semibold  font-mono">
          {/* A Meet with the Future */}
          {selectedModel.name} here.
        </Text>
        <Text style={[{ fontSize: wp(5) }, { color: selectedModel.primary }]} className="text-center tracking-wider font-semibold font-mono">
          Initialize to have a Meet with the Future
          {"\n"}
          and Explore my features...
          {/* {selectedModel.name === "ChatGPT" ?"" : ""}
          {selectedModel.name ==="Friday" ? "I'm powered by the latest Dall-E 2.0 moel by OpenAI having the ability to generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity." : ""}
          {selectedModel.name === "GenAI" ? "I'm powered by the latest GPT-4 and DALL-E 2.0 models by OpenAI having the ability to assist you with creative ideas on a wide range of topics and generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity." : ""} */}
        </Text>
      </View>
      <View className="flex items-center justify-center">
        <Image
          // source={require('../../assets/images/bot3.png')}
          // source={selectedModel.image}
          source={selectedModel ? selectedModel.image : require('../../assets/images/bot3.png')}
          style={{ height: wp(30), width: wp(30) }}
          resizeMode="contain"
          className='rounded-full'
        />
      </View>
      <View className=" self-center">
        <View className="">
          <Button
            title={"Explore AI"}
            image={require('../../assets/images/explore.gif')}
            onPress={() => navigation.navigate('ExploreAI')}
            isize={"w-10 h-10"}
          />
        </View>
      </View>
      <View className="flex items-center self-center justify-center bg-slate-900 rounded-3xl" style={{width: wp(100) }}>
        {/* <FlatList
          data={model}
          // horizontal={true}
          numColumns={3}
          renderItem={({ item }) => ( */}
          <View className='flex flex-wrap flex-row justify-center'>
          {Models.map((item, index) => (
            <TouchableOpacity
              onPress={() => [setSelectedModel(item), select_beep()]}
              className="flex flex-row items-center justify-between px-1 mx-4 py-2 my-2 rounded-full"
              key={index}
            // style={{ backgroundColor: item.primary }}
            >
              <View className="">
                <Image
                  source={item.image}
                  style={{ height: wp(12), width: wp(12) }}
                  resizeMode="contain"
                  className='rounded-full'
                />
                {/* <Text className="text-white text-xl font-bold ml-5">{item.name}</Text> */}
              </View>
            </TouchableOpacity>
          ))}
          </View>
          {/* )}
        /> */}
        <Text className="text-slate-100 text-sm font-bold ml-5 pb-2">Select your interative Assistant</Text>
      </View>
      <TouchableOpacity
        onPress={() => [navigation.navigate('Home', { selectedModel: selectedModel }), select_beep()]}
        className="mt-0 mx-24 rounded-3xl p-3 border-r-8 border-l-8 mb-10" //bg-blue-800
        style={{ backgroundColor: selectedModel.primary }}
      >
        <Text className="text-center font-bold text-xl" style={{ color: selectedModel.secondary }}>Initialize</Text>

      </TouchableOpacity>
      {/* Modal on Exit */}
      <Modal visible={exit} animationType="fade" transparent>
                <View className='flex flex-1 bg-black/50 items-center justify-center self-center w-full'>
                    <View style={{ width: wp(80), height: wp(40) }}
                        className="flex flex-col bg-slate-800 p-5 w-96 justify-center rounded-3xl">
                        <Text className="font-mono text-xl text-center text-slate-100 mb-5 mt-0">Are you sure you want to Exit?</Text>
                        <View className='flex flex-row justify-center self-center gap-8'>
                            <View style={{ width: wp(20) }}
                                className="bg-slate-500 rounded-2xl flex justify-center text-center">
                                <Button title="Yes" onPress={() => handleModal()} />
                            </View>
                            <View style={{ width: wp(20) }}
                                className="bg-slate-500 rounded-2xl flex justify-center text-center">
                                <Button title="No" onPress={() => [setExit(false), select_beep()]} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
    </SafeAreaView>
    // </ImageBackground>
  );
}

