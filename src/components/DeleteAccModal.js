import { View, Text, TextInput, Modal, StyleSheet, BackHandler, TouchableOpacity } from 'react-native'
import Button from './Button';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { select_beep } from '../constants/Sounds';

const CustomModal = ({ setDelModalVisible, delModalVisible, deleteAccount, setPassword, password }) => {
  console.log(password)
  return (
    <Modal visible={delModalVisible} animationType="fade" transparent>
      <View className='flex flex-1 items-center justify-center self-center w-full' style={styles.modalContainer}>
        <View style={{ width: wp(80), height: wp(60) }}
          className="flex flex-col bg-slate-800 p-5 pb-0 w-96 justify-center">
          <Text className="font-mono text-2xl text-center mb-5 mt-0">Are you sure you wanna delete your account?</Text>
          <TextInput
            style={{ width: wp(60), height: wp(10) }}
            editable={true}
            onChangeText={(text) => setPassword(text)}
            placeholder="Confirm Password"
            className='bg-slate-500 mb-8 rounded-xl text-slate-200 self-center'
          />
          <View className='flex flex-row justify-center gap-8'>
            <TouchableOpacity style={{ width: wp(20) }} disabled={password.length < 6 ? true : false}
              onPress={() => deleteAccount()}
              className="bg-red-900 rounded-2xl flex justify-center text-center">
              {/* <Button title="Confirm" onPress={() => deleteAccount()} /> */}
              <Text style={styles.text}>Confirm</Text>
            </TouchableOpacity>
            <View style={{ width: wp(20) }}
              className="bg-slate-500 rounded-2xl flex justify-center text-center">
              <Button title="Cancel" onPress={() => [setDelModalVisible(false), select_beep()]} />
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

export default CustomModal;