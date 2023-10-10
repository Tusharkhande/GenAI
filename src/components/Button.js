import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Button({ title, onPress, image, isize }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {image && <Image source={image} className={`${isize ? isize : 'w-8 h-8'}`} />}
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
  image: {
    width: 30,
    height: 30,
    // marginLeft: 15,
    // justifyContent: 'center'
    // padding: 20
  },

});
