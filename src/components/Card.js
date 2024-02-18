import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ imageSource, text, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className='w-40 h-40 rounded-xl overflow-hidden'>
      <Image source={imageSource} className='mx-auto transition-opacity ease-in duration-1000 opacity-80 -z-10 w-full h-full'/>
      <Text style={{color: color}} className={`mx-auto mt-2 ml-2 absolute z-0 text-base font-semibold `}>{text}</Text>
    </TouchableOpacity>
  );
};


export default Card;
