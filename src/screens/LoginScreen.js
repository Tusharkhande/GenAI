import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ToastAndroid,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase/firebase.config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {select_beep, err_beep} from '../constants/Sounds';
// import EncryptedStorage from 'react-native-encrypted-storage';
import {assistantSpeech} from '../constants/TextToSpeech';
import { useUser } from '../context/userContext';
import Loader from '../components/Loader';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [loading, setIsLoading] = useState(false);
  const {user, guser,login, loginWithGoogle} = useUser();

  return (
    <View className="flex flex-1 bg-slate-900 ">
      {/* <ImageBackground
        source={require("../../assets/images/bg1.jpg")}
        style={{ flex: 1 }}
      > */}
      <SafeAreaView className="flex">
        {/* <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View> */}
        <View className="flex-row justify-center mt-6">
          <Image
            source={require('../../assets/images/bot4.png')}
            style={{width: wp(30), height: wp(30)}}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 px-8 pt-5 mt-10"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className="form space-y-8">
          <View className="flex flex-row justify-start">
            <Image
              source={require('../../assets/images/email.png')}
              style={{width: wp(8), height: wp(8)}}
              className="w-10 h-10  pt-4 m-2"
            />
            <TextInput
              className="p-4 text-base w-80 bg-blue-200 text-gray-700 rounded-2xl mb-3"
              // className={`p-4 ${email ? 'text-base' : 'text-sm'} bg-blue-200 text-gray-700 rounded-2xl mb-3`}
              placeholderTextColor="#000"
              placeholder="Enter your email"
              onChangeText={text => setEmail(text.toLowerCase().trim())}
              style={{width: wp(70), height: wp(14)}}
            />
          </View>
          {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Password</Text> */}
          <View className="flex flex-row">
            <Image
              source={require('../../assets/images/password.png')}
              style={{width: wp(8), height: wp(8)}}
              className="w-10 h-10 pt-4 m-2"
            />
            <TextInput
              secureTextEntry={true}
              className="p-4 text-base w-80 bg-blue-200 text-gray-700 rounded-2xl mb-7"
              placeholderTextColor="#000"
              placeholder="Enter your password"
              onChangeText={text => setPassword(text)}
              style={{width: wp(70), height: wp(14)}}
            />
          </View>

          {errorMessage !== '' && (
            <Text className="text-red-300 mt-0 mb-2 ml-4 text-base">
              {errorMessage}
            </Text>
          )}

          <View className="flex-row justify-center">
            <TouchableOpacity
              className="py-3 w-52 bg-blue-400 rounded-xl"
              onPress={() => login(email, password, setErrorMessage, errorMessage, setIsLoading)}>
              <Text className="text-base font-bold text-center text-gray-700">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-xl text-blue-200 font-bold text-center py-5">
          Or
        </Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity
            className="p-2 bg-blue-200 rounded-2xl"
            onPress={() => loginWithGoogle(navigation, setIsLoading)}>
            <Image
              source={require('../../assets/images/google.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          {/* <TouchableOpacity className="p-2 bg-blue-200 rounded-2xl">
            <Image
              source={require('../../assets/images/apple.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-blue-200 rounded-2xl">
            <Image
              source={require('../../assets/images/facebook.png')}
              className="w-10 h-10"
            />
          </TouchableOpacity> */}
        </View> 
        <View className="flex-row justify-center mt-3">
          <Text className="text-blue-200 text-base font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => [navigation.navigate('Register'), select_beep()]}>
            <Text className="font-semibold text-base text-blue-500">
              {' '}
              Create One!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Loader loading={loading}/>
    </View>
  );
}
