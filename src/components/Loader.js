import { View, Modal, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Loader = ({loading}) => {
  return (
   // <View>
        <Modal visible={loading} animationType="fade" transparent>
        <View className="flex flex-1 items-center bg-transparent w-full">
          <View
            style={{width: wp(100)}}
            className="flex flex-1  flex-col bg-slate-500 opacity-50 w-auto justify-center">
            <Image
              source={require('../../assets/images/loading2.gif')}
              style={{width: hp(10), height: hp(10)}}
              className="mx-auto"
            />
          </View>
        </View>
      </Modal>
    //</View>
  )
}

export default Loader;