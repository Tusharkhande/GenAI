import axios from 'axios';
import {OPENAI_API_KEY} from '@env';

const apiKey = OPENAI_API_KEY;
const client = axios.create({
    headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
    }
})

// const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const chatgptUrl = 'https://api.pawan.krd/v1/chat/completions';
// const chatCompletionUrl = 'https://api.openai.com/v1/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';
// const imageVarUrl = 'https://api.openai.com/v1/images/variations';

let error = "I'm currently experiencing high demand! Feel free to try again in a few moments.";


export const apiCall = async (prompt, messages) => {
    console.log(messages)
    try {console.log(apiKey)
        // const res = await client.post(chatgptUrl, {
        //     model: "gpt-3.5-turbo",
        //     messages
        //     // : [
        //     //     {
        //     //         role: 'user',
        //     //         content: `Remember I'm going to call you GenAI or Jarvis. Does this message want to generate an AI picture, image, art, or anything similar? ${prompt}. Simply answer with yes or no.`,
        //     //     },
        //     //     ...messages,
        //     // ],
        // });

        prompt = prompt.toLowerCase();
        let isArt = prompt.includes('create a image') || prompt.includes('image') || prompt.includes('create an image') || prompt.includes('sketch') || prompt.includes('generate a image') || prompt.includes('picture') || prompt.includes('drawing');
        if (isArt) {
            console.log('dalle api call');
            return dalleApiCall(prompt, messages);
        } else {
            console.log('chatgpt api call');
            return chatgptApiCall(prompt, messages);
        }
    } catch (err) {
        console.log('error: ', err);
        messages.push({ role: 'assistant', content: error.trim() });
        return Promise.resolve({ success: true, data: messages});
    }
};

export const chatgptApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(chatgptUrl, {
            model: "pai-001-light",
            messages
        })

        let answer = res.data?.choices[0]?.message?.content;
        messages.push({ role: 'assistant', content: answer.trim() });
        // console.log('got chat response', answer);
        return Promise.resolve({ success: true, data: messages });

    } catch (err) {
        console.log('error: ', err);
        messages.push({ role: 'assistant', content: error.trim() });
        return Promise.resolve({ success: true, data: messages});
    }
}

export const dalleApiCall = async (prompt, messages) => {
    try {
        const res = await client.post(dalleUrl, {
            model: "dall-e-2",
            prompt: prompt,
            n: 1,
            size: "512x512"
            // size: "1024x1792",
            // quality: "hd",
        })

        let url = res?.data?.data[0]?.url;
        console.log('got image url: ',url);

        messages.push({ role: 'assistant', content: url });
        return Promise.resolve({ success: true, data: messages });

    } catch (err) {
        console.log('error: ', err);
        messages.push({ role: 'assistant', content: error.trim() });
        return Promise.resolve({ success: true, data: messages});
    }
}

export const chatCompletion = async (prompt) => {
    try{

        const res = await client.post(chatgptUrl, {
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}]

        })

        let answer = res.data?.choices[0]?.message?.content;
        console.log(answer);
        return answer;

    }catch(e){
        console.log("chatcompletion error: " ,e);
    }
}

