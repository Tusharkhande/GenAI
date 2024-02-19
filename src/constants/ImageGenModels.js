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
        desc:'Design futuristic, edgy avatars in the Cyberpunk Genre',
        models:['stabilityai/stable-diffusion-xl-base-1.0', 'kviai/Paint-Diffuion-V2', 'dataautogpt3/ProteusV0.2', 'briaai/BRIA-2.2', 'playgroundai/playground-v2-1024px-aesthetic', 'cagliostrolab/animagine-xl-3.0',],
    },
    {
        id:2,
        name:'Cyberpunk Avatars',
        image:cyberpunk,
        color:'#ffd',
        demo:'a funny cat wearing sunglasses',
        desc:'Design futuristic, edgy avatars in the Cyberpunk Genre',
        models:['stabilityai/stable-diffusion-xl-base-1.0'],
    },
    {
        id:3,
        name:'Mystical Beings',
        image:mystic,
        color:'#070F6C',
        demo:'a dog',
        desc:'Produce pop-art masterpieces in the style of Andy Warhol',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
    },
    {
        id:4,
        name:'Anime Avatars',
        image:anime,
        color:'#ffd',
        demo:'Monkey D. Luffy from One Piece',
        desc:'Create anime avatars using detailed descriptions',
        models: ['cagliostrolab/animagine-xl-3.0'],
    },
    {
        id:5,
        name:'3D Toy Art',
        image:toyart,
        color:'#000',
        demo:'boy in diwali',
        desc:'Generate 3D art toys based on specific descriptions',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
    },
    {
        id:6,
        name:'Time Travel',
        image:timeTravel,
        color:'#ffd',
        demo:'a beautiful queen',
        desc:'Create pictures in different time periods',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
    },
    {
        id:7,
        name:'Painter',
        image:painter,
        color:'#000',
        demo:'a bike racing on a tree-ring bread',
        desc:'Create photos in miniature photography',
        models: [],
    },
    {
        id:8,
        name:'Miniature paintings',
        image:miniature,
        color:'#fdd',
        demo:'a bike racing on a tree-ring bread',
        desc:'Create photos in miniature photography',
        models: ['stabilityai/stable-diffusion-xl-base-1.0'],
    },
    {
        id:9,
        name:'Pet under fisheye lens',
        image:petunderlens,
        color:'#000',
        demo:'a curious cat',
        desc:'Create photos of pets under a fisheye lens',
        models: ['playgroundai/playground-v2-1024px-aesthetic'],
    },
    {
        id:10,
        name:'Pop Art',
        image:popArt,
        color:'#fff',
        demo:'a dog',
        desc:'Produce pop-art masterpieces in the style of Andy Warhol',
        models: ['stabilityai/stable-diffusion-xl-base-1.0'],
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