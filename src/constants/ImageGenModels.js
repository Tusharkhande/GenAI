import cyberpunk from '../../assets/images/imageModels/cyberpunk.jpg';
import anime from '../../assets/images/imageModels/anime.jpg';
import popArt from '../../assets/images/imageModels/pop.jpg';
import toyart from '../../assets/images/imageModels/toyart.jpg';
import timeTravel from '../../assets/images/imageModels/timetravel.jpg';
import miniature from '../../assets/images/imageModels/miniature.jpg';
import petunderlens from '../../assets/images/imageModels/petunderlens.jpg';
import modernArch from '../../assets/images/imageModels/modernarch.jpg';
import imageGen from '../../assets/images/friday.jpeg';
import painter from '../../assets/images/imageModels/painter.jpg';
import mystic from '../../assets/images/imageModels/mystic.jpg';

export default imageModels=[
    {
        id:1,
        name:"Explore Image Gen Models",
        image:imageGen,
        color:'#070F6C',
        demo:'a funny cat wearing sunglasses',
        desc:'Explore different models to generate images with specific descriptions.',
        models:['stabilityai/stable-diffusion-xl-base-1.0', 'kviai/Paint-Diffuion-V2', 'dataautogpt3/ProteusV0.2','playgroundai/playground-v2-512px-base','playgroundai/playground-v2-256px-base','playgroundai/playground-v1', 'playgroundai/playground-v2-1024px-aesthetic', 'dataautogpt3/OpenDalleV1.1','tensorrt/stable-diffusion-2-1', 'cagliostrolab/animagine-xl-3.0','stablediffusionapi/juggernaut-xl-v8', 'Norod78/SDXL-Fairy-Form-LoRA', 'joachimsallstrom/aether-glitch-lora-for-sdxl', 'deepghs/animefull-latest', 'runwayml/stable-diffusion-v1-5', 'briaai/BRIA-2.2'],
        options: []
    },
    {
        id:2,
        name:'Cyberpunk Avatars',
        image:cyberpunk,
        color:'#39FF14',
        demo:'a funny cat wearing sunglasses',
        desc:'Design futuristic, edgy avatars in the Cyberpunk Genre',
        models:['stablediffusionapi/juggernaut-xl-v8'],
        options: []
    },
    {
        id:3,
        name:'Mystical Beings',
        image:mystic,
        color:'#070F6C',
        demo:'a cat dragon',
        desc:'Bring your fantasy to life!',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
        options: []
    },
    {
        id:4,
        name:'Anime Avatars',
        image:anime,
        color:'#ffd',
        demo:'Monkey D. Luffy from One Piece',
        desc:'Create anime avatars using detailed descriptions',
        models: ['cagliostrolab/animagine-xl-3.0'],
        options: []
    },
    {
        id:5,
        name:'3D Toy Art',
        image:toyart,
        color:'#000',
        demo:'boy in diwali',
        desc:'Generate 3D art toys based on specific descriptions',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
        options: []
    },
    {
        id:6,
        name:'Time Travel',
        image:timeTravel,
        color:'#ffd',
        demo:'a beautiful queen',
        desc:'Create pictures in different time periods',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
        options: ['Stone Age', 'Ancient Rome', 'Middle Ages', 'Renaissance', 'Industrial Revolution', '1960s', 'Modern Era', 'Cyberpunk']
    },
    {
        id:7,
        name:'Painter',
        image:painter,
        color:'#000',
        demo:'a bike racing on a tree-ring bread',
        desc:'Create photos in the style of famous painters like Van Gogh, Picasso, and more.',
        models: ['kviai/Paint-Diffuion-V2'],
        options: []
    },
    {
        id:8,
        name:'Miniature paintings',
        image:miniature,
        color:'#FFFFE0',
        demo:'a bike racing on a tree-ring bread',
        desc:'Create photos in miniature photography',
        models: ['stabilityai/stable-diffusion-xl-base-1.0'],
        options: []
    },
    {
        id:9,
        name:'Pet under fisheye lens',
        image:petunderlens,
        color:'#ffd',
        demo:'a curious cat',
        desc:'Create photos of pets under a fisheye lens',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
        options: []
    },
    {
        id:10,
        name:'Pop Art',
        image:popArt,
        color:'#fff',
        demo:'a dog',
        desc:'Produce pop-art masterpieces in the style of Andy Warhol',
        models: ['stabilityai/stable-diffusion-xl-base-1.0'],
        options: []
    },
    
    // {
    //     id:10,
    //     name:'Pet under fisheye lens',
    //     image:petunderlens,
    //     demo:'a bike racing on a tree-ring bread',
    //     desc:'Create photos in miniature photography',
    // },
    // {
    //     id:11,
    //     name:'Pet under fisheye lens',
    //     image:petunderlens,
    //     demo:'a bike racing on a tree-ring bread',
    //     desc:'Create photos in miniature photography',
    // },
    // {
    //     id:12,
    //     name:'Pet under fisheye lens',
    //     image:petunderlens,
    //     demo:'a bike racing on a tree-ring bread',
    //     desc:'Create photos in miniature photography',
    // },
]