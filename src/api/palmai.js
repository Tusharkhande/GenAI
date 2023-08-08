import axios from 'axios';

export async function palmApiCall(prompt) {
  const PALM_API_KEY = 'AIzaSyB15rqBOgUaZicPMfNMwS-DgT2cDf8M_Qo'; // Replace this with your actual API key
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText';

  const requestBody = {
    "prompt": {
      "text": {prompt}
    },
    "temperature": 0.1,
    "candidateCount": 1
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      key: PALM_API_KEY,
    },
  };

  try {
    const response = await axios.post(apiUrl, requestBody, config);
    const candidates = response.data.candidates;
    candidates.forEach((candidate, index) => {
      console.log(`Candidate ${index + 1}: ${candidate.output}`);
      // let answer = candidate.output;
      // messages.push({ role: 'assistant', content: answer.trim() });
      // console.log('got palm response', answer);
      // return Promise.resolve({ success: true, data: messages });
    });
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error Response:', error.response.data);
      // messages.push({ role: 'assistant', content: error.trim() });
      // return Promise.resolve({ success: true, data: messages});
    } else {
      console.error('Error:', error.message);
      // messages.push({ role: 'assistant', content: error.trim() });
      // return Promise.resolve({ success: true, data: messages});
    }
  }
}

palmApiCall();


async function palmApiCall(prompt, messages) {
  const PALM_API_KEY = 'AIzaSyB15rqBOgUaZicPMfNMwS-DgT2cDf8M_Qo'; // Replace this with your actual API key
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText';

  const requestBody = {
    "prompt": {
      "text": prompt
    },
    "temperature": 0.1,
    "candidateCount": 1
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      key: PALM_API_KEY,
    },
  };

  try {
    const response = await axios.post(apiUrl, requestBody, config);
    const candidates = response.data.candidates;
    candidates.forEach((candidate, index) => {
      console.log(`Candidate ${index + 1}: ${candidate.output}`);
      let answer = candidate.output;
      messages.push({ role: 'assistant', content: answer});
      console.log('got palm response', answer);
      return Promise.resolve({ success: true, data: messages });
    });
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error Response:', error.response.data);
      messages.push({ role: 'assistant', content: error });
      return Promise.resolve({ success: true, data: messages});
    } else {
      console.error('Error:', error.message);
      messages.push({ role: 'assistant', content: error });
      return Promise.resolve({ success: true, data: messages});
    }
  }
}

