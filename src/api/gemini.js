import axios from 'axios';
import {GEMINI_API_KEY} from '@env';

const API_KEY = GEMINI_API_KEY;
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export default geminiApi = async (prompt) => {
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

    const response = await axios.post(endpoint, data, {headers});
    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates.length > 0 &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts.length > 0
    ) {
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
    return "I'm currently experiencing high demand! Feel free to try again in a few moments.";
  } finally {
    // setIsLoading(false);
  }
};


let error = 'I am currently experiencing high demand! Feel free to try again in a few moments.';

export const vision = async (text, imageBase64) => {

  if(!imageBase64){
    error = 'Please select an image to proceed!';
  }
  
  console.log(text)
  try {
    const requestData = {
      contents: [
        {
          parts: [
            {text: text},
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: imageBase64,
              },
            },
          ],
        },
      ],
    };

    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`;

    const response = await axios.post(API_ENDPOINT, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = response.data.candidates[0].content.parts[0].text;
    // messages.push({role: 'assistant', content: res});
    console.log('Response:', response.data.candidates[0].content.parts[0].text);
    return Promise.resolve({success: true, data: res});
  } catch (err) {
    // console.error('Error:', err);
    // messages.push({role: 'assistant', content: error.trim()});
    return Promise.resolve({success: true, data: error});
  }
};


export const geminiChatApiCall = async (inputText, conversationHistory) => {
  console.log(conversationHistory)

  const updatedConversationHistory = [...conversationHistory, {
    role: "user",
    parts: [{text: inputText}]
  }];

  // Prepare the payload with the updated conversation history
  const requestData = {
    contents: [...conversationHistory, {
      role: "user",
      parts: [{text: inputText}]
    }]
  };

  try {
    const response = await axios.post(endpoint, requestData, {
      headers: {'Content-Type': 'application/json'}
    });

    // Process the response to fit your existing message structure
    const modelResponse = response.data.candidates[0].content?.parts[0].text;
    console.log("modelResponse", modelResponse)
    const newMessage = {role: 'assistant', content: modelResponse};

    // Return the new message to be added to the conversation history
    console.log(newMessage);
    return newMessage;
  } catch (error) {
    console.error("Error calling the Gemini API:", error);
    // throw error;
  }
};
