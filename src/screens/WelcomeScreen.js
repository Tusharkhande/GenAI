import { View, Text, Image, TouchableOpacity, FlatList, BackHandler, StyleSheet, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Models from '../constants/Models';
import Button from '../components/Button';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    setModel(Models);
    setSelectedModel(Models[1]);
  }, []);

  const handleBackPress = () => {
    setExit(true);
    return true; // Return true to prevent the default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const handleModal = () => {
    setExit(false);
    BackHandler.exitApp();
  };

  return (
    
    <SafeAreaView className="flex-1 flex justify-around bg-black">
      <View className="flex flex-col items-center space-y-2">
        <Text style={[{ fontSize: wp(10) }, {color:selectedModel.primary}]} className="font-bold text-center">
          Welcome Sir!
        </Text>
        <Text style={[{ fontSize: wp(7) }, {color:selectedModel.primary}] } className="text-center tracking-wider font-semibold">
          {/* A Meet with the Future */}
          {selectedModel.name} here.
        </Text>
        <Text style={[{ fontSize: wp(5) }, {color:selectedModel.primary}] } className="text-center tracking-wider font-semibold">
          Initialize to have a Meet with the Future
          {"\n"}
          and Explore my features...
          {/* {selectedModel.name === "ChatGPT" ?"" : ""}
          {selectedModel.name ==="Friday" ? "I'm powered by the latest Dall-E 2.0 moel by OpenAI having the ability to generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity." : ""}
          {selectedModel.name === "GenAI" ? "I'm powered by the latest GPT-4 and DALL-E 2.0 models by OpenAI having the ability to assist you with creative ideas on a wide range of topics and generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity." : ""} */}
        </Text>
      </View>
      <View className="flex items-center justify-center">
        <Image
          // source={require('../../assets/images/bot3.png')}
          // source={selectedModel.image}
          source={selectedModel ? selectedModel.image : require('../../assets/images/bot3.png')}
          style={{ height: wp(30), width: wp(30) }}
          resizeMode="contain"
        />
      </View>
      <View className="flex flex-col items-center justify-center bg-slate-900 border-r-8 border-l-8 rounded-3xl">
        <FlatList
          data={model}
          horizontal = {true}
          renderItem={({ item }) =>(
            <TouchableOpacity
              onPress={() => setSelectedModel(item)}
              className="flex flex-row items-center justify-between px-1 mx-2 py-2 my-2 rounded-3xl"
              // style={{ backgroundColor: item.primary }}
            >
              <View className="flex flex-row items-center">
                <Image
                  source={item.image}
                  style={{ height: wp(15), width: wp(20) }}
                  resizeMode="contain"
                />
                {/* <Text className="text-white text-xl font-bold ml-5">{item.name}</Text> */}
              </View>
            </TouchableOpacity>
          )}
        />
        <Text className="text-xl font-bold ml-5">Select your preferred Model</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home',{selectedModel : selectedModel})}
        className="mt-0 mx-24 rounded-3xl p-3 border-r-8 border-l-8" //bg-blue-800
        style={{backgroundColor:selectedModel.primary}}
      >
        <Text className="text-center font-bold text-xl" style={{color:selectedModel.secondary}}>Initialize</Text>
        
      </TouchableOpacity>
      {/* Modal on Exit */}
      <Modal visible={exit} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure you want to Exit?</Text>
              <View style={styles.buttonContainer1}>
              <View style={styles.buttonContainer}>
                <Button title="      Yes" onPress={() => handleModal()} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="       No" onPress={() => setExit(false)} />
              </View>
              </View>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
modalContent: {
  backgroundColor: '#3B96D2',
  width: '60%',
  padding: 16,
  borderRadius: 8,
  textAlign: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
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
},
buttonContainer2: {
flexDirection: 'row',
justifyContent: 'center',
backgroundColor: '#003249',
width: 200,
borderRadius: 20,
paddingTop: 11,
marginLeft: 20,
marginRight: 20,
},

});