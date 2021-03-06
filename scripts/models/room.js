class Room {
    constructor(name, x, y, width, height, visible, leftOpen, rightOpen, platforms, decorations) {
        this.name = name;
        this.image = getImage('rooms/' + this.name);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = visible;
        this.leftOpen = leftOpen;
        this.rightOpen = rightOpen;
        this.platforms = platforms;
        this.decorations = decorations;
    }
}
