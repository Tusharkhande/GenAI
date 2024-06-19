import React, { useEffect } from 'react';
import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from './Button';
import { downloadImage } from '../constants/DownloadImage';
import { deleteImageFromStorage } from '../firebase/firebase.storage';
import Markdown from 'react-native-markdown-display';

const ViewImage = ({ viewImage, image, setViewImage, fetchUserImages, userId }) => {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Modal visible={viewImage} animationType="fade" transparent onRequestClose={() => setViewImage(false)}>
      <View className="flex h-full bg-black/70 items-center justify-center self-center w-full">
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
          isize={'w-7 h-6'}
        />
        </View>
        <Button
          image={require('../../assets/images/delete1.png')}
          onPress={() => [deleteImageFromStorage(image.path), setViewImage(false), setTimeout(() => {
            fetchUserImages(userId)
          }, 2000)]}
          isize={'w-7 h-6'}
        />
      </View>
        <View
          style={{ width: wp(80), height: wp(35) }}
          className="flex flex-col justify-center rounded-3xl"
        >
          <Image source={{ uri: image.url }} className="self-center mb-5 rounded-3xl"  style={{ width: wp(60), height: wp(60) }} />
          <View className='flex-col self-start' >
          <Markdown
            style={{ fontSize: wp(4) }}
            className="text-center text-slate-200 font-mono p-5"
          >
            {"**Prompt :** " +image.prompt}
          </Markdown>
          <Markdown
            style={{ fontSize: wp(4) }}
            className="text-center text-slate-200 font-mono p-5"
          >
            {"**Created at :** " +formatDate(image.date)}
          </Markdown>
          </View>
        </View>
      </View>
    </Modal>
  );
};


export default ViewImage;
