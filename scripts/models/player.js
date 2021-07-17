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

    isOnPlatforms(room) {
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
        return false;
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
        return false;
    }

    toggleDoor(room) {
        for (let door of room.doors) {
            if (Math.abs(door.x - this.x) < door.width) {
                console.log(door.open);
                door.open = !door.open;
            }
        }
    }
}
