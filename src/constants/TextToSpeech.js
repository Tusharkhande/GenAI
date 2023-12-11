import Tts from "react-native-tts";
import { useEffect } from "react";

const assistantSpeech = msg => {
    // Tts.getInitStatus().then(() => {
        Tts.setDefaultRate(0.6);
        Tts.speak(msg, {
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 1,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
    // });
};

const startTextToSpeech = message => {
    if (!message.content.includes('https')) {
        Tts.setDefaultRate(0.6);
        // playing response with the voice id and voice speed
        Tts.speak(message.content, {
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 1,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
    }
}

const stop= () => {
    Tts.stop();
}

export { assistantSpeech, startTextToSpeech, stop };