import Tts from "react-native-tts";
import { useEffect } from "react";

const assistantSpeech = msg => {
    Tts.speak(msg, {
        androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
    });
};

const startTextToSpeech = message => {
    if (!message.content.includes('https')) {
        // playing response with the voice id and voice speed
        Tts.speak(message.content, {
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 0.5,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
    }
}

export {assistantSpeech, startTextToSpeech};