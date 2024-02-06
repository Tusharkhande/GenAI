import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, BackHandler, View} from 'react-native';
import Card from '../components/Card';
import imageModels from '../constants/ImageGenModels';
import {useNavigation} from '@react-navigation/native';
import {select_beep} from '../constants/Sounds';
import Button from '../components/Button';

const ExploreAiScreen = () => {
  const [imageModel, setImageModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setImageModels(imageModels);
  }, []);

  const handleBackPress = () => {
    select_beep();
    navigation.goBack(); 
    return true; // Return true to prevent the default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const initiate = imageModel => {
    // console.log(imageModel);
    navigation.navigate('StabilityImageGen', {imageModel: imageModel});
  };

  return (
    <View className="flex bg-slate-950 w-full h-full">
        <View className="flex self-end m-0 absolute">
        <View className="">
          <Button
            image={require('../../assets/images/close.png')}
            onPress={handleBackPress}
            // size={'w-4 h-4'}
          />
        </View>
      </View>
      <View className="flex flex-row flex-wrap justify-center mt-2">
        <Text
          className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-50`}>
          Explore AI
        </Text>
      </View>
      <ScrollView className="flex bg-slate-950">
        <View className="flex flex-row flex-wrap justify-around mt-2">
          {imageModel.map(imageModel => (
            <TouchableOpacity key={imageModel.id} className="mx-1 my-2">
              <Card
                imageSource={imageModel.image}
                text={imageModel.name}
                color={imageModel.color}
                onPress={() => initiate(imageModel)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExploreAiScreen;
