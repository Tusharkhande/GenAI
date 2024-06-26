import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Appearance,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AvatarsModal from '../components/AvatarsModal';
import {select_beep} from '../constants/Sounds';
import {useUser} from '../context/userContext';
import Loader from '../components/Loader';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    require('../../assets/images//avatars/arc.jpg'),
  );
  const [loading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {createUser, colorScheme, loginWithGoogle} = useUser();
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleProfileImg = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    colorScheme === 'dark'
      ? Appearance.setColorScheme('dark')
      : Appearance.setColorScheme('dark');
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-start bg-slate-50 dark:bg-slate-950">
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
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="self-center">
        <Image
          source={selectedAvatar}
          style={{width: wp(20), height: wp(20)}}
          className="rounded-full w-28 h-28 mt-10 mx-auto"
        />
        <Text className="text-center text-xs text-slate-900 dark:text-slate-200">
          Choose an Avatar
        </Text>
      </TouchableOpacity>

      <View
        className="flex px-8 pt-5 mt-10 justify-center"
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <KeyboardAvoidingView>
          <View className="form space-y-8">
            {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Full Name</Text> */}
            <View className="flex flex-row">
              <Image
                source={require('../../assets/images/user.png')}
                // style={{ width: 30, height: 30 }}
                className="w-10 h-10  pt-4 m-2"
                style={[
                  {width: wp(7), height: wp(7)},
                  {tintColor: colorScheme === 'dark' ? '#fff' : '#000'},
                ]}
              />
              <TextInput
                className="p-2 text-sm w-80 bg-blue-200 text-gray-700 rounded-2xl "
                placeholderTextColor="#000"
                placeholder="Enter your Name"
                onChangeText={text => setName(text)}
                style={{width: wp(70), height: wp(12)}}
                returnKeyType="next"
              />
            </View>
            {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Email Address</Text> */}
            <View className="flex flex-row">
              <Image
                source={require('../../assets/images/email.png')}
                // style={{ width: 30, height: 30 }}
                className="w-10 h-10  pt-4 m-2"
                style={[
                  {width: wp(7), height: wp(7)},
                  {tintColor: colorScheme === 'dark' ? '#fff' : '#000'},
                ]}
              />
              <TextInput
                className="p-2 text-sm w-80 bg-blue-200 text-gray-700 rounded-2xl "
                // className={`p-4 ${email ? 'text-base' : 'text-sm'} bg-blue-200 text-gray-700 rounded-2xl mb-3`}
                placeholderTextColor="#000"
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                style={{width: wp(70), height: wp(12)}}
                returnKeyType="next"
              />
            </View>
            {/* <Text className="text-blue-200 ml-4 font-mono text-lg ">Password</Text> */}
            <View className="flex flex-row">
              <Image
                source={require('../../assets/images/password.png')}
                // style={{ width: 30, height: 30 }}
                className="w-10 h-10 pt-4 m-2"
                style={[
                  {width: wp(7), height: wp(7)},
                  {tintColor: colorScheme === 'dark' ? '#fff' : '#000'},
                ]}
              />
              <TextInput
                secureTextEntry={passwordVisibility}
                className="p-2 text-sm w-80 bg-blue-200 text-gray-700 rounded-2xl "
                placeholderTextColor="#000"
                placeholder="Enter your password"
                onChangeText={text => setPassword(text)}
                style={{width: wp(70), height: wp(12)}}
                returnKeyType="send"
                onSubmitEditing={() =>
                  createUser(
                    setEmail,
                    email,
                    password,
                    name,
                    setErrorMessage,
                    errorMessage,
                    setIsLoading,
                    selectedAvatar,
                  )
                }
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Image
                  source={
                    passwordVisibility
                      ? require('../../assets/images/viewPass.png')
                      : require('../../assets/images/hidePass.png')
                  }
                  style={{width: wp(6), height: wp(6)}}
                  className="absolute self-end top-3 right-2 "
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
                onPress={() =>
                  createUser(
                    setEmail,
                    email,
                    password,
                    name,
                    setErrorMessage,
                    errorMessage,
                    setIsLoading,
                    selectedAvatar,
                  )
                }>
                <Text className="text-base font-bold text-center text-slate-900 dark:text-slate-200">
                  Sign Up
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
          {/* <Text className="text-base text-slate-600 dark:text-slate-200 font-bold text-center py-5">
            Or
          </Text> */}
          <View className="flex-row justify-center mt-4">
            <Text className="text-slate-900 dark:text-blue-200 text-sm font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => [navigation.navigate('Login'), select_beep()]}>
              <Text className="font-semibold text-sm text-blue-500">
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      {/* </ImageBackground> */}
      <AvatarsModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        handleProfileImg={handleProfileImg}
        setSelectedAvatar={setSelectedAvatar}
        selectedAvatar={selectedAvatar}
      />
      <Loader loading={loading} />
    </SafeAreaView>
  );
}
