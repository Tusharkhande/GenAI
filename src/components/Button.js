import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Button({ title, onPress, image, isize, style }) {
  return (
    <TouchableOpacity className={`${style}`} onPress={onPress} style={styles.button}>
      {image && <Image source={image} className={`${isize ? isize : 'w-7 h-7'}`} />}
      <Text style={styles.text}>{title}</Text>
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
  text: {
    color: '#f1f1f1',
    // fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
    alignSelf:'center',
    textAlign: 'center',
  },

});
