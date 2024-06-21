import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default TextCard = ({imageSource, text, color, onPress}) => {
  return (
    // <TouchableOpacity onPress={onPress} className='flex-col justify-center w-40 h-32 rounded-xl bg-slate-700 overflow-hidden'>
    <TouchableOpacity onPress={onPress} className='justify-center w-40 h-32 rounded-xl bg-slate-300 dark:bg-slate-900 overflow-hidden'>
      <Image source={imageSource} className='mx-auto rounded-lg w-12 h-12'/>
      <Text className={` mt-2 ml-2 text-base font-semibold text-slate-900 dark:text-slate-300`}>{text}</Text>
    </TouchableOpacity>
  );
};