import React from 'react';
import {Modal, View, Text, BackHandler} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Button from './Button';
import {select_beep} from '../constants/Sounds';

const AppExit = ({exit, setExit}) => {
    const handleModal = () => {
        setExit(false);
        select_beep();
        BackHandler.exitApp();
    };
  return (
    <Modal visible={exit} animationType="fade" transparent>
      <View className="flex flex-1 bg-black/50 items-center justify-center self-center w-full">
        <View
          style={{width: wp(80), height: wp(30)}}
          className="flex flex-col bg-slate-100 dark:bg-slate-800 p-5 pb-2 w-96 justify-around rounded-3xl">
          <Text className="font-mono text-sm text-start text-slate-700 dark:text-slate-300 mb-5 mt-0">
            Are you sure you want to Exit?
          </Text>
          <View className="flex flex-row justify-center self-end gap-x-1">
            <View
              style={{width: wp(15)}}
              className="rounded-3xl flex justify-center text-center">
              <Button textStyle={'text-sm'} pressAble={true} title="Yes" onPress={() => handleModal()} />
            </View>
            <View
              style={{width: wp(15)}}
              className=" rounded-3xl mb-0">
              <Button
                title="No"
                pressAble={true}
                textStyle={'text-sm'}
                onPress={() => [setExit(false), select_beep()]}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AppExit;
