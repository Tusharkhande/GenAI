import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  BackHandler,
  FlatList,
  RefreshControl,
  Image,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {collection, getDocs, query, where, orderBy} from 'firebase/firestore';
import {db} from '../firebase/firebase.config';
import Button from '../components/Button';
import {auth} from '../firebase/firebase.config';
import {select_beep} from '../constants/Sounds';
import {useNavigation} from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {
  fetchChatSessions,
  deleteSessionAndMessages,
} from '../firebase/firebase.storage';
import Card from '../components/Card';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUser} from '../context/userContext';
import Loader from '../components/Loader';

const ChatHistory = () => {
  const user = auth.currentUser;
  const userId = user.uid;
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const [chatSessions, setChatSessions] = useState([]);
  const {colorScheme} = useUser();

  useEffect(() => {
    fetchChatSessions(userId, setLoading, setChatSessions);
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
    select_beep();
    return true;
  };

  const handleRefresh = () => {
    setRefresh(true);
    fetchChatSessions(userId, setLoading, setChatSessions);
    setTimeout(() => {
      setRefresh(false);
    }, 5000);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const markdownStyles = StyleSheet.create({
    body: {
      color: `${colorScheme == 'light' ? '#0F172A' : '#cbd5e1'}`,
      fontSize: wp(3.5),
      width: wp(73),
      marginTop: 0,
    },
  });

  return (
    <SafeAreaView className="flex bg-slate-50 dark:bg-slate-950 w-full h-full">
      <View className="flex">
        <View className="flex absolute flex-row self-start p-3">
          <Button
            image={require('../../assets/images/back.png')}
            onPress={handleBackPress}
            colorScheme={colorScheme}
          />
        </View>
        <View className="flex flex-row flex-wrap justify-center p-2 mt-2">
          <Text
            className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-900 dark:text-slate-200`}>
            Chat History
          </Text>
        </View>
      </View>
      {!loading ? (
        chatSessions.length > 0 ? (
          <FlatList
            data={chatSessions}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => [
                  fetchChatSessions(userId, setLoading, setChatSessions),
                  function () {
                    setRefresh(true);
                    setTimeout(() => {
                      setRefresh(false);
                    }, 5000);
                  },
                ]}
              />
            }
            renderItem={({item, index}) => (
              <>
                <TouchableOpacity
                  onPress={() => [
                    navigation.navigate('Chat', {
                      sessionId: item.id,
                      selectedModel: item.selectedModel,
                    }),
                  ]}
                  className="flex px-3 mx-6 py-2 my-3 bg-slate-200 dark:bg-slate-700 rounded-xl"
                  key={index}>
                  <Markdown style={markdownStyles}>
                    {'**' + item.selectedModel.name + '** : ' + item.title}
                  </Markdown>
                </TouchableOpacity>
                <View className="absolute self-end right-3 m-5">
                  <Button
                    image={require('../../assets/images/delete1.png')}
                    onPress={() => [
                      deleteSessionAndMessages(
                        // userId,
                        item.id,
                        setLoading,
                        setChatSessions,
                        chatSessions
                      ),
                      select_beep(),
                    ]}
                    colorScheme={colorScheme}
                  />
                </View>
              </>
            )}
          />
        ) : (
          (!loading && !chatSessions.length>0) &&<View className="flex top-5 p-4 h-full w-full items-center">
            <View className="p-5">
              <Card imageSource={require('../../assets/images/oho.gif')} />
            </View>
            <Text className=" text-slate-900 dark:text-slate-200 p-5 text-center">
              No chats yet!
            </Text>
          </View>
        )
      ) : (
        colorScheme == 'dark' ? <View className="flex bg-black h-full w-full justify-center items-center p-4 self-center">
          <Image
            source={require('../../assets/images/loading.gif')}
            className="rounded-2xl"
            resizeMode="contain"
            style={{height: wp(70), width: wp(70)}}
          />
        </View> : <Loader />
      )}
      {!loading && chatSessions.length === 0 && (
        <RefreshControl
          refreshing={refresh}
          onRefresh={handleRefresh}
          style={{position: 'absolute', top: 0, width: '100%'}}
        />
      )}
    </SafeAreaView>
  );
};

// const markdownStyles = StyleSheet.create({
//   body: {
//     color: '#fff',
//     // backgroundColor: '#rgb(2 6 23)',
//     fontSize: wp(3.5),
//     width: wp(73),
//     marginTop: 0,
//   },
// });

export default ChatHistory;
