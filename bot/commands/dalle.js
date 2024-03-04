const axios = require('axios');
const fs = require('fs');
const { chatgpt } = require('../../config.json') ?? require(`${process.env.CONFIG_FILE}`)

async function generateImageWithDALLE(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: prompt,
            // model:"dall-e-2",
            size:"1024x1024",
            // quality:'standard',
            n:1
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${chatgpt.APIKey}`
        }
        });

        console.log(response.data.data[0].url)
        const generatedImage = response.data.data[0].url //.choices[0].prompt.split("Image: ")[1].trim();

        // Save the generated image to a local file
        const fileName = 'dalle_generated_image.png';
        const filePath = `./${fileName}`;
        const imageResponse = await axios.get(generatedImage, { responseType: 'stream' });
        imageResponse.data.pipe(fs.createWriteStream(filePath));

        return filePath;
    } catch (error) {
        console.error('Error generating image with DALL-E:', error.response ? error.response.data : error.message);
        return null;
    }
}

// Example usage
const prompt = "Three dogs playing in the snow";
generateImageWithDALLE(prompt)
    .then((filePath) => {
        if (filePath) {
            console.log(`Image generated successfully and saved to ${filePath}`);
        } else {
            console.log("Failed to generate image.");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
