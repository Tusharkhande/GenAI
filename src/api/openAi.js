import { HUGGING_API_KEY } from "../constants";
import { apiKey } from "../constants";
import axios from 'axios';
const client = axios.create({
    headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
    }
})

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';

// export const apiCall = async (prompt, messages) => {

//     try {
//         const res = await client.post(chatgptUrl, {
//             model: "gpt-3.5-turbo",
//             messages: [{
//                 role: 'user',
//                 content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`
//             }]
//         });
//         // isArt = res.data?.choices[0]?.message?.content;
//         // isArt = isArt.trim();
//         // if(isArt.toLowerCase().includes('yes')){
//         //     console.log('dalle api call');
//         //     return dalleApiCall(prompt, messages)
//         // }else{
//         //     console.log('chatgpt api call')
//         //     return chatgptApiCall(prompt, messages);
//         // }

//         prompt = prompt.toLowerCase();
//         let isArt = prompt.includes(' create a image') || prompt.includes('create an image') || prompt.includes('sketch') || prompt.includes('generate a image') || prompt.includes('picture') || prompt.includes('drawing');
//         if (isArt) {
//             console.log('dalle api call');
//             return dalleApiCall(prompt, messages)
//         } else {
//             console.log('chatgpt api call')
//             return chatgptApiCall(prompt, messages);
//         }

//     } catch (err) {
//         console.log('error: ', err);
//         return Promise.resolve({ success: false, msg: err.message });
//     }



// }

let error = "Error:Sorry server issue! Wait for a bit and try again";


export const apiCall = async (prompt, messages) => {
    try {
        const res = await client.post(chatgptUrl, {
            model: "gpt-3.5-turbo",
            messages
            // : [
            //     {
            //         role: 'user',
            //         content: `Remember I'm going to call you GenAI or Jarvis. Does this message want to generate an AI picture, image, art, or anything similar? ${prompt}. Simply answer with yes or no.`,
            //     },
            //     ...messages,
            // ],
        });

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
            model: "gpt-3.5-turbo",
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
            prompt,
            n: 1,
            size: "512x512"
        })

        let url = res?.data?.data[0]?.url;
        // console.log('got image url: ',url);
        messages.push({ role: 'assistant', content: url });
        return Promise.resolve({ success: true, data: messages });

    } catch (err) {
        console.log('error: ', err);
        messages.push({ role: 'assistant', content: error.trim() });
        return Promise.resolve({ success: true, data: messages});
    }
}

/* export const huggingFaceApiCall = async (prompt) => {
    try{
        
            // setLoading(true);
        
            const response = await fetch(
              "https://api-inference.huggingface.co/models/prompthero/openjourney",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${HUGGING_API_KEY}`,
                },
                body: JSON.stringify({ inputs: prompt }),
              }
            );
            if (!response.ok) {
                throw new Error("Failed to generate image");
              }
          
              const blob = await response.blob();
              console.log(URL.createObjectURL(blob));
        
    }catch(err){
        console.log('error: ', err);
        // messages.push({ role: 'assistant', content: error.trim() });
        // return Promise.resolve({ success: true, data: messages});
    }
}
 */

