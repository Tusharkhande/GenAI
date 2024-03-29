import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  BackHandler,
  View,
  useWindowDimensions,
} from 'react-native';
import Card from '../components/Card';
import imageModels from '../constants/ImageGenModels';
import writingModels from '../constants/WritingModels';
import {useNavigation} from '@react-navigation/native';
import {select_beep} from '../constants/Sounds';
import Button from '../components/Button';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TextCard from '../components/TextCard';

const AIPainting = ({imageModel, navigation}) => (
  <ScrollView
    className="flex bg-slate-950"
    showsVerticalScrollIndicator={false}>
    <View className="flex flex-row flex-wrap justify-evenly mt-2">
      {imageModel.map(imageModel => (
        <TouchableOpacity key={imageModel.id} className="mx-1 my-2">
          <Card
            imageSource={imageModel.image}
            text={imageModel.name}
            color={imageModel.color}
            onPress={() => [
              navigation.navigate('StabilityImageGen', {
                imageModel: imageModel,
              }),
              select_beep(),
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

const Writing = ({writingModel, navigation}) => (
  // <View style={{flex: 1, backgroundColor: '#673ab7'}} />
  <ScrollView
    className="flex bg-slate-950"
    showsVerticalScrollIndicator={false}>
    <View className="flex flex-row flex-wrap justify-evenly mt-2">
      {writingModel.map(writingModel => (
        <TouchableOpacity key={writingModel.id} className="mx-1 my-2">
          <TextCard
            imageSource={writingModel.image}
            text={writingModel.name}
            // color={writingModel.color}
            onPress={() => [
              navigation.navigate('Writing', {writingModel: writingModel}),
              select_beep(),
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

const ExploreAiScreen = () => {
  const [imageModel, setImageModels] = useState([]);
  const [writingModel, setWritingModels] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setImageModels(imageModels);
    setWritingModels(writingModels);
  }, []);

  const handleBackPress = () => {
    select_beep();
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const Tab = createMaterialTopTabNavigator();
  const AIPaintingScreen = () => (
    <AIPainting imageModel={imageModel} navigation={navigation} />
  );
  const WritingScreen = () => (
    <Writing writingModel={writingModel} navigation={navigation} />
  );

  return (
    <View className="flex bg-slate-950 w-full h-full">
      <View className="flex absolute flex-row self-start p-3 pt-1">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={handleBackPress}
        />
      </View>
      <View className="flex flex-row flex-wrap justify-center mt-2">
        <Text
          className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-50`}>
          Explore AI
        </Text>
      </View>
      <View className='absolute self-end p-3'>
          <Button
            style={'top-0 px-2 my-auto mx-auto'}
            image={require('../../assets/images/history1.png')}
            isize={'w-8 h-8'}
            onPress={() => [navigation.navigate('ImageGenHistory'), select_beep()]}
          />
        </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray', 
          tabBarLabelStyle: {fontSize: 12}, 
          tabBarStyle: {backgroundColor: 'rgb(2 6 23)'}, 
          tabBarIndicatorStyle: {backgroundColor: '#e91e63'}, 
        }}>
        <Tab.Screen name="AI Painting">{AIPaintingScreen}</Tab.Screen>
        <Tab.Screen name="Writing">{WritingScreen}</Tab.Screen>
      </Tab.Navigator>
      {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    /> */}
    </View>
  );
};

export default ExploreAiScreen;
