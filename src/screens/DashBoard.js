import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  Modal,
  Alert,
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
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';
import {logout_beep, select_beep} from '../constants/Sounds';
import {assistantSpeech} from '../constants/TextToSpeech';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useUser} from '../context/userContext';
import useAuth from '../firebase/useAuth';
import Loader from '../components/Loader';

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
  const {guser, setGUserAvatar, gUserAvatar, signOut, deleteAccount} =
    useUser();
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
    <View style={styles.container} className="flex-1 bg-slate-950 p-7">
      <View className="flex absolute flex-row self-start p-3">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={handleBackPress}
          // size={'w-4 h-4'}
        />
      </View>
      <View className="flex absolute flex-row self-end p-3">
        <Button
          image={require('../../assets/images/about.png')}
          onPress={() => [navigation.navigate('About'), select_beep()]}
          isize={'w-8 h-8'}
        />
      </View>
      <ScrollView className=" mt-8" showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => [setModalVisible(true), select_beep()]}
          className="self-center flex justify-center mt-0 mb-8">
          <Image
            source={avatar}
            className="rounded-full w-20 h-20 m-12 mb-0 mx-auto"
          />
          <Text className="text-center text-xs text-slate-200">
            Change Avatar
          </Text>
        </TouchableOpacity>
        <View className="flex self-start">
          <View className="flex flex-row">
            {editName &&
            <>
              <TextInput
                placeholder="Name"
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
                multiline={false}
                returnKeyType="send"
                onSubmitEditing={() => updateName()}
                className="font-mono text-base self-center font-medium text-slate-300 border h-10 w-52 border-slate-300 rounded-md px-2 py-0"
              />
              <TouchableOpacity className="px-2 self-center" onPress={() => updateName()}>
              <Image
                source={require('../../assets/images/update.png')}
                className="rounded-full w-5 h-5 mx-auto"
              />
            </TouchableOpacity>
            </>
             }
             {!editName &&
             <> 
              <Text className="font-mono text-base font-medium text-slate-300">
                Hello, {displayName}
              </Text>
            <TouchableOpacity className="px-2 self-center" onPress={() => setEditName(true)}>
              <Image
                source={require('../../assets/images/edit.png')}
                className="rounded-full w-5 h-5 mx-auto"
              />
            </TouchableOpacity>
            </>
            }
          </View>
          <Text className="font-mono text-base font-medium mt-5 mb-5 text-slate-300">
            Email: {email}
          </Text>
        </View>

        <HorizontalLine text="Contact" />

        <View className="self-center">
          <Contact />
        </View>

        <HorizontalLine text="Manage Account" />

        <View className="self-center">
          <ManageAcc
            signOut={() => signOut(setDelModalVisible, navigation, setLoading)}
            setDelModalVisible={setDelModalVisible}
            guser={guser}
          />
        </View>

        <View className="self-center mt-8">
          <Text className=" text-slate-400">© 2024 @ktushar</Text>
        </View>

        <DeleteAccModal
          setDelModalVisible={setDelModalVisible}
          delModalVisible={delModalVisible}
          deleteAccount={() =>
            deleteAccount(
              setDelModalVisible,
              navigation,
              setLoading,
              email,
              password,
            )
          }
          setPassword={setPassword}
          password={password}
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
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // width: '60%',
    // // height: 40,
    // marginBottom: 20,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // borderRadius: 5,
    // paddingLeft: 10,
  },
});

export default Dashboard;
