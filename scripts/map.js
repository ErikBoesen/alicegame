let rooms = [
    new Room('bedroom', 0, 7, 104, 55, true, false, true, [
        new Platform(0, 0, 104),
    ], [
        new Door(102, 2, 1, Orientation.LEFT, false),
    ], []),
    new Room('kitchen', 104, 7, 95, 55, false, true, true, [
        new Platform(0, 0, 95),
    ], [
        new Door(93, 2, 2, Orientation.LEFT, false),
    ]),
    new Room('storefronts', 199, 0, 508, 96, false, false, true, [
        new Platform(0, 5, 508),
        new Platform(23, 35, 62),
        new Platform(327, 20, 23),
    ], []),
    new Room('sky', 297, 0, 175, 96, true, false, false, [
        new Platform(100, 5, 76),
    ], []),
];
let currentRoom = rooms[0];

let player = new Player(5, 20);
