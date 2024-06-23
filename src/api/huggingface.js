import axios from 'axios';
import {HUGGING_API_KEY} from '@env';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {uploadImageFromCache} from '../firebase/firebase.storage';
import base64 from 'base-64';

export default generateImage = async (data, setLoading) => {
  const models = ['playgroundai/playground-v2-1024px-aesthetic','stabilityai/stable-diffusion-xl-base-1.0','Corcelio/mobius', 'fluently/Fluently-XL-Final', 'runwayml/stable-diffusion-v1-5'];
  for(let model of models){
    console.log(model)
    try {
      setLoading(true);
      const response = await axios.post(
        `https://api-inference.huggingface.co/models/${model}`,
        data,
        {
          headers: {
            Authorization: 'Bearer ' + HUGGING_API_KEY,
          },
          responseType: 'arraybuffer', // Use arraybuffer to handle binary data
        },
      );
      let binary = '';
      const bytes = new Uint8Array(response.data);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      base64String = await base64.encode(binary);
      if (base64String) {
        setLoading(false);
        const newMessage = {
          role: 'assistant',
          content: base64String,
        };
        return newMessage;
      }
    } catch (error) {
      setLoading(false);
    }
  }
};

export const stableDiffusionXL = async (
  data,
  setLoading,
  setImage,
  setBlobImage,
  blobImage,
  selectedModel,
) => {
  setLoading(true);
  console.log(selectedModel);
  const models = [selectedModel, 'stabilityai/stable-diffusion-xl-base-1.0','playgroundai/playground-v2-1024px-aesthetic', 'fluently/Fluently-XL-Final','Corcelio/mobius', 'runwayml/stable-diffusion-v1-5'];
  const error = 'Something went wrong please try later or select another model';
  for (let model of models) {
    console.log(model);
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch(
        'POST',
        `https://api-inference.huggingface.co/models/${model}`,
        // 'https://api-inference.huggingface.co/models/dataautogpt3/ProteusV0.2',
        // 'https://api-inference.huggingface.co/models/kviai/Paint-Diffuion-V2',
        // 'https://api-inference.huggingface.co/models/h94/IP-Adapter-FaceID',
        // 'https://api-inference.huggingface.co/models/briaai/BRIA-2.2',
        // 'https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic',
        // 'https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.0',
        {
          Authorization: 'Bearer ' + HUGGING_API_KEY,
        },
        JSON.stringify(data),
      );

      const contentType = response.respInfo.headers['content-type'];
      console.log(response.respInfo);
      console.log(contentType);
      if (!contentType.includes('image')) {
        // throw new Error('Something went wrong please try later or select another model');
        error = 'Something went wrong please try later or select another model';
      }
      setLoading(false);
      const imagePath =
        Platform.OS === 'android'
          ? `file://${response.path()}`
          : response.path();
      console.log(imagePath);
      setImage(imagePath);
      setBlobImage(imagePath);
      await uploadImageFromCache(imagePath, data.inputs);
      return imagePath;
    } catch (e) {
      console.log(e);
      continue;
    }
  }
  setLoading(false);
  throw new Error(error);
};

export async function gpt2(data) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf',
      data,
      {
        headers: {Authorization: 'Bearer ' + HUGGING_API_KEY},
      },
    );
    console.log('response is', response.data);

    return response.data[0].generated_text;
  } catch (error) {
    console.error('An error occurred while querying the API:', error);
    // throw error;
    return 'Conversation...';
  }
}
