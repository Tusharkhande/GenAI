import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
  RefreshControl,
} from 'react-native';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {getDownloadURL, ref} from 'firebase/storage';
import {db, storage} from '../firebase/firebase.config';
import Button from '../components/Button';
import {auth} from '../firebase/firebase.config';
import {select_beep} from '../constants/Sounds';
import {useNavigation} from '@react-navigation/native';
import Card from '../components/Card';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ViewImage from '../components/ViewImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/userContext';
import Loader from '../components/Loader';

const ImageGenHistory = () => {
  const user = auth.currentUser;
  const userId = user.uid;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [image, setImage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const {colorScheme} = useUser();

  async function fetchUserImages(userId) {
    setLoading(true);
    const images = [];
    const imagesQuery = query(
      collection(db, 'user_images'),
      where('userId', '==', userId),
    );
    const querySnapshot = await getDocs(imagesQuery);

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      console.log(data);
      console.log(storage, data.fullPath);
      const imageRef = ref(storage, data.fullPath);
      const imageUrl = await getDownloadURL(imageRef);
      images.push({
        name: data.imageName,
        url: imageUrl,
        path: data.fullPath,
        prompt: data.prompt,
        date: data.createdAt,
      });
    }
    setImages(images);
    console.log(images);
    setLoading(false);

    return images;
  }

  useEffect(() => {
    fetchUserImages(userId);
  }, []);

  const handleBackPress = () => {
    if (viewImage) {
      select_beep();
      setViewImage(false);
      return true;
    } else {
      select_beep();
      navigation.goBack();
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [viewImage]);

  return (
    <SafeAreaView className="flex bg-slate-50 dark:bg-slate-950 w-full h-full">
      <View className='flex'>
      <View className="flex absolute flex-row self-start p-3">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={handleBackPress}
          colorScheme={colorScheme}
        />
      </View>
      <View className="flex flex-row flex-wrap justify-center p-2 mt-2">
        <Text
          className={`font-semibold text-left font-mono mb-2 text-xl text-slate-900 dark:text-slate-200`}>
          Generation History
        </Text>
      </View>
      </View>
      {!loading ? (
        <ScrollView
          className="flex bg-slate-50 dark:bg-slate-950"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => [
                fetchUserImages(userId),
                function () {
                  setRefresh(true);
                  setTimeout(() => {
                    setRefresh(false);
                  }, 5000);
                },
              ]}
            />
          }>
          <View className="flex flex-row flex-wrap justify-around p-4 mt-2">
            {images.map(image => (
              <TouchableOpacity key={image.date} className="mx-1 my-2">
                <Card
                  imageSource={image.url}
                  text={image.prompt}
                  date={image.date}
                  color={'#fff'}
                  textStyle={'text-sm bottom-1 ml-1'}
                  onPress={() => [setViewImage(true), setImage(image)]}
                />
              </TouchableOpacity>
            ))}
            {(!images.length || loading) && (
              <View className="flex self-center p-4 h-full w-full justify-center items-center">
                {/* <View
                  style={{borderWidth: 2, borderRadius: 8}}>
                  <Image
                    source={require('../../assets/images/oho.gif')}
                    // source={{
                    //   uri: 'https://media1.tenor.com/m/609ISt84COwAAAAd/funny-animals-cats.gif',
                    // }}
                    // className="rounded-3xl"
                    // resizeMode="contain"
                    style={{height: wp(60), width: wp(60)}}
                  />
                </View> */}
                <View className="p-5">
                  <Card imageSource={require('../../assets/images/oho.gif')} />
                </View>
                <Text className="text-white p-5 text-center">
                  You have not generated any images yet!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
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
      <ViewImage
        viewImage={viewImage}
        image={image}
        setViewImage={setViewImage}
        fetchUserImages={fetchUserImages}
        userId={userId}
        // text={prompt}
      />
    </SafeAreaView>
  );
};

export default ImageGenHistory;
