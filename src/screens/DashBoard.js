import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, BackHandler, TouchableOpacity, Modal, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/firebase.config';
import Button from '../components/Button';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import avatar from '../constants/Avatars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AvatarsModal from '../components/AvatarsModal';
import CustomModal from '../components/DeleteAccModal';
import Contact from '../components/Contact';
import HorizontalLine from '../components/HorizontalLine';
import ManageAcc from '../components/ManageAcc';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Tts from 'react-native-tts';
import { logout_beep, select_beep } from '../constants/Sounds';

const Dashboard = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = auth.currentUser;

  const handleBackPress = () => {
    select_beep();
    navigation.goBack(); // works best when the goBack is async
    return true; // Return true to prevent the default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName);
      setEmail(currentUser.email);
    }
    console.log(avatar)

  }, []);

  useEffect(() => {
    // text to speech events
    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
    Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
    // Tts.voices().then(voices => console.log("Voices: " ,voices));e
  }, []);

  const textToSpeech = (msg) => {
    Tts.speak(msg, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const signOut = () => {
    auth.signOut()
      .then(() => {
        // Handle successful sign-out
        logout_beep();
        
        textToSpeech("Logged out successfully");
        // ToastAndroid.show("Sign out successful", ToastAndroid.SHORT);
        navigation.navigate('Welcome'); // Redirect to the Welcome screen or any other screen
      })
      .catch(error => console.log(error.message));
  };

  const deleteAccount = async () => {
    setDelModalVisible(false);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.currentUser.delete()
        .then(() => {
          console.log("User deleted successfully");
          textToSpeech("Account deletion successfull");
          // ToastAndroid.show("User deleted successfully", ToastAndroid.SHORT);
          navigation.navigate('Welcome');
        }).catch((error) => {
          console.log("Error deleting user", error);
          Alert.alert("Error deleting user try again: " + error.message);
        });
    } catch (e) {
      console.log(e)
      Alert.alert("Error deleting user try again: " + e.message);
    } finally {
      setLoading(false);
    }

  }

  const handleProfileImg = () => {
    select_beep();
    updateProfile(auth.currentUser, {
      photoURL: selectedAvatar
    }).then(() => {
      // Profile updated!
      console.log("Profile updated")
      textToSpeech("Profile updation successfull!");
      setModalVisible(false);
    }).catch((error) => {
      // An error occurred
      console.log("Error updating profile");
      Alert.alert("Error updating profile try again");
      setModalVisible(false);
    }
    )
  }

  return (
    <View style={styles.container}
      className="flex-1 bg-slate-950"
    >
      <View className="flex flex-row self-end m-0">
        <View className=''>
          <Button
            image={require('../../assets/images/close.png')}
            onPress={handleBackPress}
          />
        </View>
      </View>
      <TouchableOpacity onPress={() => [setModalVisible(true), select_beep()]} className=' mb-5'>
        <Image
          // source={(selectedAvatar || currentUser.photoURL) ? { uri: currentUser.photoURL } : require('../../assets/images/user.png')}
          source={currentUser.photoURL}
          // style={styles.profileImage}
          className="rounded-full w-20 h-20 m-5 mb-0 mx-auto"
        />
        <Text className='text-center text-sm text-slate-200'>Change Avatar</Text>
      </TouchableOpacity>
      <View className='flex self-start'>
        <Text className='font-mono text-base font-medium mb-5 text-slate-300'>
          Hello, {displayName}
        </Text>
        <Text className='font-mono text-base font-medium mb-5 text-slate-300'>
          Email: {email}
        </Text>
      </View>

      <HorizontalLine text='Contact' />

      <View className='self-start'><Contact /></View>

      <HorizontalLine text='Manage Account' />

      <View className='self-start'>
        <ManageAcc signOut={signOut} setDelModalVisible={setDelModalVisible} />
      </View>

      <View style={styles.horizontalLine} />

      <CustomModal setDelModalVisible={setDelModalVisible} delModalVisible={delModalVisible} deleteAccount={deleteAccount} setPassword={setPassword} password={password} />
      <AvatarsModal setModalVisible={setModalVisible} modalVisible={modalVisible} handleProfileImg={handleProfileImg} setSelectedAvatar={setSelectedAvatar} selectedAvatar={selectedAvatar} />

      {loading &&
        <View className='flex justify-center'>
          <Image
            source={require('../../assets/images/loading2.gif')}
            style={{ width: hp(10), height: hp(10) }}
            className="ml-5"
          />
        </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',  
    alignItems: 'center',
    padding: 35,
  },
  textStyle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#3740FE',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // To make it a circular image
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
    borderRadius: 50, // To make it a circular image
    marginBottom: 20,
  },
});

export default Dashboard;
