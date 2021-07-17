const GRAVITY = -0.1,
      // Higher tolerance allows player to move closer to edge of screen without moving viewport
      PAN_TOLERANCE_X = 0.7,
      PAN_TOLERANCE_Y = 0.6;

let viewportX = 0,
    viewportY = 0;

function tick() {
    // Move player
    player.x += player.velocityX;
    player.y += player.velocityY;
    for (let room of rooms) {
        if (room.x < player.x && player.x < room.x + room.width &&
            room.y < player.y + player.height && player.y < room.y + room.width) {

            currentRoom = room;
            break;
        }
    }
    player.velocityY += GRAVITY;
    if (player.isOnPlatforms(rooms)) {
        player.velocityY = 0;
    }
    if (player.isOnWalls(currentRoom)) {
    }

    // Move viewport if needed
    if (player.velocityX < 0 && (player.x - viewportX < (1 - PAN_TOLERANCE_X) * WIDTH)) {
        viewportX = player.x - (1 - PAN_TOLERANCE_X) * WIDTH;
        if (viewportX < 0) viewportX = 0;
    }
    if (player.velocityX > 0 && (player.x - viewportX > PAN_TOLERANCE_X * WIDTH)) {
        viewportX = player.x - PAN_TOLERANCE_X * WIDTH;
    }

    if (player.velocityY < 0 && (player.y + viewportY < (1 - PAN_TOLERANCE_Y) * HEIGHT)) {
        viewportY = -(player.y - (1 - PAN_TOLERANCE_Y) * HEIGHT);
        if (viewportY > 0) viewportY = 0;
    }
    if (player.velocityY > 0 && (player.y + viewportY > PAN_TOLERANCE_Y * HEIGHT)) {
        viewportY = -(player.y - PAN_TOLERANCE_Y * HEIGHT);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rooms
    for (let room of rooms) {
        if (!room.visible) continue;

        let image = images[room.name];
        ctx.drawImage(image,
                      SCALE * (room.x - viewportX), SCALE * (HEIGHT - room.y - room.height - viewportY),
                      SCALE * room.width, SCALE * room.height);

        // Draw platforms
        if (DEBUG) {
            for (let platform of room.platforms) {
                platformX = room.x + platform.x;
                platformY = room.y + platform.y;
                ctx.fillStyle = '#08c';
                ctx.fillRect(SCALE * (platformX - viewportX), SCALE * (HEIGHT - platformY - viewportY),
                             SCALE * platform.width, SCALE * platform.height);
            }
        }

        // Draw doors
        for (let door of room.doors) {
            if (door.open) {
                doorX = room.x + door.x;
                doorY = room.y + door.y;
                ctx.translate(SCALE * (doorX - viewportX),
                              SCALE * (HEIGHT - doorY - door.height - viewportY));
                ctx.scale(door.orientation, 1);
                ctx.drawImage(images.door, 0, 0,
                              SCALE * door.width, SCALE * door.height);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
    }

    // Draw player
    ctx.translate(SCALE * (player.x - viewportX + (player.orientation === Orientation.LEFT ? player.width : 0)),
                  SCALE * (HEIGHT - player.y - player.height - viewportY));
    ctx.scale(player.orientation, 1);
    ctx.drawImage(images.player, 0, 0,
                  SCALE * player.width, SCALE * player.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function loop() {
    tick();
    draw();
};

loop();
let mainLoop = setInterval(loop, 2);
