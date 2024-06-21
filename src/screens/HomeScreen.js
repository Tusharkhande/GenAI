import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import Models from '../constants/Models';
import Button from '../components/Button';
import useAuth from '../firebase/useAuth';
import {select_beep} from '../constants/Sounds';
import {useUser} from '../context/userContext';
import AppExit from '../components/AppExit';

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedModel, setSelectedModel] = useState([]);
  const [exit, setExit] = useState(false);
  const {user} = useAuth();
  const {guser, gUserAvatar, name, colorScheme} = useUser();
  const selectedAvatar =
    route.params?.selectedAvatar || user.photoURL || gUserAvatar;

  useEffect(() => {
    setSelectedModel(Models[4]);
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

  return (
    // <ImageBackground
    //     source={require("../../assets/images/bg1.jpg")}
    //     style={{ flex: 1 }}
    //   >
    <SafeAreaView
      className="flex-1 font-mono flex justify-around bg-slate-50 dark:bg-slate-950"
      style={{width: wp(100), height: wp(100)}}>
      <View
        className="flex flex-row justify-between"
        style={{width: wp(90), alignSelf: 'center'}}>
        <View className="">
          <View
            className="absolute top-1.5 bg-slate-600 dark:bg-slate-300 rounded-full -z-10 self-center"
            style={{height: wp(12), width: wp(12)}}
          />
          <TouchableOpacity
            onPress={() => [navigation.navigate('Dashboard'), select_beep()]}
            className="flex top-0 px-2 py-2 my-0 rounded-3xl"
            style={{alignSelf: 'flex-start'}}>
            <Image
              source={selectedAvatar}
              // source={user ? user.photoURL : guser ? gUserAvatar : require("../../assets/images/avatars/thor.jpeg")}
              // source={avatar ? avatar : require("../../assets/images/avatars/arc.jpg")}
              style={{height: wp(11), width: wp(11)}}
              className="rounded-full "
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="flex mx-auto justify-center ">
          <Text
            className=" font-semibold font-[DancingScript-SemiBold] text-center mt-1 text-slate-900 dark:text-slate-200"
            style={{fontSize: wp(8)}}>
            Welcome{' '}
            {user.displayName
              ? user.displayName.split(' ')[0]
              : guser
              ? guser.displayName.split(' ')[0]
              : name.split(' ')[0]}
            !
          </Text>
        </View>
        <View>
          <Button
            style={'top-0 px-2 my-auto mx-auto'}
            image={require('../../assets/images/history1.png')}
            isize={'w-9 h-9'}
            onPress={() => [navigation.navigate('History'), select_beep()]}
            colorScheme={colorScheme}
          />
        </View>
      </View>
      <View className="flex flex-col items-center  mt-0 top-0">
        <View className="flex-row items-center">
          <Text
            style={[{fontSize: wp(7)}, {color: selectedModel.primary}]}
            className="text-center tracking-wider font-semibold  font-[DancingScript-SemiBold]">
            {selectedModel.name}
          </Text>
          <Text
            style={[{fontSize: wp(6)}, {color: selectedModel.primary}]}
            className="font-thin self-end">
            {' '}
            here.
          </Text>
        </View>
        <Text
          style={[{fontSize: wp(5)}, {color: selectedModel.primary}]}
          className="text-center tracking-wider ">
          Initialize to have a Meet with the Future
          {'\n'}
          and Explore my features...
        </Text>
      </View>
      <View className="flex items-center justify-center">
        <View
          className="absolute bg-slate-600 dark:bg-slate-300 rounded-full -z-10 self-center"
          style={{height: wp(31), width: wp(31)}}
        />
        <Image
          // source={require('../../assets/images/bot3.png')}
          // source={selectedModel.image}
          source={
            selectedModel
              ? selectedModel.image
              : require('../../assets/images/gemini.jpeg')
          }
          style={{height: wp(30), width: wp(30)}}
          resizeMode="contain"
          className="rounded-full"
        />
      </View>
      <View className=" self-center">
        <View className="">
          <Button
            title={'Explore AI'}
            textStyle={
              'text-center self-center text-slate-900 dark:text-slate-200 font-semibold'
            }
            image={require('../../assets/images/explore.gif')}
            onPress={() => [navigation.navigate('ExploreAI'), select_beep()]}
            isize={'w-10 h-10'}
          />
        </View>
      </View>
      <View
        className="flex items-center self-center justify-center bg-slate-50 dark:bg-slate-950 rounded-3xl"
        style={{width: wp(100)}}>
        {/* <FlatList
          data={model}
          // horizontal={true}
          numColumns={3}
          renderItem={({ item }) => ( */}
        <View className="flex flex-wrap flex-row justify-center">
          {Models.map((item, index) => (
            <TouchableOpacity
              onPress={() => [setSelectedModel(item), select_beep()]}
              className="flex flex-row items-center justify-between px-2 mx-4 py-2 my-2 rounded-full"
              style={
                colorScheme === 'light'
                  ? styles.shadow_light
                  : styles.shadow_dark
              }
              key={index}
              // style={{ backgroundColor: item.primary }}
            >
              <View className="flex flex-col justify-center">
                <Image
                  source={item.image}
                  style={{height: wp(12), width: wp(12)}}
                  resizeMode="contain"
                  className="rounded-full"
                />
                {/* <Text className="text-white self-center text-xs ml-5">{item.name}</Text> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {/* )}
        /> */}
        <Text className=" text-slate-900 dark:text-slate-200 text-sm ml-2 pb-2">
          Select your interative Assistant
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => [
          navigation.navigate('Chat', {
            selectedModel: selectedModel,
            selectedAvatar: selectedAvatar,
          }),
          select_beep(),
        ]}
        className="mt-0 mx-24 rounded-3xl p-3 border-r-8 border-l-8 mb-10" //bg-blue-800
        style={{
          backgroundColor: selectedModel.primary,
          borderColor: selectedModel.primary,
        }}>
        <Text
          className="text-center font-bold text-xl"
          style={{color: selectedModel.secondary}}>
          Initialize
        </Text>
      </TouchableOpacity>
      <AppExit exit={exit} setExit={setExit} />
    </SafeAreaView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  shadow_dark: {
    shadowColor: '#A6A9D1',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 19,
  },
  shadow_light: {
    shadowColor: '#000',
    elevation: 19,
  },
});
