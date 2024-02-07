import axios from 'axios';

const API_KEY = 'AIzaSyAqL2b_DNQmdjR9QryfSIOn6KisBlywDlg';
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export default geminiApi = async (prompt, setLoading, setMessage) => {
  setLoading(true);
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
