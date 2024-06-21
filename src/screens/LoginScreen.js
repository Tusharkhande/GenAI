import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {select_beep} from '../constants/Sounds';
import { useUser } from '../context/userContext';
import Loader from '../components/Loader';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  const [loading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const {login, loginWithGoogle, colorScheme} = useUser();

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
      <SafeAreaView className="flex-1 justify-start bg-slate-50 dark:bg-slate-950">
        {/* <View className="flex-row justify-start">
            <TouchableOpacity 
                onPress={()=> navigation.goBack()}
                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
                <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
        </View> */}
        <View className="flex self-center mt-10">
          <Image
          className=' rounded-full'
            source={require('../../assets/images/ai2.png')}
            style={{width: wp(26), height: wp(26)}}
          />
        </View>
      
      <KeyboardAvoidingView
        className="flex px-8 pt-5 mt-10 justify-center"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <View className=" space-y-8">
          <View className="flex flex-row justify-start">
            <Image
              source={require('../../assets/images/email.png')}
              style={[{ width: wp(7), height: wp(7) }, {tintColor: colorScheme === 'dark' ? '#fff' : '#000'}]}
              className="w-10 h-10  pt-4 m-2"
            />
            <TextInput
                className="p-2 text-sm w-80 bg-blue-200 text-gray-700 rounded-2xl "
                // className={`p-4 ${email ? 'text-base' : 'text-sm'} bg-blue-200 text-gray-700 rounded-2xl mb-3`}
              placeholderTextColor="#000"
              placeholder="Enter your email"
              onChangeText={text => setEmail(text.toLowerCase().trim())}
              style={{ width: wp(70), height: wp(12) }}
              returnKeyType="next"
              inputMode='email'
            />
            
          </View>
          {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Password</Text> */}
          <View className="flex flex-row">
            <Image
              source={require('../../assets/images/password.png')}
              style={[{ width: wp(7), height: wp(7) }, {tintColor: colorScheme === 'dark' ? '#fff' : '#000'}]}
              className="w-10 h-10 pt-4 m-2"
            />
            <TextInput
              secureTextEntry={passwordVisibility}
              className="p-2 text-sm w-80 bg-blue-200 text-gray-700 rounded-2xl "
              placeholderTextColor="#000"
              placeholder="Enter your password"
              onChangeText={text => setPassword(text)}
              style={{ width: wp(70), height: wp(12) }}
              returnKeyType="send"
              onSubmitEditing={() => login(email, password, setErrorMessage, errorMessage, setIsLoading)}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={passwordVisibility ? require('../../assets/images/viewPass.png') : require('../../assets/images/hidePass.png')}
              style={{width: wp(6), height: wp(6)}}
              className="absolute self-end top-2 right-1 m-1"
            />
            </TouchableOpacity>
          </View>

          {errorMessage !== '' && (
            <Text className=" text-red-500 dark:text-red-300 mt-0 mb-0 ml-4 text-xs">
              {errorMessage}
            </Text>
          )}
          <View className="flex-row justify-center pt-10">
            <TouchableOpacity
              className="py-3 w-52 bg-blue-400 rounded-xl"
              onPress={() => login(email, password, setErrorMessage, errorMessage, setIsLoading)}>
              <Text className="text-base font-bold text-center text-slate-900 dark:text-slate-200">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-base text-slate-900 dark:text-slate-200 font-mono text-center py-5">
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
        </View> 
        <View className="flex-row justify-center mt-4">
          <Text className=" text-slate-900 dark:text-blue-200 text-sm font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => [navigation.navigate('Register'), select_beep()]}>
            <Text className="font-semibold text-sm text-blue-500">
              {' '}
              Create One!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Loader loading={loading}/>
      </SafeAreaView>
  );
}
