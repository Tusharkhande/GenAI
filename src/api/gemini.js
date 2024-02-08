import axios from 'axios';
// import api from '.';
import {GEMINI_API_KEY} from '@env';

const API_KEY = GEMINI_API_KEY;
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export default geminiApi = async (prompt, setLoading, setMessage) => {
  setLoading(true);
  console.log('API_KEY:', API_KEY);
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

    axios
      .post(endpoint, data, {headers})
      .then(response => {
        console.log(
          'Response from the API: ',
          response.data.candidates[0].content.parts[0].text,
        );
        setMessage(response.data.candidates[0].content.parts[0].text);
        setLoading(false);
    })
    .catch(error => {
        console.error('Error calling the API: ', error);
    });
} catch (e) {
    console.log(e);
}finally{
    setLoading(false);
}

};
