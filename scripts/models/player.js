class Person {
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

    avoidDoor(room, door) {
        if (!door.open) {
            let doorX = room.x + door.x;
            if (this.velocityX > 0 && doorX < this.x + this.width && this.x + this.width < doorX + door.width) {
                this.velocityX = 0;
                this.x = doorX - this.width;
            }
            if (this.velocityX < 0 && doorX < this.x && this.x < doorX + 5) {
                this.velocityX = 0;
                this.x = doorX + 5;
            }
        }
    }

    isOnWalls(room) {
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
        for (let door of room.doors) {
            this.avoidDoor(room, door);
        }
        return false;
    }
}

class Player extends Person {
    toggleDoor(room) {
        for (let door of room.doors) {
            let doorX = room.x + door.x;
            if (Math.abs(doorX - this.x) < door.width) {
                door.open = !door.open;
                if (door.open) {
                    rooms[door.destination].visible = true;
                } else {
                    this.avoidDoor(room, door);
                }
            }
        }
    }
}
