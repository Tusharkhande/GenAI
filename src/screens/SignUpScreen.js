import { View, Text, TouchableOpacity, Image, TextInput, ImageBackground, ToastAndroid, KeyboardAvoidingView, Appearance, Modal, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AvatarsModal from '../components/AvatarsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { select_beep,err_beep } from '../constants/Sounds';
import { assistantSpeech } from '../constants/TextToSpeech';
import { useUser } from '../context/userContext';
import Loader from '../components/Loader';


export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(require('../../assets/images//avatars/arc.jpg'));
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [loading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {createUser} = useUser();

  // const createUser = async () => {
  //   select_beep();
  //   if (email === '' || password === '' || name === '') {
  //     err_beep();
  //     setErrorMessage('Please fill in all fields.');
  //     assistantSpeech(errorMessage);
  //     return;
  //   }
  //   if (!email.includes('@')) {
  //     err_beep();
  //     setErrorMessage('Please enter a valid email address.');
  //     assistantSpeech(errorMessage);
  //     return;
  //   }
  //   if (password.length < 6) {
  //     err_beep();
  //     setErrorMessage('Password must be at least 6 characters.');
  //     assistantSpeech(errorMessage);
  //     return;
  //   }
  //   setErrorMessage('');
  //   setEmail(email.toLowerCase());
  //   try {
  //     setIsLoading(true);
  //     await createUserWithEmailAndPassword(auth, email, password)
  //       .then((result) => {

  //         // console.log('User account created & signed in!');
  //         // console.log(result)
  //         // ToastAndroid.show("User account created & Signed in Successfully!", ToastAndroid.SHORT);
  //         // updateCurrentUser(auth.currentUser, {
  //         //   displayName: name,
  //         // });
  //         // navigation.navigate('Welcome')
  //         setCurrentUser(result.user);
  //         updateProfile(result.user, {
  //           displayName: name,
  //           photoURL: selectedAvatar
  //         })
  //           .then(() => {

  //             console.log('User account created & signed in!');
  //             console.log(result);
  //             assistantSpeech("Account Created successfully")
  //             // ToastAndroid.show("User account created & Signed in Successfully!", ToastAndroid.SHORT);
  //             // navigation.navigate('Welcome')
  //           })
  //           .catch((updateError) => {
  //             console.error('Error updating displayName:', updateError);
  //           });
  //         // storeData();
  //       })
  //       .catch(error => {
  //         if (error.code === 'auth/email-already-in-use') {
  //           console.log('Entered email address is already in use!');
  //           setErrorMessage('Entered email address is already in use!');
  //         } else if (error.code === 'auth/invalid-email') {
  //           console.log('Entered email address is invalid!');
  //           setErrorMessage('Entered email address is invalid!');
  //         } else if (error.code === 'auth/weak-password') {
  //           console.log('Password should be at least 6 characters!');
  //           setErrorMessage('Password should be at least 6 characters!');
  //         } else if (error.code === 'auth/wrong-password') {
  //           console.log('Wrong password!');
  //           setErrorMessage('Wrong password!');
  //         }
  //         console.error(error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }

  // }
  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('email', email);
  //     await AsyncStorage.setItem('password', password);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  const handleProfileImg = () => {
    setModalVisible(false);
  }

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    colorScheme === 'dark' ? Appearance.setColorScheme('dark') : Appearance.setColorScheme('dark');
  }, []);

  return (
    <View className="flex-1 bg-slate-900">
      {/* <ImageBackground
        source={require("../../assets/images/bg1.jpg")}
        style={{ flex: 1 }}
      > */}
      <SafeAreaView className="flex">
        {/* <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View> */}
        {/* <View className="flex-row justify-center">
          <Image source={require('../../assets/images/bot4.png')}
            style={{ width: wp(40), height: wp(40) }} />
        </View> */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={selectedAvatar}
            style={{ width: wp(20), height: wp(20) }}
            className="rounded-full w-28 h-28 mt-10 mx-auto"
          />
          <Text className='text-center text-sm text-slate-200'>Choose an Avatar</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View className="flex-1 px-8 pt-8 mt-5"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <KeyboardAvoidingView>
          <View className="form space-y-8">
            {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Full Name</Text> */}
            <View className="flex flex-row">
              <Image source={require('../../assets/images/user.png')}
                // style={{ width: 30, height: 30 }}
                className="w-10 h-10  pt-4 m-2"
                style={{ width: wp(8), height: wp(8) }}
              />
              <TextInput
                className="p-4 text-base w-80 bg-blue-200 text-gray-700 rounded-2xl mb-3 "
                placeholderTextColor="#000"
                placeholder="Enter your Name"
                onChangeText={text => setName(text)}
                style={{ width: wp(70), height: wp(14) }}
              />
            </View>
            {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Email Address</Text> */}
            <View className="flex flex-row">
              <Image source={require('../../assets/images/email.png')}
                // style={{ width: 30, height: 30 }}
                className="w-10 h-10  pt-4 m-2"
                style={{ width: wp(8), height: wp(8) }}
              />
              <TextInput
                className="p-4 text-base w-80 bg-blue-200 text-gray-700 rounded-2xl mb-3"
                // className={`p-4 ${email ? 'text-base' : 'text-sm'} bg-blue-200 text-gray-700 rounded-2xl mb-3`}
                placeholderTextColor="#000"
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                style={{ width: wp(70), height: wp(14) }}
              />
            </View>
            {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Password</Text> */}
            <View className="flex flex-row">
              <Image source={require('../../assets/images/password.png')}
                // style={{ width: 30, height: 30 }}
                className="w-10 h-10 pt-4 m-2"
                style={{ width: wp(8), height: wp(8) }}
              />
              <TextInput
                secureTextEntry={true}
                className="p-4 text-base w-80 bg-blue-200 text-gray-700 rounded-2xl mb-4"
                placeholderTextColor="#000"
                placeholder="Enter your password"
                onChangeText={text => setPassword(text)}
                style={{ width: wp(70), height: wp(14) }}
              />
            </View>
            {errorMessage !== '' && (
              <Text className="text-red-300 mt-0 mb-2 ml-4 text-sm">{errorMessage}</Text>
            )}
            <View className="flex-row justify-center">
              <TouchableOpacity
                className="py-3 w-52 bg-blue-400 rounded-xl"
                onPress={() => createUser(setEmail, email, password, name, setErrorMessage, errorMessage, setIsLoading, selectedAvatar)}
              >
                <Text className="text-base font-bold text-center text-gray-700">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-xl text-blue-200 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center mt-3">
            <Text className="text-blue-200 text-base font-semibold">Already have an account?</Text>
            <TouchableOpacity onPress={() => [navigation.navigate('Login'), select_beep()]}>
              <Text className="font-semibold text-base text-blue-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      {/* </ImageBackground> */}
      <AvatarsModal setModalVisible={setModalVisible} modalVisible={modalVisible} handleProfileImg={handleProfileImg} setSelectedAvatar={setSelectedAvatar} selectedAvatar={selectedAvatar} />
      <Loader loading={loading}/>
    </View>

  )

}

