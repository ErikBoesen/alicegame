const GRAVITY = -0.1,
      // Higher tolerance allows player to move closer to edge of screen without moving viewport
      PAN_TOLERANCE_X = 0.7,
      PAN_TOLERANCE_Y = 0.6;

let viewportX = 0,
    viewportY = 0;

function tick() {
    for (let room of rooms) {
        for (let decoration of room.decorations) {
            if (decoration.update) decoration.update(ticks);
        }
    }

    for (let character of characters) {
        if (Math.floor(Math.random() * 200) == 0) {
            // TODO: deduplicate this logic
            if (Math.floor(Math.random() * 3) == 0) {
                character.velocityX = Math.random() * 0.5 - 0.25;
                character.orientation = Math.sign(character.velocityX);
            } else {
                character.velocityX = 0;
            }
        }
        if (Math.floor(Math.random() * 600) == 0) {
            character.jump(rooms);
        }
        character.tick(rooms);
    }
    // Move player
    player.tick(rooms);

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

        ctx.drawImage(room.image,
                      SCALE * (room.x - viewportX), SCALE * (HEIGHT - room.y - room.height - viewportY),
                      SCALE * room.width, SCALE * room.height);

        // Draw platforms
        if (DEBUG) {
            for (let platform of room.platforms) {
                let platformX = room.x + platform.x;
                let platformY = room.y + platform.y;
                ctx.fillStyle = '#08c';
                ctx.fillRect(SCALE * (platformX - viewportX), SCALE * (HEIGHT - platformY - viewportY),
                             SCALE * platform.width, SCALE * platform.height);
            }
        }

        for (let decoration of room.decorations) {
            if (!decoration.visible) continue;

            let decorationX = room.x + decoration.x;
            let decorationY = room.y + decoration.y;
            ctx.globalAlpha = decoration.alpha;
            ctx.drawImage(decoration.image,
                          SCALE * (decorationX - viewportX), SCALE * (HEIGHT - decorationY - viewportY),
                          SCALE * decoration.width, SCALE * decoration.height);
            ctx.globalAlpha = 1;
        }

    }

    // Draw doors
    for (let door of doors) {
        if (door.open) {
            ctx.translate(SCALE * (door.x - viewportX),
                          SCALE * (HEIGHT - door.y - door.height - viewportY));
            ctx.scale(door.orientation, 1);
            ctx.drawImage(images.door, 0, 0,
                          SCALE * door.width, SCALE * door.height);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    for (let character of characters) {
        character.draw(ctx);
    }

    // Draw player
    player.draw(ctx);
}

let ticks = 0;
function loop() {
    tick();
    draw();
    ticks++;
};

loop();
let mainLoop = setInterval(loop, 2);
