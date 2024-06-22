import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Card = ({ imageSource, text, color, onPress, textStyle, colorScheme }) => {
  const [imageLoading, setImageLoading] = React.useState(true);

  const isUrl = (source) => {
    return typeof source === 'string' && (source.startsWith('http://') || source.startsWith('https://'));
  };

  const truncateText = (text, no) => {
    if (typeof text === 'string' && text.length > 0) {
      if (text.length > no) {
        return text.slice(0, no) + '...';
      } else {
        return text;
      }
    } else {
      return '';
    }
  };
  

  return (
    <TouchableOpacity onPress={onPress} className={`w-40 h-40 rounded-xl border-2 border-slate-900 dark:border-slate-200 overflow-hidden`}>
      {isUrl(imageSource) ? (<Image source={{uri : imageSource}} onLoad={() => setImageLoading(false)} className='mx-auto transition-opacity ease-in duration-1000 opacity-90 -z-10 w-full h-full'/>)
      : (<Image source={imageSource} onLoad={() => setImageLoading(false)} className='mx-auto transition-opacity ease-in duration-1000 opacity-90 -z-10 w-full h-full'/>)}
      {imageLoading && (
        <Image
        source={require('../../assets/images/placeholder2.png')}
        className="absolute rounded-2xl self-start mr-4 w-full h-full"
        resizeMode="contain"
      />      
      )}
      <Text style={{color: color}} className={`${textStyle ? textStyle : ' mt-2 ml-2 text-base'} absolute opacity-100 font-semibold mx-auto `}>{truncateText(text, 35)}</Text>
    </TouchableOpacity>
  );
};

export default Card;
