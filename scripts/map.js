let rooms = [
    new Room('bedroom', 0, 7, 104, 55, true, [
        new Platform(0, 0, 104),
    ], [
        new Door(103, 0, 1, Orientation.LEFT),
    ]),
    new Room('kitchen', 104, 7, 95, 55, false, [
        new Platform(0, 0, 95),
    ]),
    new Room('storefronts', 199, 0, 508, 96, false, [
        new Platform(0, 5, 508),
        new Platform(23, 35, 62),
        new Platform(327, 20, 23),
    ]),
];
let currentRoom = rooms[0];

let player = new Player(5, 40);
