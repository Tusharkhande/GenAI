import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Card = ({ 
  imageSource, 
  text, 
  color, 
  onPress, 
  textStyle, 
  variant = 'default',
  truncate = true,
  truncateLength = 35,
  opacity
}) => {
  const [imageLoading, setImageLoading] = React.useState(true);

  const isUrl = (source) => {
    return typeof source === 'string' && (source.startsWith('http://') || source.startsWith('https://'));
  };

  const truncateText = (text, no) => {
    if (truncate && typeof text === 'string' && text.length > 0) {
      if (text.length > no) {
        return text.slice(0, no) + '...';
      } else {
        return text;
      }
    } else {
      return text;
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      className={`rounded-xl border-2 border-slate-900 dark:border-slate-200 overflow-hidden ${
        variant === 'default' ? 'w-40 h-40' : 'w-40 h-32 justify-center bg-slate-300 dark:bg-slate-900'
      }`}>
        <Image 
          source={isUrl(imageSource)? { uri: imageSource } : imageSource} 
          onLoad={() => setImageLoading(false)} 
          className={`mx-auto transition-opacity ease-in duration-1000 ${opacity ? opacity : 'opacity-90'} -z-10 ${
            variant === 'default' ? 'w-full h-full' : 'w-12 h-12'
          }`} 
        />
      {imageLoading && variant === 'default' && (
        <Image
          source={require('../../assets/images/placeholder2.png')}
          className="absolute rounded-2xl self-start mr-4 w-full h-full"
          resizeMode="contain"
        />
      )}
      <Text 
        style={color? { color: color } : {}} 
        className={`mt-2 ml-2 text-sm ${textStyle}  font-semibold ${
          variant == 'textCard' ? 'text-slate-900 dark:text-slate-300' : ` absolute opacity-100 mx-auto ml-2 mr-1`
        }`}>
        {truncateText(text, truncateLength)}
      </Text>
    </TouchableOpacity>
  );
};

export default Card;
