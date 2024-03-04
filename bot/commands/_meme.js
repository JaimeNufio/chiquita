const { createCanvas, loadImage } = require('canvas');
const { createWriteStream } = require('fs');

async function generateMeme(topText, bottomText, imageUrl) {
    try {
        // Load the background image
        const image = await loadImage(imageUrl);

        // Create a canvas
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // Draw the background image
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Set text properties
        ctx.font = 'bold 48px Impact';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';

        // Calculate text size and position
        const maxTextWidth = canvas.width * 0.8;
        const topTextWidth = ctx.measureText(topText).width;
        const bottomTextWidth = ctx.measureText(bottomText).width;
        const textHeight = 60;
        const topTextX = canvas.width / 2;
        const topTextY = textHeight;
        const bottomTextX = canvas.width / 2;
        const bottomTextY = canvas.height - textHeight;

        // Draw top text
        ctx.fillText(topText, topTextX, topTextY, maxTextWidth);

        // Draw bottom text
        ctx.fillText(bottomText, bottomTextX, bottomTextY, maxTextWidth);

        // Save the generated meme
        const out = createWriteStream('meme.png');
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('Meme generated successfully.'));
    } catch (error) {
        console.error('Error generating meme:', error);
    }
}

// Example usage
const imageUrl = 'https://upload.wikimedia.org/wikipedia/en/2/24/Chainsawman.jpg' //'URL_TO_YOUR_IMAGE';
const topText = 'THE QUICK BROWN FOX JUMPED\n OVER THE LAZY DOG';
const bottomText = 'THE QUICK BROWN FOX\n JUMPED OVER THE LAZY DOG';

generateMeme(topText, bottomText, imageUrl);