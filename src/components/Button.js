import { Text, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';

export default function Button({ title, onPress, image, isize, style, textStyle, pressAble, colorScheme, disabled }) {
  return (
    pressAble ? (
      <Pressable disabled={disabled} android_ripple={{color:colorScheme=='dark' ? '#fff' : '#2473FE', borderless: true}} className={`flex-row items-center justify-center h-10 ${style ? style : ''}`} onPress={onPress} >
      {image && <Image style={colorScheme && [colorScheme=='light' ? theme &&  theme.light : theme &&  theme.dark]} source={image} className={`${isize ? isize : 'w-7 h-7'}`} />}
      {title && <Text className={`text-center self-center text-slate-900 dark:text-slate-200 ${textStyle ? textStyle : ''}`} >{title}</Text>}
    </Pressable>
    ) : (
      <TouchableOpacity className={`flex-row items-center justify-center h-10 ${style ? style : ''}`} onPress={onPress} >
      {image && <Image style={colorScheme && [colorScheme=='light' ? theme &&  theme.light : theme &&  theme.dark]} source={image} className={`${isize ? isize : 'w-7 h-7'}`} />}
      {title && <Text className={`text-center self-center text-slate-900 dark:text-slate-200 ${textStyle ? textStyle : ''}`} >{title}</Text>}
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