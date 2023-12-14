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
import { assistantSpeech } from '../constants/TextToSpeech';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
  const [googleUser, setGoogleUser] = useState('');
  const [photo, setPhoto] = useState(require("../../assets/images/avatars/thor.jpeg"));

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1095480992319-v0428v3jqmn5htkl4fck1ko1f51mfuvc.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
  }, []);

  const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser.user;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const googleUser = await getCurrentUser();
        console.log(googleUser);
        setGoogleUser(googleUser);
      } catch (error) {
        console.log(error)
      }
    };
    fetchUserData();
  }, []);

  

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
    setDisplayName(currentUser ? currentUser.displayName: googleUser ? googleUser.name: "Sir");
    if (currentUser) {
      setEmail(currentUser.email);
      setPhoto(currentUser.photoURL);
    }else if(googleUser){
      setEmail(googleUser.email)
    }
    console.log(avatar)

  }, [currentUser, googleUser]);

  const signOut = async() => {
    if(googleUser){
      try {
        console.log("hokjhgfdsdfghj")
        //  GoogleSignin.signOut();
        await GoogleSignin.revokeAccess();
        navigation.navigate('Begin');
      } catch (error) {
        console.error(error);
      }
    }else if(currentUser){
      auth.signOut()
      .then(() => {
        logout_beep();
        
        assistantSpeech("Logged out successfully");
        // ToastAndroid.show("Sign out successful", ToastAndroid.SHORT);
        // navigation.navigate('Welcome');
      })
      .catch(error => console.log(error.message));
    }
  };

  const deleteAccount = async () => {
    select_beep();
    setDelModalVisible(false);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.currentUser.delete()
        .then(() => {
          console.log("User deleted successfully");
          assistantSpeech("Account deletion successfull");
          // ToastAndroid.show("User deleted successfully", ToastAndroid.SHORT);
          navigation.navigate('Begin');
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
    if(googleUser){
      setPhoto(selectedAvatar)
      assistantSpeech("Profile updation successfull!");
      setModalVisible(false);
    }else{
      updateProfile(auth.currentUser, {
        photoURL: selectedAvatar
      }).then(() => {
        // Profile updated!
        console.log("Profile updated")
        setModalVisible(false);
      }).catch((error) => {
        // An error occurred
        console.log("Error updating profile");
        Alert.alert("Error updating profile try again");
        setModalVisible(false);
      })
    }
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
          // source={currentUser.photoURL ? currentUser.photoURL : googleUser.photo ? googleUser.photo : require("../../assets/images/avatars/arc.jpg")}
          // style={styles.profileImage}
          source={currentUser ? currentUser.photoURL : photo}
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
        <ManageAcc signOut={signOut} setDelModalVisible={setDelModalVisible} googleUser={googleUser}/>
      </View>

      <View className='justify-end self-center mt-8'>
        <Text>© 2023 @TK Solutions</Text>
      </View>

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
