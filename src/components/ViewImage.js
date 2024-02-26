import React, { useEffect } from 'react';
import { Modal, View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from './Button';
import { downloadImage } from '../constants/DownloadImage';
import { deleteImageFromStorage } from '../firebase/firebase.storage';

const ViewImage = ({ viewImage, image, setViewImage, text }) => {


  return (
    <Modal visible={viewImage} animationType="fade" transparent onRequestClose={() => setViewImage(false)}>
      <View className="flex h-full bg-black/50 items-center justify-center self-center w-full">
      <View className="flex absolute flex-row self-start top-0 p-3">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={() => setViewImage(false)}
        />
      </View>
      <View className="flex absolute flex-row self-end top-0 p-3">
        <View className='mr-3'>
        <Button
          image={require('../../assets/images/dwd.png')}
          onPress={() => downloadImage(image.url)}
        />
        </View>
        <Button
          image={require('../../assets/images/delete1.png')}
          onPress={() => deleteImageFromStorage(image.path)}
        />
      </View>
        <View
          style={{ width: wp(80), height: wp(35) }}
          className="flex flex-col justify-center rounded-3xl"
        >
          <Image source={{ uri: image.url }} className="self-center rounded-3xl"  style={{ width: wp(60), height: wp(60) }} />
          <Text
            style={{ fontSize: wp(4) }}
            className="text-center text-slate-200 font-mono p-5"
          >
            {image.prompt}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ViewImage;
