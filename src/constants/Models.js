import bot from '../../assets/images/ai2.png';
import dalle from '../../assets/images/dalle2.png';
import chatgptIcon from '../../assets/images/chatgpt.png';
import vision from '../../assets/images/vision.jpeg';
import friday from '../../assets/images/friday.jpeg';
import jarvis from '../../assets/images/jarvis.jpeg';
import gemini from '../../assets/images/gemini.jpeg';
export default model=[
    {
        id:1,
        name:'Jarvis',
        image:jarvis,
        primary:'#50C878',
        secondary:'black',
        provider:'gpt-3.5-turbo'
    },
    {
        id:3,
        name:'Friday',
        image:friday,
        primary:'#CBC3E3',
        secondary:'black',
        provider:'dalle-2'
    },
    
    {
        id:4,
        name:'Vision',
        image:vision,
        primary:'#fff',
        secondary:'#000',
        provider:'gemini-pro-vision'
    },
    {
        id:5,
        name:'Gemini',
        image:gemini,
        primary:'#2473FE',
        secondary:'#000',
        provider:'gemini-pro'
    },
    {
        id:2,
        name:'GenAI',
        image:bot,
        primary:'#3B96D2',
        secondary:'black',
        provider:'gpt-3.5-turbo, dalle-2'
    },
]