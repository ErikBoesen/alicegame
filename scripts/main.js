let canvas = document.getElementById('game');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let ctx = canvas.getContext('2d');

ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageImageSmoothingEnabled = false;

const DEBUG = false;

const SCALE = 6,
      WIDTH = Math.floor(window.innerWidth / SCALE),
      HEIGHT = Math.floor(window.innerHeight / SCALE);
// Higher tolerance allows player to move closer to edge of screen without moving viewport
const GRAVITY = -0.1,
      PAN_TOLERANCE = 0.7;

let viewportX = 0,
    viewportY = 0;

function tick() {
    // Move player
    player.x += player.velocityX;
    player.y += player.velocityY;
    player.velocityY += GRAVITY
    if (player.isOnPlatforms(currentRoom)) {
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
    console.log('Redrawing screen.');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rooms
    for (let room of rooms) {
        if (!room.visible) continue;

        let image = images[room.name];
        if (image.complete && image.naturalWidth !== 0) {
            ctx.drawImage(image,
                          SCALE * (room.x - viewportX), SCALE * (HEIGHT - room.y - room.height - viewportY),
                          SCALE * room.width, SCALE * room.height);
        }
    }

    // Draw platforms
    if (DEBUG) {
        for (let platform of currentRoom.platforms) {
            platformX = currentRoom.x + platform.x;
            platformY = currentRoom.y + platform.y;
            ctx.fillStyle = '#08c';
            ctx.fillRect(SCALE * (platformX - viewportX), SCALE * (HEIGHT - platformY - viewportY),
                         SCALE * platform.width, SCALE * platform.height);
        }
    }

    // Draw doors
    for (let door of currentRoom.doors) {
        if (door.open) {
            doorX = currentRoom.x + door.x;
            doorY = currentRoom.y + door.y;
            ctx.translate(SCALE * (doorX - viewportX), SCALE * (HEIGHT - doorY - viewportY));
            ctx.scale(door.orientation, 1);
            ctx.drawImage(images.door, 0, 0,
                          SCALE * door.width, SCALE * door.height);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
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

loop();
let main_loop = setInterval(loop, 2);

window.onkeydown = function(e) {
    let key = e.keyCode || e.which;

    switch (key) {
        // Up arrow
        case 38:
            if (player.isOnPlatforms(currentRoom)) {
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
