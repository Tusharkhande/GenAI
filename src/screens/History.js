import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  BackHandler,
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

const History = () => {
  const user = auth.currentUser;
  const userId = user.uid;
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

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

  return (
    <View className="flex bg-slate-950 w-full h-full">
      <View className="flex absolute flex-row self-start p-3">
        <Button
          image={require('../../assets/images/back.png')}
          onPress={handleBackPress}
        />
      </View>
      <View className="flex flex-row flex-wrap justify-center p-2 mt-2">
        <Text
          className={`font-semibold text-left font-mono mt-1 mb-2 text-xl text-slate-50`}>
          Your Generations
        </Text>
      </View>
      {!loading ? (
        <ScrollView className="flex bg-slate-950">
          <View className="flex flex-row flex-wrap justify-around p-4 mt-2">
            {images.map(image => (
              <TouchableOpacity key={image.date} className="mx-1 my-2">
                <Card
                  imageSource={image.url}
                  text={image.prompt}
                  date={image.date}
                  color={'#fff'}
                  textStyle={'text-sm bottom-1 ml-1'}

                  // onPress={() => navigation.navigate('Image', {imageModel})}
                />
              </TouchableOpacity>
            ))}
            {!images.length && (
              <View className='flex self-center p-4 h-full w-full justify-center items-center'>
                <Image
                  source={require('../../assets/images/cat.jpg')}
                  className="rounded-3xl"
                  resizeMode="contain"
                  style={{height: wp(60), width: wp(60)}}
                />
                <Text className="text-white p-5 text-center">
                  You have not generated any images yet!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View className="flex bg-black h-full w-full justify-center items-center p-4 self-center">
          <Image
            source={require('../../assets/images/loading3.gif')}
            className="rounded-2xl"
            resizeMode="contain"
            style={{height: wp(70), width: wp(70)}}
          />
        </View>
      )}
    </View>
  );
};

export default History;
