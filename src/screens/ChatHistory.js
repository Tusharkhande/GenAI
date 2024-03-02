import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  FlatList,
  RefreshControl,
  Image,
  ToastAndroid
} from 'react-native';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import {db} from '../firebase/firebase.config';
import Button from '../components/Button';
import {auth} from '../firebase/firebase.config';
import {select_beep} from '../constants/Sounds';
import {useNavigation} from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const ChatHistory = () => {
  const user = auth.currentUser;
  const userId = user.uid;
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const [chatSessions, setChatSessions] = useState([]);

  async function fetchChatSessions() {
    setLoading(true);
    try{
      const sessionsQuery = query(
        collection(db, 'chat_sessions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
      );
      const querySnapshot = await getDocs(sessionsQuery);
      const chatSessions = [];
      querySnapshot.forEach(doc => {
        chatSessions.push({id: doc.id, ...doc.data()});
      });
      console.log(chatSessions);
      setChatSessions(chatSessions);
      setLoading(false);
    }catch(e){
      setLoading(false);
      ToastAndroid.show("Something went wrong!", short);
    }
  }

  useEffect(() => {
    fetchChatSessions();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
    select_beep();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  return (
    <View className="flex bg-slate-950 w-full h-full">
      <View className="flex absolute flex-row self-start p-3">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={handleBackPress}
        />
      </View>
      <View className="flex flex-row flex-wrap justify-center p-2 mt-2 mb-2">
        <Text
          className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-50`}>
          Chat History
        </Text>
      </View>
      {!loading ? (
      <FlatList
        data={chatSessions}
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => [fetchChatSessions(), function(){setRefresh(true); setTimeout(() => {
          setRefresh(false);
        }, 5000);}]} />}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => [
              navigation.navigate('Chat', {
                sessionId: item.id,
                selectedModel: item.selectedModel,
              }),
            ]}
            className="flex flex-row items-center justify-between px-3 mx-4 py-2 my-3 bg-slate-700 rounded-xl"
            key={index}
          >
            <Markdown className=" ">
              {'**' + item.selectedModel.name + '** : ' + item.title}
            </Markdown>
          </TouchableOpacity>
        )}
      />) : (
        <View className="flex bg-black h-full w-full justify-center items-center p-4 self-center">
          <Image
            source={require('../../assets/images/loading.gif')}
            className="rounded-2xl"
            resizeMode="contain"
            style={{height: wp(70), width: wp(70)}}
          />
        </View>
      )}
    </View>
  );
};

export default ChatHistory;
