class Door {
    width = 24;
    height = 40;
    image = getImage('door');

    constructor(x, y, destination, orientation, open) {
        this.x = x;
        this.y = y;
        this.destination = destination;
        this.orientation = orientation;
        this.open = open;
    }
}
