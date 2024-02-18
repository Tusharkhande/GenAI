import rewrite from '../../assets/images/writeModels/rewrite.png';
import quote from '../../assets/images/writeModels/quote.png';
import insta from '../../assets/images/writeModels/insta.png';
import author from '../../assets/images/writeModels/author.png';
import yt from '../../assets/images/writeModels/yt.png';
import idea from '../../assets/images/writeModels/idea.png';
import slogan from '../../assets/images/writeModels/slogan.png';
import x from '../../assets/images/writeModels/x.png';
import pg from '../../assets/images/writeModels/pg.png';
import gemini from '../../assets/images/writeModels/gemini.png';
import code from '../../assets/images/writeModels/code.png';

export default writingModels=[
    {
        id:1,
        name:"Explore Google's Gemini!",
        image:gemini,
        options:[],
        optionsDesc:'',
        demo:'What do cats dream about?',
        textInputDesc:'Ask me anything...',
        desc:"Explore the capabilities of Google's Gemini...",
        p1:"",
        p2:""
    },
    {
        id:2,
        name:'Code Generator',
        image:code,
        options:['Java', 'C', 'C++', 'Python', 'JavaScript', 'C#', 'Ruby', 'Swift', 'Go', 'Rust', 'Kotlin'],
        optionsDesc:'Select your preferred programming language',
        demo:'Implement addFirst function of LinkedList',
        textInputDesc:'The code you want to generate is',
        desc:'Generate code in your preferred programming language',
        p1:"For the following problem statement, please write a ",
        p2:"code. The problem statement is: "
    },
    {
        id:3,
        name:'Rewrite text into another genre',
        image:rewrite,
        options:['a novel', 'a poem', 'an academic essay', 'an email', 'a work report', 'a speech', 'a blog post'],
        optionsDesc:'Your role is to rewrite this text into',
        demo:'Social media is a popular platform for sharing information and connecting with others. It is a great way to... ',
        textInputDesc:'The content you want to rewrite is',
        desc:'Design futuristic, edgy avatars in the Cyberpunk Genre',
        p1:"Please act as a rewrite expert in different writing genres. Your role is to rewrite my content into the a",
        p2:" genre. Remember to maintain the original meaning. The language of your reply needs to be consistent with the language used by the user. Now, let's start. The content that needs to be rewritten is:"
    },
    {
        id:4,
        name:'Whimsical quotes',
        image:quote,
        options:[],
        optionsDesc:'',
        demo:'courage and bravery',
        textInputDesc:'Generate amusing quotes that revolve around the theme of',
        desc:'Create amusing and inspiring AI-generated quotes',
        p1:"Please generate at least 10 quirky, amusing, and lighthearted quotes that convey the theme of ",
        p2:". These quotes should inspire us to boldness while also bringing a smile to our face!"
    },
    {
        id:5,
        name:'Instagram post captions',
        image:insta,
        options:[],
        optionsDesc:'',
        demo:'My OOTD',
        textInputDesc:'Write a post about',
        desc:'Write instagram post captions in just one click',
        p1:"Compose a captivating Instagram caption for my post featuring ",
        p2:''
    },
    {
        id:6,
        name:'Rewrite text in different tones',
        image:rewrite,
        options:['formal', 'informal', 'optimistic', 'pessimistic', 'humorous', 'conversational', 'persuasive', 'informative', 'critical', 'creative'],
        optionsDesc:'Please rewrite the content into',
        demo:'Om is a detective who solves crimes and today is not going his way. There have been a...',
        textInputDesc:'The content needs to be rewritten is',
        desc:'Rewrite your content in different tones',
        p1:"Please act as a rewriting expert in different tones. Your role is to rewrite my content into the specific tone I have chosen. Remember to maintain the original meaning. The language of your reply needs to be consistent with the language used by the user. Now, let’s start. Please rewrite the content into the ",
        p2:" tone. The content that needs to be rewritten is: "
    },
    {
        id:7,
        name:'Write like a famous author',
        image:author,
        options:[],
        optionsDesc:'',
        demo:'Rabindranath Tagore',
        textInputDesc:'The famous author you want the AI to imitate is',
        desc:'Craft a compellling short story in the style of a renowned author',
        p1:"Write a short story of about one paragraph in the style of ",
    },
    {
        id:8,
        name:'YouTube posts',
        image:yt,
        options:[],
        optionsDesc:'',
        demo:'Bing',
        textInputDesc:'Write a post about',
        desc:'Craft engaging YouTube posts',
        p1:"Compose a YouTube post about the brand ",
    },
    {
        id:9,
        name:'Generate novel ideas',
        image:idea,
        options:['Science Fiction', 'Mystery', 'Romance', 'Young Adult Literature', 'Historical Fiction'],
        optionsDesc:'Novel genre',
        demo:'Time Machine',
        textInputDesc:'This novel is about',
        desc:'Come up with ideas and writing prompts for your next novel',
        p1:"Compose an engaging ",
        p2: " novel. Include a compelling title, concise story summary, and detailed chapter outline. Ensure the narrative showcases the craft of a bestselling author, with vivid characters, an immersive plot, and a masterful storytelling style. The topic for the novel is: "
    },
    {
        id:10,
        name:'Create catchy slogans',
        image:slogan,
        options:[],
        optionsDesc:'',
        demo:'The new ChatGPT',
        textInputDesc:'The brand is',
        desc:'Come up with catchy slogans for your brand or product',
        p1:"Develop 5 tag lines for ",
        p2:" that effectively communicate its mission, while also inspiring others to use and enjoy it. Tag lines should be short and snappy."
    },
    {
        id:11,
        name:'Twitter posts',
        image:x,
        options:[],
        optionsDesc:'',
        demo:'Bitcoin',
        textInputDesc:'Write a post about',
        desc:'Craft compelling Twitter posts in seconds',
        p1:"Compose a compelling Twitter post featuring ",
        p2:" in typical Twitter style that is short and intriguing"
    },
    {
        id:12,
        name:'Prompt Generator',
        image:pg,
        options:[],
        demo:'Create an image of a cat dragon',
        desc:'Create photos in miniature photography',
        p1:"Compose a prompt of about 2 to 3 lines. The prompt should small and precise. The topic for the prompt is: ",
    },
    
]