import axios from 'axios';
import {STABILITY_API_KEY, HUGGING_API_KEY} from '@env';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const apiKey = STABILITY_API_KEY;
export default generateImage = async (
  para,
  setLoading,
  setImage,
  setBase64Image,
) => {
  console.log('API_KEY:', apiKey);
  setLoading(true);
  try {
    if (!apiKey) {
      throw new Error('Missing Stability API key.');
    }

    const response = await axios.post(
      `https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image`,
      {
        text_prompts: [
          {
            text: para,
          },
        ],
        cfg_scale: 7,
        height: 512,
        width: 512,
        steps: 30,
        samples: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    setImage(`data:image/png;base64,${response.data.artifacts[0].base64}`);
    setBase64Image(response.data.artifacts[0].base64);
  } catch (error) {
    console.error('Error generating image:', error.message);
  }
  setLoading(false);
};


export const stableDiffusionXL = async (data, setLoading, setImage, setBlobImage, blobImage) => {
  setLoading(true);
  try {
    // const cacheDirPath = RNFetchBlob.fs.dirs.CacheDir;
    // console.log("cacheDirPath", cacheDirPath);
    if(blobImage.length>0){
      await RNFetchBlob.fs.unlink(blobImage).then(() => {
        console.log("Cache cleaned successfully!");
      })
    }
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch(
      'POST',
      // 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-bOase-1.0',
      // 'https://api-inference.huggingface.co/models/kviai/Paint-Diffuion-V2', 
      // 'https://api-inference.huggingface.co/models/h94/IP-Adapter-FaceID',
      // 'https://api-inference.huggingface.co/models/briaai/BRIA-2.2',
      'https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic',
      // 'https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.0',
      {
        Authorization: 'Bearer ' + HUGGING_API_KEY,
      },
      JSON.stringify(data),
    );
    const imagePath =
      Platform.OS === 'android' ? `file://${response.path()}` : response.path();
      console.log(imagePath)
      setImage(imagePath);
      setBlobImage(imagePath);
    return imagePath;
  } catch (error) {
    console.error('Error fetching and saving image:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};
