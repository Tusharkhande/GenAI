import { View, Text, Linking, TouchableOpacity, Image } from 'react-native';
import { select_beep } from '../constants/Sounds';

const Contact = ({theme, colorScheme}) => {

    const handleMailButtonPress = () => {
        select_beep();
        Linking.openURL('mailto:khandetushar2001@gmail.com');
    };

    const handleWhatsAppButtonPress = () => {
        select_beep();
        Linking.openURL('https://wa.me/919322392593');
    };

    const handleWebsiteButtonPress = () => {
        select_beep();
        Linking.openURL('https://www.google.com/'); 
    };

    return (
        <View className='flex justify-center bg-slate-50 dark:bg-slate-950 w-80 self-end'>
            <TouchableOpacity className='flex flex-row gap-0 rounded-md bg-slate-200 dark:bg-slate-900 w-80 m-2 ml-0 mr-0 p-2' onPress={handleMailButtonPress}>
                <Image style={colorScheme=='light' ? theme.light : theme.dark} source={require('../../assets/images/mail.png')} className='self-center w-5 h-5 mr-1' />
                <Text className='self-center text-slate-900 dark:text-slate-200' >Mail</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row gap-0 rounded-md bg-slate-200 dark:bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={handleWhatsAppButtonPress}>
                <Image style={colorScheme=='light' ? theme.light : theme.dark} source={require('../../assets/images/whatsapp.png')} className='self-center w-5 h-5 mr-1' />
                <Text className='self-center text-slate-900 dark:text-slate-200'>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity className='flex flex-row gap-0 rounded-md bg-slate-200 dark:bg-slate-900 m-2 ml-0 mr-0 p-2' onPress={handleWebsiteButtonPress}>
                <Image style={colorScheme=='light' ? theme.light : theme.dark} source={require('../../assets/images/web.png')} className='self-center w-5 h-5 mr-1' />
                <Text className='self-center text-slate-900 dark:text-slate-200' >Website</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Contact;
