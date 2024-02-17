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
  ScrollView
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

const Dashboard = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {guser, setGUserAvatar, gUserAvatar, signOut, deleteAccount} = useUser();
  const user = auth.currentUser;

  const [photo, setPhoto] = useState(
    require('../../assets/images/avatars/thor.jpeg'),
  );

  const handleBackPress = () => {
    select_beep();
    navigation.navigate('Welcome', {selectedAvatar: selectedAvatar}); 
    return true; 
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  useEffect(() => {
    try{
      // setGUserAvatar(user.photoURL);
      setDisplayName(user.displayName);
      setEmail(user.email);
      setPhoto(gUserAvatar);
    }catch(e){
      console.log(e);
    }
  }, [user, guser]);

  const handleProfileImg = () => {
    setLoading(true);
    select_beep();
    updateProfile(user, {
      photoURL: selectedAvatar,
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
        // An error occurred
        console.log('Error updating profile');
        Alert.alert('Error updating profile try again');
        setModalVisible(false);
      });
  };

  return (
    <View style={styles.container} className="flex-1 bg-slate-950 p-7">
      <View className="flex absolute flex-row self-end m-0">
        <View className="">
          <Button
            image={require('../../assets/images/close.png')}
            onPress={handleBackPress}
          />
        </View>
      </View>
      <ScrollView className=" mt-8" showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        onPress={() => [setModalVisible(true), select_beep()]}
        className="self-center flex justify-center mt-0 mb-5">
        <Image
          source={ gUserAvatar}
          className="rounded-full w-20 h-20 m-12 mb-0 mx-auto"
        />
        <Text className="text-center text-sm text-slate-200">
          Change Avatar
        </Text>
      </TouchableOpacity>
      <View className="flex self-start">
        <Text className="font-mono text-base font-medium mb-5 text-slate-300">
          Hello, {displayName}
        </Text>
        <Text className="font-mono text-base font-medium mb-5 text-slate-300">
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
          signOut={() => signOut(setDelModalVisible,navigation, setLoading)}
          setDelModalVisible={setDelModalVisible}
          guser={guser}
        />
      </View>

      <View className="self-center mt-8">
        <Text className=' text-slate-400'>© 2024 @ktushar</Text>
      </View>

      <DeleteAccModal
        setDelModalVisible={setDelModalVisible}
        delModalVisible={delModalVisible}
        deleteAccount={() => deleteAccount(setDelModalVisible,navigation, setLoading)}
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

      <Modal visible={loading} animationType="fade" transparent>
        <View className="flex flex-1 items-center bg-transparent w-full">
          <View
            style={{width: wp(100)}}
            className="flex flex-1  flex-col bg-slate-500 opacity-50 w-auto justify-center">
            <Image
              source={require('../../assets/images/loading2.gif')}
              style={{width: hp(10), height: hp(10)}}
              className="mx-auto"
            />
          </View>
        </View>
      </Modal>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
  textStyle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#3740FE',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: '#003249',
    width: 80,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default Dashboard;
