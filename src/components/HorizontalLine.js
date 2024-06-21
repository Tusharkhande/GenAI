import React from 'react';
import {View, Text} from 'react-native';

const HorizontalLine = ({text, colorScheme}) => {
  return (
    <View className='w-full flex-row items-center my-2'>
        <View className='flex-1 h-px bg-slate-950 dark:bg-slate-400' />
        {text && <Text className='px-2 text-lg text-slate-600 dark:text-slate-300'>{text}</Text>}
        <View className='flex-1 h-px bg-slate-950 dark:bg-slate-400' />
      </View>
  )
}

export default HorizontalLine;