import { View, Text, TouchableHighlight } from 'react-native';

const Options = ({optionsLength, optionsDesc, options, selectedOption, setSelectedOption, colorScheme}) => {
  return (
    <View
      className={`flex flex-col  self-start p-5 pt-2 pb-2`}>
      <Text className="font-semibold text-left font-mono mt-1 mb-1 text-sm text-slate-800 dark:text-slate-200">
        {optionsDesc}
      </Text>
      <View className="flex flex-row flex-wrap">
        {options.map((option, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => setSelectedOption(option)}
            //   underlayColor="#DDDDDD"
            className={` flex-grow m-1 p-2 rounded-md border border-indigo-800 ${
                selectedOption === option ? 'bg-indigo-800' : 'bg-slate-500 dark:bg-slate-700'
            }`}>
            <Text
              className={`text-center text-xs ${
                selectedOption === option ? 'text-slate-50' : 'text-slate-50'
              }`}>
              {option.includes('/') ? option.split('/')[1] : option}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
};

export default Options;
