import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HorizontalLine = ({text}) => {
  return (
    <View style={styles.horizontalLine}>
        <View style={styles.line} />
        {text && <Text style={styles.contactText}>{text}</Text>}
        <View style={styles.line} />
      </View>
  )
}

const styles = StyleSheet.create({
    
  horizontalLine: {
    width: '100%',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 10, 
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray', 
  },

  contactText: {
    paddingHorizontal: 10, 
    fontSize: 18, 
  },
});

export default HorizontalLine