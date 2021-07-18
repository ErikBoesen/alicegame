class Decoration {
    constructor(name, x, y, width, height, visible, update) {
        this.name = name;
        this.image = getImage('decorations/' + name);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = visible;
        this.update = update;
        this.alpha = 1;
    }
}
