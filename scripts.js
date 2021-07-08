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
    constructor(name, x, y, size_x, size_y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.size_x = size_x;
        this.size_y = size_y;
    }
}

let rooms = [
    new Room('storefronts', 0, 0, 508, 96),
];

class Player {
    WALKING_SPEED = 3;
    JUMP_SPEED = 5;

    constructor() {
        this.size_x = 9;
        this.size_y = 40;
        this.vel_x = 0;
        this.vel_y = 0;
        this.x = 0;
        this.y = 0;
        this.orientation = Orientation.RIGHT;
    }

    isOnSurface() {
        return (this.y <= 0);
    }
}

let player = new Player();


function tick() {
    // Move player
    player.x += player.vel_x;
    player.y += player.vel_y;
    player.vel_y += G;
    if (player.isOnSurface()) {
        player.vel_y = 0;
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
                          SCALE * room.x, SCALE * (HEIGHT - room.y - room.size_y),
                          SCALE * room.size_x, SCALE * room.size_y);
        }
    }

    // Draw player
    ctx.drawImage(images.player,
                  SCALE * player.x, SCALE * (HEIGHT - player.y - player.size_y),
                  SCALE * player.size_x, SCALE * player.size_y);
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
                player.vel_y = player.JUMP_SPEED;
            }
            break;
        // Down arrow
        case 40:
            break;
        // Left arrow
        case 37:
            player.orientation = Orientation.LEFT;
            player.vel_x = player.orientation * player.WALKING_SPEED;
            break;
        // Right arrow
        case 39:
            player.orientation = Orientation.RIGHT;
            player.vel_x = player.orientation * player.WALKING_SPEED;
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
            player.vel_x = 0;
            break;
    }
}

loop();
let main_loop = setInterval(loop, 5);
