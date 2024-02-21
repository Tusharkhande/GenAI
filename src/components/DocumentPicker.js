import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const PickDocument = ({onPress, setFile, file}) => {
  const docPicker = async () => {
    const pickedFile = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
    });
    // console.log(pickedFile);
    setFile(pickedFile);
    console.log(file);
  };
  return (
    <TouchableOpacity onPress={docPicker} className=" p-2 my-auto rounded-md">
      <Image
        className="w-6 h-6"
        source={require('../../assets/images/attach.png')}
      />
    </TouchableOpacity>
  );
};

export default PickDocument;
