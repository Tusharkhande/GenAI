import React from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const MultiInput = ({loading, base64String, messages, param, setText, fetchResponse, text, clear, setOpenImagePickerModal}) => {
  return (
    <View className="flex bg-slate-950 justify-center ">
      {loading ? (
        <Image
          source={require('../../assets/images/loading2.gif')}
          style={{width: hp(10), height: hp(10)}}
          className="m-2"
        />
      ) : (
        <KeyboardAvoidingView style={{padding: 10}}>
          {base64String && (
            <>
              <Image
                source={{
                  uri: `data:image/png;base64,${base64String}`,
                }}
                style={{width: hp(10), height: hp(10)}}
                resizeMode="contain"
                className="m- rounded-2xl opacity-70"
              />
              <Image
                source={require('../../assets/images/uploading1.gif')}
                style={{width: hp(10), height: hp(10)}}
                className=" rounded-2xl absolute self-start ml-0 left-3 top-2"
              />
            </>
          )}
          <View className="flex flex-row justify-center p-2 pb-8">
            {messages.length > 0 && (
              <TouchableOpacity
                className="p-1 self-start pl-0 mt-2 ml-0 rounded-md mb-0  "
                onPress={clear}>
                <Image
                  source={require('../../assets/images/clear2.png')}
                  className="h-7 w-7 ml-0"
                />
              </TouchableOpacity>
            )}
            <View
              style={{width: wp(85)}}
              // className='flex flex-col w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-gray-700 dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-xs dark:shadow-xs'
              className="flex flex-col justify-center">
              <TextInput
                className="m-0 border-slate-500 border-opacity-5 border-solid border rounded-xl bg-slate-800 p-3 text-white"
                onChangeText={setText}
                placeholder="Send a message"
                multiline={true}
                numberOfLines={1}
                style={{color: 'white'}}
              />
              <View className="flex flex-row self-end absolute">
                {(param.selectedModel.name == 'Vision' ||
                  param.selectedModel.name == 'GenAI') && (
                  <TouchableOpacity
                    className=" p-2 my-auto rounded-md"
                    onPress={() => setOpenImagePickerModal(true)}>
                    <Image
                      source={require('../../assets/images/addImg.png')}
                      className="h-6 w-6"
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className=" p-2 my-auto rounded-md"
                  onPress={fetchResponse}
                  disabled={!text.trim()}>
                  <Image
                    source={require('../../assets/images/send-2.png')}
                    className="h-6 w-6"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default MultiInput;
