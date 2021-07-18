const Skins = {
    apron: { width: 9, height: 40 },
    child: { width: 9, height: 35 },
    family: { width: 19, height: 40 },
    grey: { width: 12, height: 40 },
    hoodie: { width: 9, height: 40 },
    pigtails: { width: 15, height: 39 },
    pinkgirl: { width: 12, height: 40 },
    shifty: { width: 9, height: 42 },
    sleepy: { width: 10, height: 40 },
};
for (let name in Skins) {
    Skins[name].image = getImage('people/' + name);
}

class Person {
    WALKING_SPEED = 1;
    JUMP_SPEED = 2.5;

    constructor(x, y, skin) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.image = skin.image;
        this.width = skin.width;
        this.height = skin.height;
        this.orientation = Orientation.RIGHT;
    }

    isOnPlatforms(rooms) {
        for (let room of rooms) {
            for (let platform of room.platforms) {
                let platformX = room.x + platform.x;
                let platformY = room.y + platform.y;
                if (
                    (this.x + this.width >= platformX && this.x <= platformX + platform.width)
                    && (platformY >= this.y && this.y > platformY - platform.height)
                ) {
                    this.y = platformY;
                    return true;
                }
            }
        }
        return false;
    }

    avoidDoor(door) {
        if (!door.open) {
            if (this.velocityX > 0 && door.x < this.x + this.width && this.x + this.width < door.x + door.width) {
                this.velocityX = 0;
                this.x = door.x - this.width;
            }
            if (this.velocityX < 0 && door.x < this.x && this.x < door.x + 5) {
                this.velocityX = 0;
                this.x = door.x + 5;
            }
        }
    }

    isOnWalls() {
        const room = this.currentRoom;
        if (!room.leftOpen && this.x < room.x) {
            this.x = room.x;
            if (this.velocityX < 0) this.velocityX = 0;
            return true;
        }
        if (!room.rightOpen && this.x + this.width > room.x + room.width) {
            this.x = room.x + room.width - this.width;
            if (this.velocityX > 0) this.velocityX = 0;
            return true;
        }
        for (let door of doors) {
            this.avoidDoor(door);
        }
        return false;
    }

    tick(rooms) {
        for (let room of rooms) {
            if (room.x < this.x && this.x < room.x + room.width &&
                room.y < this.y + this.height && this.y < room.y + room.width) {

                this.currentRoom = room;
                break;
            }
        }

        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityY += GRAVITY;
        if (this.isOnPlatforms(rooms)) {
            this.velocityY = 0;
        }
        if (this.isOnWalls()) {}
    }

    jump(rooms) {
        if (this.isOnPlatforms(rooms)) {
            this.velocityY = this.JUMP_SPEED;
        }
    }

    draw(ctx) {
        ctx.translate(SCALE * (this.x - viewportX + (this.orientation === Orientation.LEFT ? this.width : 0)),
                      SCALE * (HEIGHT - this.y - this.height - viewportY));
        ctx.scale(this.orientation, 1);
        ctx.drawImage(this.image, 0, 0,
                      SCALE * this.width, SCALE * this.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}

class Player extends Person {
    constructor(x, y) {
        super(x, y, Skins.apron);
    }

    toggleDoor() {
        for (let door of doors) {
            if (Math.abs(door.x - this.x) < door.width) {
                door.open = !door.open;
                if (door.open) {
                    rooms[door.destination].visible = true;
                } else {
                    this.avoidDoor(door);
                }
            }
        }
    }
}
