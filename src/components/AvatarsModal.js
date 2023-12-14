import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from './Button';
import { select_beep } from '../constants/Sounds';

const AvatarsModal = ({setModalVisible,modalVisible,handleProfileImg,setSelectedAvatar,selectedAvatar}) => {
  return (
    
    <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={{ width: wp(80)}}
            className="flex flex-col bg-transparent">
            <Image
              // source={require('../../assets/images/loki1.jpg')}
              // source={selectedAvatar ? { uri: selectedAvatar } : require('../../assets/images/user.png')}
              source={selectedAvatar ? selectedAvatar : require('../../assets/images/user.png')}
              // style={styles.profileImage}
              className="rounded-full w-16 h-16 mx-auto"
            />
            <Text className="font-mono text-xl text-center mb-5 mt-0">Select an Avatar!!!</Text>
            <View
              className="flex flex-row flex-wrap justify-center gap-5 "
            >
              {avatar.map((avt) => {
                return <TouchableOpacity key={avt.id} onPress={() => [setSelectedAvatar(avt.image), select_beep()]}>
                  <Image
                    source={avt.image}
                    // source={{ uri: avt.image }}
                    style={styles.profileImage}
                  />
                </TouchableOpacity>
              })
              }

            </View>
            <View className='flex flex-row justify-center gap-8'>
              <View style={{ width: wp(20) }}
                className="bg-slate-500 rounded-3xl flex justify-center text-center">
                <Button title="  Confirm" onPress={() => handleProfileImg()} />
              </View>
              <View style={{ width: wp(20) }}
                className="bg-slate-500 rounded-3xl flex justify-center text-center">
                <Button title="  Cancel" onPress={() => [setModalVisible(false), select_beep()]} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
  )
}


const styles = StyleSheet.create({
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50, // To make it a circular image
      marginBottom: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      
    },
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