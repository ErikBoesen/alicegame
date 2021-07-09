let canvas = document.getElementById('game');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext('2d');

ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageImageSmoothingEnabled = false;

const SCALE = 5;
const WIDTH = Math.floor(window.innerWidth / SCALE),
      HEIGHT = Math.floor(window.innerHeight / SCALE);

const G = -0.2;

const Orientation = {
    LEFT: -1,
    RIGHT: 1,
};

const imageNames = [
    'player',
    'storefronts',
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

class Room {
    constructor(name, x, y, width, height) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Platform {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
    }
}

class Player {
    WALKING_SPEED = 1;
    JUMP_SPEED = 4;

    constructor() {
        this.width = 9;
        this.height = 40;
        this.velocityX = 0;
        this.velocityY = 0;
        this.x = 0;
        this.y = 0;
        this.orientation = Orientation.RIGHT;
    }

    isOnSurface() {
        return (this.y <= 0);
    }
}

let viewportX = 0;
let viewportY = 0;
let rooms = [
    new Room('storefronts', 0, 0, 508, 96),
];
let platforms = [
    new Platform(0, 2, 508),
]
let player = new Player();


function tick() {
    // Move player
    player.x += player.velocityX;
    player.y += player.velocityY;
    player.velocityY += G;
    if (player.isOnSurface()) {
        player.velocityY = 0;
        player.y = 0;
    }
}
function draw() {
    //ctx.fillStyle = 'rgb(0,' + (255/MAX_GRASS_GROWTH * grass[row][col]) + ',0)';
    //ctx.fillRect(col * SIZE, row * SIZE, SIZE, SIZE);
    console.log('Redrawing screen.');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let room of rooms) {
        let image = images[room.name];
        if (image.complete && image.naturalWidth !== 0) {
            ctx.drawImage(image,
                          SCALE * room.x, SCALE * (HEIGHT - room.y - room.height),
                          SCALE * room.width, SCALE * room.height);
        }
    }

    // Draw player
    ctx.drawImage(images.player,
                  SCALE * player.x, SCALE * (HEIGHT - player.y - player.height),
                  SCALE * player.width, SCALE * player.height);
}
function loop() {
    tick();
    draw();
}

canvas.onclick = function(e) {
}

window.onkeydown = function(e) {
    let key = e.keyCode || e.which;

    switch (key) {
        // Up arrow
        case 38:
            if (player.isOnSurface()) {
                player.velocityY = player.JUMP_SPEED;
            }
            break;
        // Down arrow
        case 40:
            break;
        // Left arrow
        case 37:
            player.orientation = Orientation.LEFT;
            player.velocityX = player.orientation * player.WALKING_SPEED;
            break;
        // Right arrow
        case 39:
            player.orientation = Orientation.RIGHT;
            player.velocityX = player.orientation * player.WALKING_SPEED;
            break;
    }
}
window.onkeyup = function(e) {
    let key = e.keyCode || e.which;

    switch (key) {
        // Up arrow
        case 38:
            break;
        // Down arrow
        case 40:
            break;
        // Left arrow
        case 37:
        // Right arrow
        case 39:
            player.velocityX = 0;
            break;
    }
}

loop();
let main_loop = setInterval(loop, 5);
