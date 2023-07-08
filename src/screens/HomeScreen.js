import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import Voice from '@react-native-community/voice';

export default function HomeScreen() {
    const [messages, setMessages] = useState(dummyMessages);
    const [recording, setRecording] = useState(false);
    const [speaking, setSpeaking] = useState(false);
    const [result, setResult] = useState("");

    const clear = () => {
        setMessages([]);
    }

    const stopSpeaking = () => {
        setSpeaking(false);
    }

    const speechStartHandler = e => {
        console.log("Speech start handler");
    }
    const speechEndHandler = e => {
        setRecording(false);
        console.log("speech end handler");
    }
    const speechResultsHandler = e => {
        console.log("voice event", e);
        const text = e.value[0];
        setResult(text);
    }
    const speechErrorHandler = e => {
        console.log("speech error", e);

    }

    const startRecording = async () => {
        setRecording(true);
        try {
            await Voice.start('en-GB');
        } catch (e) {
            console.error(e);
        }
    }

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setRecording(false);
        } catch (e) {
            console.error(e);
        }
    }

        console.log("result", result);

    
    
    useEffect(() => {
        //voice handle events
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;
        
        //destroy all listeners
        return () => {
            Voice.removeAllListeners
        };
    }, [])
    
    
    return (
        <View className='flex-1 bg-white'>
            <SafeAreaView className='flex-1 flex mx-5'>
                {/* bot icon */}
                <View className='flex-row justify-center'>
                    <Image source={require('../../assets/images/bot.png')} style={{ height: wp(50), width: wp(50) }} />
                </View>

                {/* features || messages */}

                {
                    messages.length > 0 ? (
                        <View className="space-y-2 flex-1" >
                            <Text className="text-gray-700 font-semibold ml-1" style={{ fontSize: wp(5) }}>
                                Assistant
                            </Text>
                            <View className="bg-neutral-200 p-4 rounded-3xl" style={{ height: hp(58) }}>
                                <ScrollView
                                    bounces={false}
                                    className="space-y-4"
                                    showsVerticalScrollIndicator={false}
                                >
                                    {
                                        messages.map((message, index) => {
                                            if (message.role === 'assistant') {
                                                if (message.content.includes('https')) {
                                                    //ai image
                                                    return (
                                                        <View className="flex-row justify-start" key={index}>
                                                            <View className="bg-blue-500 rounded-2xl p-2 rounded-tl-none" >
                                                                <Image
                                                                    source={{ uri: message.content }}
                                                                    className="rounded-2xl"
                                                                    resizeMode='contain'
                                                                    style={{ height: wp(60), width: wp(60) }} />
                                                            </View>
                                                        </View>
                                                    )

                                                } else {
                                                    //text
                                                    return (
                                                        <View className="bg-blue-500 rounded-xl p-2 rounded-tl-none" style={{ width: wp(70) }}>
                                                            <Text >
                                                                {message.content}
                                                            </Text>
                                                        </View>
                                                    )
                                                }
                                            } else {
                                                //user input
                                                return (
                                                    <View className="flex-row justify-end" key={index}>
                                                        <View className="bg-gray-500 rounded-xl p-2 rounded-tr-none" style={{ width: wp(70) }}>
                                                            <Text >
                                                                {message.content} {result}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                )
                                            }

                                        }
                                        )
                                    }
                                </ScrollView>
                            </View>

                        </View>
                    ) : (
                        <Features />
                    )
                }
                {/* recording clear and stop buttons */}
                <View className="flex justify-center items-center">
                    {
                        recording ? (
                            <TouchableOpacity onPress={stopRecording}>
                                {/* recording stop button */}
                                <Image
                                    className="rounded-full"
                                    source={require("../../assets/images/voiceLoading.gif")}
                                    style={{ width: hp(10), height: hp(10) }}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={startRecording}>
                                {/* recording start button */}
                                <Image
                                    className="rounded-full"
                                    source={require("../../assets/images/recordingIcon.png")}
                                    style={{ width: hp(10), height: hp(10) }}
                                />
                            </TouchableOpacity>
                        )
                    }

                    {
                        messages.length > 0 && (
                            <TouchableOpacity
                                className="bg-neutral-400 rounded-3xl absolute p-2 right-10"
                                onPress={clear}
                            >
                                <Text className="test-white font-semibold">Clear</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        speaking > 0 && (
                            <TouchableOpacity
                                className="bg-red-400 rounded-3xl absolute p-2 right-10"
                                onPress={stopSpeaking}
                            >
                                <Text className="test-white font-semibold">Stop</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}