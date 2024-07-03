import Tts from "react-native-tts";

const assistantSpeech = (msg) => {
        Tts.setDefaultRate(0.6);
        Tts.speak(msg, {
            androidParams: {
                KEY_PARAM_PAN: -1,
                KEY_PARAM_VOLUME: 1,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
};

const startTextToSpeech = message => {
    const filteredContent = message.content.replace(/[\*\#`]/g, '');
    if (!message.content.includes('https')) {
        Tts.setDefaultRate(0.6);
        // playing response with the voice id and voice speed
        Tts.speak(filteredContent, {
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