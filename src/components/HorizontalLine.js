import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HorizontalLine = ({text}) => {
  return (
    <View style={styles.horizontalLine}>
        <View style={styles.line} />
        <Text style={styles.contactText}>{text}</Text>
        <View style={styles.line} />
      </View>
  )
}

const styles = StyleSheet.create({
    
  horizontalLine: {
    width: '100%',
    flexDirection: 'row', // To align text horizontally
    alignItems: 'center', // To center text vertically
    marginVertical: 10, // Adjust as needed
  },

  // Style for the horizontal lines
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray', // You can change the color to match your design
  },

  // Style for the "Contact" text
  contactText: {
    paddingHorizontal: 10, // Add spacing around text
    fontSize: 18, // Adjust the font size as needed
  },
});

export default HorizontalLine