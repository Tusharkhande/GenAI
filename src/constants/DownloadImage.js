import {Alert, ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {assistantSpeech} from './TextToSpeech';
import {select_beep} from './Sounds';

const generateRandomName = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
};
const downloadImage = async (url) => {
  select_beep();
  try {
    setLoading(true);
    const imageName = generateRandomName();
    const response = await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: RNFetchBlob.fs.dirs.DownloadDir + `/${imageName}.jpg`,
        description: 'Image',
      },
    }).fetch('GET', url);
    assistantSpeech(
      'Download Completed Successfully! Kindly check your Gallery!',
    );
    ToastAndroid.show('Download Completed', ToastAndroid.SHORT);
    setLoading(false);
    setImageDownloaded(true);

    console.log('File saved to: ', response.path());
    // Alert.alert('Download complete', 'Image has been downloaded successfully.');
  } catch (error) {
    console.error('Error while downloading image:', error);
  }
};

const downloadBase64Image = async (base64Image) => {
  select_beep();
  try {
    const imageName = generateRandomName(base64Image);
    const filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${imageName}.jpg`;
    await RNFetchBlob.fs
      .writeFile(filePath, base64Image, 'base64')
      .then(res => {
        console.log('File : ', res);
      });
    assistantSpeech(
      'Download Completed Successfully! Kindly check your Gallery!',
    );
    ToastAndroid.show('Download Completed', ToastAndroid.SHORT);
    RNFetchBlob.fs
      .scanFile([{path: filePath, mime: 'image/png'}])
      .then(() => {
        console.log('Scan file success');
      })
      .catch(err => {
        console.error('Scan file error:', err);
      });

    console.log('File saved to: ', filePath);
  } catch (error) {
    console.error('Error while saving the image:', error);
    ToastAndroid.show('Error while saving the image', ToastAndroid.SHORT);
  }
};

const downloadBlobImage = async (tempPath) => {
  try {
    const imageName = generateRandomName();
    const filePath = RNFetchBlob.fs.dirs.DownloadDir + `/${imageName}.jpg`;
    await RNFetchBlob.fs.cp(tempPath, filePath).then((resp) => {
      console.log("success", resp)
    })
    await RNFetchBlob.fs.unlink(tempPath);
    assistantSpeech(
      'Download Completed Successfully! Kindly check your Gallery!',
    );
    ToastAndroid.show('Download Completed', ToastAndroid.SHORT);
    RNFetchBlob.fs
      .scanFile([{path: filePath, mime: 'image/png'}])
      .then(() => {
        console.log('Scan file success');
      })
      .catch(err => {
        console.error('Scan file error:', err);
      });

    console.log('File saved to: ', filePath);
  } catch (error) {
    console.error('Error while saving the image:', error);
    ToastAndroid.show('Error while saving the image', ToastAndroid.SHORT);
  }
};

export {downloadImage, downloadBase64Image, downloadBlobImage};