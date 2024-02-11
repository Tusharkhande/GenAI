// import * as React from 'react';
// import { View, useWindowDimensions } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';

// const FirstRoute = () => (
//   <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
// );

// const SecondRoute = () => (
//   <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
// );

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

// export default function TabViewExample() {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = React.useState(0);

//   const [routes] = React.useState([
//     { key: 'first', title: 'First' },
//     { key: 'second', title: 'Second' },
//   ]);

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{ width: layout.width }}
//     />
//   );
// }


// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/openai-community/gpt2",
// 		{
// 			headers: { Authorization: "Bearer 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" },
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	console.log("response is " , result);
// 	return result;
// }
 
// query({"inputs": "Define cloud computing"}).then((response) => {
// 	console.log(JSON.stringify(response));
// });

// import axios from 'axios';
const axios = require('axios');

// async function query(data) {
//     try {
//         const response = await axios.post(
//             "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
//             data, 
//             {
//                 headers: { Authorization: "Bearer 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" },
//                 responseType: 'blob' 
//             }
//         );
//         return response.data; 
//     } catch (error) {
//         console.error("An error occurred while querying the API:", error);
//         throw error; 
//     }
// }

// // Example usage
// query({"inputs": "Astronaut riding a horse"})
//     .then((response) => {
//         // Use image blob
//         console.log(response); // Here you would typically create a URL object and set it as the src for an img element
//     })
//     .catch(error => console.error(error));


async function query(data) {
	try {
	  const response = await axios.post(
		"https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.0",
		JSON.stringify(data),
		{
		  headers: {
			Authorization: "Bearer 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",
			'Content-Type': 'application/json', // Ensure proper content type header is set
		  },
		}
	  );
	  const result = response.data; // axios automatically parses the JSON response
	  return result; // Depending on the API, you might need to adjust this to fit the response format
	} catch (error) {
	  console.error(error);
	  // Handle error appropriately
	  return null; // or throw error, based on your error handling strategy
	}
  }
  
  query({"inputs": "Astronaut riding a horse"}).then((response) => {
	console.log(response)
	// Use image
	// Note: Depending on the response format, you might need to adjust how you access and use the image data
  });