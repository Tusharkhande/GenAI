import {Modal, View, Image, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Button from './Button';
import {downloadBase64Image, downloadImage} from '../constants/DownloadImage';
import {deleteImageFromStorage} from '../firebase/firebase.storage';
import Markdown from 'react-native-markdown-display';
import { select_beep } from '../constants/Sounds';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { useState } from 'react';

const ViewImage = ({
  viewImage,
  image,
  setViewImage,
  images,
  setImages,
  message,
}) => {
  const [loadingShare, setLoadingShare] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleDateString('en-US', options);
  };

  if (!image || !image.url || typeof image.url !== 'string') {
    return null; // or some placeholder UI
  }

  const shareImage = async(prompt, imageUrl) => {
    select_beep();
    let imageBase64 = '';

    try {
      setLoadingShare(true);
      if (imageUrl.includes('https://')) {
        const resp = await RNFetchBlob.config({ fileCache: true }).fetch('GET', imageUrl);
        const base64Data = await resp.base64();
        imageBase64 = `data:image/png;base64,${base64Data}`;
      } else {
        imageBase64 = `data:image/png;base64,${imageUrl}`;
      }
      share(prompt, imageBase64);
      setLoadingShare(false);
    } catch (err) {
      console.error(err);
    }
  };

  const share = (prompt, imageBase64) => {
    const options = {
      title: 'Share App',
      message: 'Prompt: ' + prompt,
      url: imageBase64,
      type: 'image/png',
      
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
      });
  };

  
  return (
    <Modal
      visible={viewImage}
      animationType="fade"
      transparent
      onRequestClose={() => setViewImage(false)}>
      <View className={`flex h-full ${message? 'bg-black/80' : 'bg-black/70'} items-center justify-center self-center w-full`}>
        <View className="flex absolute flex-row self-start top-0 p-3">
          <Button
            image={require('../../assets/images/back.png')}
            onPress={() => setViewImage(false)}
          />
        </View>
        <View className="flex absolute flex-row self-end top-0 p-3">
            {loadingShare ? (
              <ActivityIndicator className="w-6 h-10 mr-3"/>
            ) : (
              <Button
                image={require('../../assets/images/share.png')}
                onPress={() => shareImage(image.prompt, image.url)}
                isize={'w-6 h-6'}
                style={'mr-3'}
              />
            )}
          <View className="mr-3 flex-row">
            {!loadingDownload ? (<Button
              image={require('../../assets/images/dwd.png')}
              onPress={async () =>[
                setLoadingDownload(true),
                image?.url?.includes('https://')
                  ? await downloadImage(image.url)
                  : await downloadBase64Image(image.url),
                setLoadingDownload(false),
              ]}
              isize={'w-6 h-6'}
            />) : (<ActivityIndicator className='w-6 h-10'/>)}
          </View>
          {!message && (
            !loadingDelete ? (<Button
              image={require('../../assets/images/delete1.png')}
              onPress={async () => [
                setLoadingDelete(true),
                await deleteImageFromStorage(image.path, images, setImages),
                setLoadingDelete(false),
                setViewImage(false),
              ]}
              isize={'w-6 h-5'}
            />) :( <ActivityIndicator className='w-6 h-10'/>)
          )}
        </View>
        <View
          style={{width: wp(80), height: wp(35)}}
          className="flex flex-col justify-center rounded-3xl">
          <Image
            source={
              image?.url?.includes('https://')
                ? {uri: image.url}
                : image?.url?.includes('require(')
                ? image.url
                : {uri: `data:image/png;base64,${image.url}`}
            }
            className="self-center mb-5 rounded-3xl"
            style={{width: wp(60), height: wp(60)}}
          />
          <View className="flex-col self-start">
            <Markdown
              style={{fontSize: wp(4)}}
              className="text-center text-slate-200 font-mono p-5">
              {'**Prompt :** ' + image.prompt}
            </Markdown>
            {!message && (
              <Markdown
                style={{fontSize: wp(4)}}
                className="text-center text-slate-900 dark:text-slate-200 font-mono p-5">
                {'**Created at :** ' + formatDate(image.date)}
              </Markdown>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ViewImage;
