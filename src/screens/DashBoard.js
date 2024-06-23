import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../firebase/firebase.config';
import Button from '../components/Button';
import {signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import {theme} from '../constants/Theme';

import avatar from '../constants/Avatars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvatarsModal from '../components/AvatarsModal';
import Contact from '../components/Contact';
import DeleteAccModal from '../components/DeleteAccModal';
import HorizontalLine from '../components/HorizontalLine';
import ManageAcc from '../components/ManageAcc';
import { select_beep} from '../constants/Sounds';
import {assistantSpeech} from '../constants/TextToSpeech';
import {useUser} from '../context/userContext';
import Loader from '../components/Loader';
import Info from '../components/Info';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThemeSwitch from '../components/ThemeSwitch';

const Dashboard = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [editName, setEditName] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    guser,
    setGUserAvatar,
    gUserAvatar,
    signOut,
    deleteAccount,
    colorScheme,
    toggleColorScheme,
  } = useUser();
  const user = auth.currentUser;
  const avatar = user.photoURL || gUserAvatar;

  const [photo, setPhoto] = useState(
    require('../../assets/images/avatars/thor.jpeg'),
  );

  const handleBackPress = () => {
    select_beep();
    navigation.navigate('Home', {selectedAvatar: selectedAvatar});
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  useEffect(() => {
    try {
      // setGUserAvatar(user.photoURL);
      setDisplayName(user.displayName);
      setEmail(user.email);
      setPhoto(gUserAvatar);
      setNewName(user.displayName);
    } catch (e) {
      console.log(e);
    }
  }, [user, guser]);

  const handleProfileImg = () => {
    setLoading(true);
    select_beep();
    updateProfile(user, {
      photoURL: selectedAvatar ? selectedAvatar : gUserAvatar,
    })
      .then(() => {
        assistantSpeech('Profile updation successfull!');
        console.log('Profile updated');
        setGUserAvatar(selectedAvatar);
        setPhoto(selectedAvatar);
        setModalVisible(false);
        setLoading(false);
      })
      .catch(error => {
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        setModalVisible(false);
      });
  };

  const updateName = () => {
    setLoading(true);
    select_beep();
    updateProfile(user, {
      displayName: newName,
    })
      .then(() => {
        assistantSpeech('Name updation successfull!');
        console.log('Name updated');
        setDisplayName(newName);
        setLoading(false);
        setEditName(false);
      })
      .catch(error => {
        // An error occurred
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950">
      <View className=" flex-row justify-between items-center w-full">
        <View className="flex self-start p-3 pt-1 pb-0 left-2">
          <Button
            image={require('../../assets/images/back.png')}
            onPress={handleBackPress}
            colorScheme={colorScheme}
            // size={'w-4 h-4'}
          />
        </View>
       <ThemeSwitch colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
      </View>
      <ScrollView className="p-7 pt-0" showsVerticalScrollIndicator={false}>
        <>
          <View
            className="absolute top-11 bg-slate-600 rounded-full opacity-80 dark:bg-slate-300 -z-10 self-center"
            style={{height: wp(22), width: wp(22)}}
          />
          <TouchableOpacity
            onPress={() => [setModalVisible(true), select_beep()]}
            className="self-center flex justify-center mt-0 mb-8">
            <Image
              source={avatar}
              style={{width: wp(20), height: wp(20)}}
              className="rounded-full m-12 mb-0 mx-auto "
            />
            <Text className="text-center text-xs text-slate-600 dark:text-slate-300">
              Change Avatar
            </Text>
          </TouchableOpacity>
        </>
        <View className="flex self-start">
          <View className="flex flex-row">
            {editName && (
              <>
                <TextInput
                  placeholder="Name"
                  value={newName}
                  onChangeText={setNewName}
                  multiline={false}
                  returnKeyType="send"
                  onSubmitEditing={() => updateName()}
                  className="font-mono text-base self-center font-medium text-slate-900 border h-10 w-52 border-slate-900 dark:border-slate-300 dark:text-slate-300 rounded-md px-2 py-0"
                />
                <TouchableOpacity
                  className="px-2 pl-4 self-center"
                  onPress={() => updateName()}>
                  <Image
                    source={require('../../assets/images/update.png')}
                    style={[
                      {height: wp(5.3), width: wp(5.3)},
                      colorScheme == 'light' ? theme.light : theme.dark,
                    ]}
                    className="rounded-full mx-auto"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-2 self-center"
                  onPress={() => setEditName(false)}>
                  <Image
                    source={require('../../assets/images/close.png')}
                    style={[
                      {height: wp(5.5), width: wp(5.5)},
                      colorScheme == 'light' ? theme.light : theme.dark,
                    ]}
                    className="rounded-full w-5 h-5 mx-auto"
                  />
                </TouchableOpacity>
              </>
            )}
            {!editName && (
              <>
                <Text className="font-mono text-base font-medium text-slate-900 dark:text-slate-200">
                  Hello, {displayName}
                </Text>
                <TouchableOpacity
                  className="px-2 self-center"
                  onPress={() => setEditName(true)}>
                  <Image
                    source={require('../../assets/images/edit.png')}
                    className="rounded-full w-5 h-5 mx-auto"
                    style={colorScheme == 'light' ? theme.light : theme.dark}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text className="font-mono text-base font-medium mt-5 mb-5  text-slate-900 dark:text-slate-200">
            Email: {email}
          </Text>
        </View>

        <HorizontalLine colorScheme={colorScheme} text="Info" />
        <View className="self-center">
          <Info
            navigation={navigation}
            colorScheme={colorScheme}
            theme={theme}
          />
        </View>

        <HorizontalLine colorScheme={colorScheme} text="Contact" />

        <View className="self-center">
          <Contact colorScheme={colorScheme} theme={theme} />
        </View>

        <HorizontalLine colorScheme={colorScheme} text="Manage Account" />

        <View className="self-center">
          {/* <Switch value={colorScheme=='dark'} onChange={toggleColorScheme} /> */}
          <ManageAcc
            signOut={() => signOut(setDelModalVisible, navigation, setLoading)}
            setDelModalVisible={setDelModalVisible}
            guser={guser}
            theme={theme}
            colorScheme={colorScheme}
          />
        </View>

        <View className="self-center mt-8">
          <Text className=" text-slate-900 dark:text-slate-400">
            © 2024 @ktushar
          </Text>
        </View>

        <DeleteAccModal
          setDelModalVisible={setDelModalVisible}
          delModalVisible={delModalVisible}
          deleteAccount={() =>
            deleteAccount(setDelModalVisible, setLoading, email, password)
          }
          setPassword={setPassword}
          password={password}
          colorScheme={colorScheme}
        />
        <AvatarsModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          handleProfileImg={handleProfileImg}
          setSelectedAvatar={setSelectedAvatar}
          selectedAvatar={selectedAvatar}
        />

        <Loader loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
