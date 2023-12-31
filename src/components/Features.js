
import { View, Text, Image } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Features({ model }) {
    return (
        <View style={{ height: hp(60) }} className="space-y-4">
            <Text style={{ fontSize: wp(6.5) }} className="font-semibold text-neutral-100">Features</Text>
            {model === "Jarvis" ? (
                <View className="space-y-4">
                    <View className='bg-emerald-200 p-4 rounded-xl space-y-2'>
                        <View className='flex-row items-center space-x-1'>
                            <Image source={require('../../assets/images/chatgptIcon.png')} style={{ height: hp(4), width: hp(4) }} />
                            <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>Jarvis</Text>
                        </View>
                        <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                            I'm powered by the latest Gpt-4 model by OpenAI having the ability to assist you with creative ideas on a wide range of topics.
                        </Text>
                    </View>
                    <View className='bg-emerald-200 p-4 rounded-xl space-y-2'>
                        <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                            Natural Language Processing: Jarvis is built on advanced Natural Language Processing (NLP) techniques, enabling it to understand and respond to human language effectively.
                        </Text>
                    </View>
                    <View className='bg-emerald-200 p-4 rounded-xl space-y-2'>
                        <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                            Instant and Knowledgeable Responses: Jarvis can provide quick and knowledgeable answers to a wide range of questions and queries.
                        </Text>
                    </View>
                    <View className='bg-emerald-200 p-4 rounded-xl space-y-2'>
                        <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                            Multilingual Support: Jarvis supports multiple languages, broadening its accessibility to users around the world.            </Text>
                    </View>
                </View>
            ) : model === "Friday" ? (
                <View className="space-y-4">
                <View className='bg-purple-200 p-4 rounded-xl space-y-2'>
                    <View className='flex-row items-center space-x-1'>
                        <Image source={require('../../assets/images/dalleIcon.png')} style={{ height: hp(4), width: hp(4) }} />
                        <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>Friday</Text>
                    </View>
                    <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                        I'm powered by the latest DALL-E 2.0 image generation model by OpenAI having the ability to generate imaginative and diverse images from textual descriptions.
                    </Text>
                </View>
                <View className='bg-purple-200 p-4 rounded-xl space-y-2'>
                    <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                    Versatility in Imagery: Friday can generate a wide range of images, including scenes, objects, creatures, abstract concepts, and more, making it a versatile tool for artistic expression.
                    </Text>
                </View>
                <View className='bg-purple-200 p-4 rounded-xl space-y-2'>
                    <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                    Natural Language Understanding: Similar to Jarvis (ChatGPT), Friday also demonstrates strong natural language understanding, making the interaction between textual input and visual output more intuitive.
                    </Text>
                </View>
                <View className='bg-purple-200 p-4 rounded-xl space-y-2'>
                    <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                    Fine-Grained Control: Users can provide specific instructions and control over the generated images, enabling precise adjustments to the visual output.
                    </Text>
                </View>
                </View>
            ) : model === "GenAI" ? (
                <View style={{ height: hp(60) }} className="space-y-4">
                    <View className='bg-emerald-200 p-4 rounded-xl space-y-2'>
                        <View className='flex-row items-center space-x-1'>
                            <Image source={require('../../assets/images/chatgptIcon.png')} style={{ height: hp(4), width: hp(4) }} />
                            <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>ChatGPT (Jarvis)</Text>
                        </View>
                        <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                            ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.
                        </Text>
                    </View>
                    <View className='bg-purple-200 p-4 rounded-xl space-y-2'>
                        <View className='flex-row items-center space-x-1'>
                            <Image source={require('../../assets/images/dalleIcon.png')} style={{ height: hp(4), width: hp(4) }} />
                            <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>DALL-E (Friday)</Text>
                        </View>
                        <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                            DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
                        </Text>
                    </View>
                    <View className='bg-cyan-200 p-4 rounded-xl space-y-2'>
                        <View className='flex-row items-center space-x-1'>
                            <Image source={require('../../assets/images/smartAI.png')} style={{ height: hp(4), width: hp(4) }} />
                            <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>GenAI (Jarvis + Friday)</Text>
                        </View>
                        <Text style={{ fontSize: wp(3.8) }} className='text-gray-700 font-medium'>
                            A powerful assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.
                        </Text>
                    </View>
                </View>
            ) : null}
        </View>
    );
}
