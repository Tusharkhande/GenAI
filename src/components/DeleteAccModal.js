import { View, Text, TextInput, Modal, StyleSheet, BackHandler, TouchableOpacity, Image, Pressable } from 'react-native'
import Button from './Button';
import {useState} from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { select_beep } from '../constants/Sounds';

const DeleteAccModal = ({ setDelModalVisible, delModalVisible, deleteAccount, setPassword, password, colorScheme }) => {
  
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  
  return (
    <Modal visible={delModalVisible} animationType="fade" transparent onRequestClose={()=>setDelModalVisible(false)}>
      <View className="flex flex-1 bg-black/50 items-center justify-center self-center w-full">
        <View
          style={{width: wp(80), height: wp(40)}}
          className="flex flex-col bg-slate-100 dark:bg-slate-800 p-5 pb-2 w-96 justify-around rounded-3xl">
          <Text className="font-mono text-sm text-start text-slate-700 dark:text-slate-300 mb-5 mt-0">Are you sure you wanna delete your account?</Text>
          <View className='flex flex-row self-center'>

          <TextInput
            style={{ width: wp(60), height: wp(10) }}
            onChangeText={(text) => setPassword(text)}
            placeholder="Confirm Password"
            secureTextEntry={passwordVisibility}
            className='bg-slate-500 mb-8 rounded-xl text-slate-200 self-center'
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                passwordVisibility
                  ? require('../../assets/images/viewPass.png')
                  : require('../../assets/images/hidePass.png')
              }
              style={{width: wp(5.6), height: wp(5.6)}}
              className="absolute self-end top-2.5 right-1"
            />
            </TouchableOpacity>
            </View>
          <View className='flex flex-row justify-center self-end gap-x-1'>
            <View style={{ width: wp(20) }}
              className=" rounded-3xl flex justify-center text-center">
              <Button disabled={password.length < 6 ? true : false} style={`${password.length < 6 ? 'bg-red-30' : 'bg-red-900'}`} pressAble={true} title="Confirm" onPress={deleteAccount} />
            </View>
            <View style={{ width: wp(20) }}
              className=" rounded-3xl flex justify-center text-center">
              <Button pressAble={true} title="Cancel" onPress={() => [setDelModalVisible(false), select_beep(), setPassword('')]} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginRight: 15
    textAlign: 'center',
  },
});

export default DeleteAccModal;