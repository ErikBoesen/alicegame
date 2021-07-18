const imageNames = [
    'door',
];
function getImage(imageName) {
    let image = new Image();
    image.src = 'images/' + imageName + '.png';
    return image;
}
const images = {};
for (let imageName of imageNames) {
    images[imageName] = getImage(imageName);
}
