import axios from 'axios';
// import api from '.';
import {GEMINI_API_KEY} from '@env';
import { ToastAndroid } from 'react-native';
import { chatCompletion, gpt2 } from './openAi';

const API_KEY = GEMINI_API_KEY;
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export default geminiApi = async (prompt, setIsLoading) => {
  // setIsLoading(true);
  // console.log('API_KEY:', API_KEY);
  let message = '';
  try {
    const data = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await axios.post(endpoint, data, { headers });
    if (response.data && response.data.candidates && response.data.candidates.length > 0 && response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts.length > 0) {
      const message = response.data.candidates[0].content.parts[0].text;
      console.log('Response from the API: ', message);
      return message;
    }
    
    // return axios
    //   .post(endpoint, data, {headers})
    //   .then(response => {
    //     // setMessage(response.data.candidates[0].content.parts[0].text);
    //     // if(response.data){
    //     //   console.log(response.data)
    //     //   message = response.data.candidates[0].content.parts[0].text;
    //     //   console.log(
    //     //     'Response from the API: ',
    //     //     response.data.candidates[0].content.parts[0].text,
    //     //     );
    //     //   return message;
    //     // }else{
    //     //   return null;
    //     // }
    //     if (response.data && response.data.candidates && response.data.candidates.length > 0 && response.data.candidates[0].content && response.data.candidates[0].content.parts && response.data.candidates[0].content.parts.length > 0) {
    //       message = response.data.candidates[0].content.parts[0].text;
    //       console.log('Response from the API: ', message);
    //       return message;
    //     } else {
    //       // Handle the case where the expected data structure is not present
    //       console.error('Unexpected response structure: ', response.data);
    //       ToastAndroid.show('Unexpected response from API', ToastAndroid.SHORT);
    //       return null;
    //     }
    // const fallbackMessage = await gpt2({"inputs": "Define cloud computing"});
    // console.log(fallbackMessage)
    // return fallbackMessage;
    
} catch (e) {
  console.error('Error calling the API: ', e);
  ToastAndroid.show('Some Error occurred, trying again...', ToastAndroid.SHORT);
  try {
    const fallbackMessage = await chatCompletion(prompt);
    console.log(fallbackMessage)
    return fallbackMessage;
  } catch (fallbackError) {
    console.error('Fallback error: ', fallbackError);
    ToastAndroid.show('Our Servers are really busy. Please try later.', ToastAndroid.SHORT);
    return null;
  }
}finally{
  // setIsLoading(false);
}

};
