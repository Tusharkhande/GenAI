import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from './Button';
import { select_beep } from '../constants/Sounds';

const AvatarsModal = ({setModalVisible,modalVisible,handleProfileImg,setSelectedAvatar,selectedAvatar}) => {

  return (
    
    <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={() => setModalVisible(false)}>
        <View className='bg-black/80 dark:bg-black/70 justify-center flex-1 items-center w-full' >
          <View style={{ width: wp(80)}}
            className="flex flex-col bg-transparent">
            <Image
              // source={require('../../assets/images/loki1.jpg')}
              // source={selectedAvatar ? { uri: selectedAvatar } : require('../../assets/images/user.png')}
              source={selectedAvatar ? selectedAvatar : require('../../assets/images/avatars/arc.jpg')}
              style={{width: wp(20), height: wp(20)}}
              className="rounded-full w-16 h-16 mx-auto mb-1"
            />
            <Text className="font-mono text-base text-slate-50 dark:text-slate-200 text-center mt-0">Select an Avatar!!!</Text>
            <View
              className="flex flex-row flex-wrap justify-center gap-6 mt-4"
            >
              {avatar.map((avt) => {
                return <TouchableOpacity key={avt.id} onPress={() => [setSelectedAvatar(avt.image), select_beep()]}>
                  <Image
                    source={avt.image}
                    className='w-14 h-14 rounded-full mb-5'
                  />
                </TouchableOpacity>
              })
              }

            </View>
            <View className='flex flex-row justify-center gap-8 mt-4'>
              <View style={{ width: wp(20) }}
                className="bg-slate rounded-3xl flex justify-center text-center">
                <Button textStyle={'text-slate-200'} pressAble={true} title="Confirm" onPress={() => handleProfileImg()} />
              </View>
              <View style={{ width: wp(20) }}
                className="bg-slate rounded-3xl flex justify-center text-center">
                <Button textStyle={'text-slate-200'} pressAble={true} title="Cancel" onPress={() => [setModalVisible(false), select_beep()]} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
  )
}


const styles = StyleSheet.create({
    modalTitle: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 16,
      color: '#000',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#003249',
      width: 80,
      borderRadius: 8,
      marginLeft: 20,
      marginRight: 20,
    },
    buttonContainer1: {
      flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 8,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 50, // To make it a circular image
      marginBottom: 20,
    },
  });
  
export default AvatarsModal