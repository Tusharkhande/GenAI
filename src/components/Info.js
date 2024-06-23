import { View, Text, TouchableOpacity, Image } from 'react-native';

const Info = ({navigation, colorScheme, theme}) => {

    return (
        <View className='flex justify-center bg-slate-50 dark:bg-slate-950 w-80 self-end'>
            <TouchableOpacity className='flex flex-row gap-0 rounded-md bg-slate-200 dark:bg-slate-900 w-80 m-2 ml-0 mr-0 p-2' onPress={() => navigation.navigate('About')}>
                <Image  source={require('../../assets/images/about.png')} className='self-center w-5 h-5 mr-1' />
                <Text className='self-center text-slate-900 dark:text-slate-200' >About</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row gap-0 rounded-md bg-slate-200 dark:bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={() => navigation.navigate('Documentation')}>
                <Image style={colorScheme=='light' ? theme.light : theme.dark} source={require('../../assets/images/documentation.png')} className='self-center w-5 h-5 mr-1' />
                <Text className='self-center text-slate-900 dark:text-slate-200'>Documentation</Text>
            </TouchableOpacity>
        </View>
    );
};



export default Info;