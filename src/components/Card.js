import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ imageSource, text, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className='w-40 h-40 rounded-xl overflow-hidden'>
      <Image source={imageSource} style={styles.image} className='mx-auto transition-opacity ease-in duration-1000 opacity-100 -z-10 w-full h-full'/>
      <Text className={`mx-auto mt-2 ml-2 absolute text-base font-semibold ${color}`}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150, 
    height: 150, 
    borderRadius: 10,
    overflow: 'hidden', 
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22, 
    shadowRadius: 2.22, 
    elevation: 3, 
  },
});

export default Card;
