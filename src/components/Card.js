import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Card = ({ imageSource, text, color, onPress, textStyle }) => {
  const [imageLoading, setImageLoading] = React.useState(true);

  const isUrl = (source) => {
    return typeof source === 'string' && (source.startsWith('http://') || source.startsWith('https://'));
  };

  return (
    <TouchableOpacity onPress={onPress} className='w-40 h-40 rounded-xl overflow-hidden'>
      {isUrl(imageSource) ? (<Image source={{uri : imageSource}} onLoad={() => setImageLoading(false)} className='mx-auto transition-opacity ease-in duration-1000 opacity-90 -z-10 w-full h-full'/>)
      : (<Image source={imageSource} onLoad={() => setImageLoading(false)} className='mx-auto transition-opacity ease-in duration-1000 opacity-90 -z-10 w-full h-full'/>)}
      {imageLoading && (
        <Image
        source={require('../../assets/images/loading3.gif')}
        className="absolute rounded-2xl self-start mr-4 w-full h-full"
        resizeMode="contain"
      />      
      )}
      <Text style={{color: color}} className={`mx-auto ${textStyle ? textStyle : ' mt-2 ml-2 text-base'} absolute z-0 font-semibold `}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Card;
