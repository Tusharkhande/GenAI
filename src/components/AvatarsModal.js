import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from './Button';
import { select_beep } from '../constants/Sounds';

const AvatarsModal = ({setModalVisible,modalVisible,handleProfileImg,setSelectedAvatar,selectedAvatar, guserAvatar}) => {

  return (
    
    <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={() => setModalVisible(false)}>
        <View className='bg-black/80 dark:bg-black/70 justify-center flex-1 items-center w-full' >
          <View style={{ width: wp(80)}}
            className="flex flex-col bg-transparent">
            <Image
              // source={require('../../assets/images/loki1.jpg')}
              // source={selectedAvatar ? { uri: selectedAvatar } : require('../../assets/images/user.png')}
              source={selectedAvatar ? selectedAvatar : guserAvatar ? guserAvatar : require('../../assets/images/user.png')}
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

export default AvatarsModal