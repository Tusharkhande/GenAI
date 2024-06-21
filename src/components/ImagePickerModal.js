import React from 'react';
import {Modal, View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { theme } from '../constants/Theme';

const ImagePickerModal = ({openImagePickerModal, setOpenImagePickerModal, setBase64String, colorScheme}) => {

  const camera = async () => {
    const options = {
      includeBase64: true,
      maxWidth: 512,
      maxHeight: 512,
    };
    const result = await launchCamera(options);
    if (!result.didCancel) {
      setOpenImagePickerModal(false);
      setBase64String(result.assets[0].base64);
    } else {
      ToastAndroid.show('No image clicked!', ToastAndroid.SHORT);
    }
    // vision(base64String)
    // console.log(result.assets[0].base64);
  };
  const gallery = async () => {
    const options = {
      includeBase64: true,
      maxWidth: 512,
      maxHeight: 512,
    };
    const result = await launchImageLibrary(options);
    if (!result.didCancel) {
      setOpenImagePickerModal(false);
      setBase64String(result.assets[0].base64);
    } else {
      ToastAndroid.show('No image selected!', ToastAndroid.SHORT);
    }
  };

  return (
    <Modal visible={openImagePickerModal} animationType="slide" transparent>
        <View className="flex flex-1 bg-black/50 items-center justify-end">
          <View
            style={{width: wp(90), height: wp(40)}}
            className="flex flex-col bg-slate-50 dark:bg-slate-800 p-2 justify-normal rounded-3xl">
            <View className="flex flex-row justify-between">
              <Text className="font-mono text-base self-start text-center text-slate-900 dark:text-slate-100 m-5 mt-2">
                Please select an option:
              </Text>
              <TouchableOpacity
                className="self-start"
                onPress={() => setOpenImagePickerModal(false)}>
                <Image
                  source={require('../../assets/images/close.png')}
                  className="h-6 w-6"
                  style={colorScheme && [colorScheme=='light' ? theme &&  theme.light : theme &&  theme.dark]}
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-center self-center gap-8">
              <TouchableOpacity
                className="flex flex-col justify-center"
                onPress={gallery}>
                <Image
                  source={require('../../assets/images/gallery.png')}
                  className="h-10 w-10 self-center"
                />
                <Text className="text-slate-900 dark:text-slate-200">Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex flex-col justify-center"
                onPress={camera}>
                <Image
                  source={require('../../assets/images/camera.png')}
                  className="h-10 w-10 self-center"
                />
                <Text className="text-slate-900 dark:text-slate-200">Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  );
};

export default ImagePickerModal;
