import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Button({ title, onPress, image, isize, style, textStyle }) {
  return (
    <TouchableOpacity className={`${style}`} onPress={onPress} style={styles.button}>
      {image && <Image source={image} className={`${isize ? isize : 'w-7 h-7'}`} />}
      {title && <Text className={`${textStyle ? textStyle : 'text-center self-center'}`} >{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },

});
