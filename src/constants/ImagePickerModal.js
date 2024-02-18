import React from 'react';
import {Modal, View, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Button from '../components/Button';
import {select_beep} from './Sounds';

const ImagePickerModal = (openImagePickerModal, setOpenImagePickerModal) => {
  return (
    <Modal visible={openImagePickerModal} animationType="fade" transparent>
      <View className="flex flex-1 bg-black/50 items-center justify-center self-center w-full">
        <View
          style={{width: wp(80), height: wp(40)}}
          className="flex flex-col bg-slate-800 p-5 w-96 justify-center rounded-3xl">
          <Text className="font-mono text-xl text-center text-slate-100 mb-5 mt-0">
            Please select an option:
          </Text>
          <View className="flex flex-row justify-center self-center gap-8">
            <View
              style={{width: wp(20)}}
              className="bg-slate-500 rounded-2xl flex justify-center text-center">
              <Button title="Yes" onPress={() => handleModal()} />
            </View>
            <View
              style={{width: wp(20)}}
              className="bg-slate-500 rounded-2xl flex justify-center text-center">
              <Button
                title="No"
                onPress={() => [setOpenImagePickerModal(false), select_beep()]}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
