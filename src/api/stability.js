import axios from 'axios';
import {STABILITY_API_KEY} from '@env';

const apiKey = STABILITY_API_KEY;
export default generateImage = async (para, setLoading, setImage, setBase64Image) => {
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