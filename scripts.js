let canvas = document.getElementById('game');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext('2d');

ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageImageSmoothingEnabled = false;

const DEBUG = true;

const SCALE = 5;
const WIDTH = Math.floor(window.innerWidth / SCALE),
      HEIGHT = Math.floor(window.innerHeight / SCALE);
// Higher tolerance allows player to move closer to edge of screen without moving viewport
const PAN_TOLERANCE = 0.7;
const G = -0.1;

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
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 5;
    }
}

let rooms = [
    new Room('storefronts', 0, 0, 508, 96),
];
let platforms = [
    new Platform(0, 5, 508),
    new Platform(23, 35, 62),
    new Platform(327, 20, 23),
];

class Player {
    WALKING_SPEED = 1;
    JUMP_SPEED = 2.5;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.width = 9;
        this.height = 40;
        this.orientation = Orientation.RIGHT;
    }

    isOnSurface() {
        for (let platform of platforms) {
            if (
                (this.x + this.width > platform.x && this.x < platform.x + platform.width)
                && (platform.y >= this.y && this.y > platform.y - platform.height)
            ) {
                this.y = platform.y;
                return true;
            }
        }
        return false;
    }
}

let player = new Player(5, 40);

let viewportX = 0;
let viewportY = 0;

function tick() {
    // Move player
    player.x += player.velocityX;
    player.y += player.velocityY;
    player.velocityY += G;
    if (player.isOnSurface()) {
        player.velocityY = 0;
    }
    // Move viewport if needed
    if (player.velocityX < 0 && (player.x - viewportX < (1 - PAN_TOLERANCE) * WIDTH)) {
        viewportX = player.x - (1 - PAN_TOLERANCE) * WIDTH;
        if (viewportX < 0) viewportX = 0;
    }
    if (player.velocityX > 0 && (player.x - viewportX > PAN_TOLERANCE * WIDTH)) {
        viewportX = player.x - PAN_TOLERANCE * WIDTH;
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
                          SCALE * (room.x - viewportX), SCALE * (HEIGHT - room.y - room.height - viewportY),
                          SCALE * room.width, SCALE * room.height);
        }
    }

    // Draw platforms
    if (DEBUG) {
        for (let platform of platforms) {
            ctx.fillStyle = '#08c';
            ctx.fillRect(SCALE * (platform.x - viewportX), SCALE * (HEIGHT - platform.y - viewportY),
                         SCALE * platform.width, SCALE * platform.height);
        }
    }

    // Draw player
    ctx.translate(SCALE * (player.x + player.width - viewportX), SCALE * (HEIGHT - player.y - player.height - viewportY));
    ctx.scale(player.orientation, 1);
    ctx.drawImage(images.player, 0, 0,
                  SCALE * player.width, SCALE * player.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
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
let main_loop = setInterval(loop, 2);
