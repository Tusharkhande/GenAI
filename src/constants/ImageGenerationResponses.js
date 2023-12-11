const imageGenResp = [
    "Sure, I'll give it a shot and create the image based on your description.",
    "That sounds interesting! I'll do my best to bring that imaginative image to life.",
    "I'll certainly try my best to create the image you're envisioning. Let's get started!",
    "I appreciate your creativity! I'll try to capture the essence of your idea in the generated image.",
    "I'm up for the challenge! I'll try to create the image that matches your vision.",
    "Absolutely, I find your idea intriguing. I'll do my best to create that unique image for you.",
    "I'm excited to work on this! I'll certainly try my best to generate the image you described.",
    "I love the concept! I'll give it my best shot and try to create that visually appealing image.",
    "I'm on it! I'll try my best to bring your idea to life in the form of an image.",
    "Certainly, I'll try my best to create the image that reflects your imaginative prompt."
];

function getRandomResp(imageGenResp) {
    const randomIndex = Math.floor(Math.random() * imageGenResp.length);
    console.log(imageGenResp[randomIndex]);
    return imageGenResp[randomIndex];
}

// Example usage:
export default getRandomResp(imageGenResp);

