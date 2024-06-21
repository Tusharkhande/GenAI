import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';

export default function Button({ title, onPress, image, isize, style, textStyle, pressAble, colorScheme }) {
  return (
    pressAble ? (
      <Pressable android_ripple={{color:'#fff', borderless: true}} className={`${style ? style : 'flex-row items-center justify-center h-10'}`} onPress={onPress} >
      {image && <Image style={colorScheme && [colorScheme=='light' ? theme &&  theme.light : theme &&  theme.dark]} source={image} className={`${isize ? isize : 'w-7 h-7'}`} />}
      {title && <Text className={`${textStyle ? textStyle : 'text-center self-center'}`} >{title}</Text>}
    </Pressable>
    ) : (
      <TouchableOpacity className={`flex-row items-center justify-center h-10 ${style ? style : ''}`} onPress={onPress} >
      {image && <Image style={colorScheme && [colorScheme=='light' ? theme &&  theme.light : theme &&  theme.dark]} source={image} className={`${isize ? isize : 'w-7 h-7'}`} />}
      {title && <Text className={`${textStyle ? textStyle : 'text-center self-center'}`} >{title}</Text>}
    </TouchableOpacity>
    )
  );
}

const theme = StyleSheet.create({
  light: {
    tintColor: 'black',
  },
  dark: {
    tintColor: 'white',
  },
});