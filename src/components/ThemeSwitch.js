import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { theme } from '../constants/Theme';
import Button from './Button';


const ThemeSwitch = ({toggleColorScheme, colorScheme}) => {
  return (
    <View className="flex-row items-center justify-center p-4 pt-1 pb-0">
    <Text className="text-xs mr-2 text-gray-800 dark:text-gray-200">
      {colorScheme === 'dark' ? 'Dark Mode' : 'Light Mode'}
    </Text>
    <Button
    image={
        colorScheme === 'dark'
          ? require('../../assets/images/night.png') // Replace with your night image path
          : require('../../assets/images/day.png') // Replace with your day image path
      }
        onPress={toggleColorScheme}
        isize={'w-6 h-6'}
        colorScheme={colorScheme}
    />
  </View>
  )
}

export default ThemeSwitch