// This script would be run locally to generate icons
// Requires Node.js and 'sharp' package (npm install sharp)

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconSizes = [16, 32, 48, 64, 128, 256, 512];
const sourceIcon = path.join(__dirname, 'source-icon.png');

if (!fs.existsSync(sourceIcon)) {
  console.error('Source icon not found at', sourceIcon);
  process.exit(1);
}

if (!fs.existsSync(path.join(__dirname, '..', 'icons'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'icons'));
}

iconSizes.forEach(size => {
  sharp(sourceIcon)
    .resize(size, size)
    .toFile(path.join(__dirname, '..', 'icons', `icon${size}.png`))
    .then(() => console.log(`Generated icon-${size}.png`))
    .catch(err => console.error(`Error generating icon ${size}:`, err));
});