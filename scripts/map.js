let rooms = [
    new Room('bedroom', 0, 7, 104, 55, true, false, true, [
        new Platform(0, 1, 104),
    ], [
        new Door(102, 2, 1, Orientation.LEFT, false),
    ], []),
    new Room('kitchen', 104, 7, 95, 55, false, true, true, [
        new Platform(0, 1, 95),
    ], [
        new Door(93, 2, 2, Orientation.LEFT, false),
    ]),
    new Room('storefronts', 199, 0, 508, 96, false, true, false, [
        new Platform(0, 5, 508),
        new Platform(23, 35, 62),
        new Platform(327, 20, 23),

        // Obstacle course
        // Trash cans
        new Platform(400, 26, 18),

        // Bottom floor windows
        new Platform(424, 30, 23),
        new Platform(482, 30, 23),

        // Top floor windows
        new Platform(424, 62, 23),
        new Platform(454, 62, 23),
        new Platform(482, 62, 23),

        // Roof
        new Platform(360, 74, 50),
    ], [], [
        new Decoration('bulb', 330, 50, 5, 6, true, function() {
            this.visible = (Math.random() < 0.2);
        }),
    ]),
    new Room('sky', 520, 96, 176, 96, true, false, false, [
        // Main roof landing
        new Platform(100, 5, 76),
        new Platform(100, 35, 76),

        // Distant rooves, bottom to top
        new Platform(53, 44, 37),
        new Platform(25, 66, 47),
        new Platform(74, 77, 33),
    ], []),
];

let player = new Player(5, 20);

let characters = [
    new Person(300, 20, Skins.child),
    new Person(310, 20, Skins.family),
    new Person(320, 20, Skins.grey),
    new Person(330, 20, Skins.hoodie),
    new Person(340, 20, Skins.pigtails),
    new Person(350, 20, Skins.pinkgirl),
    new Person(360, 20, Skins.shifty),
    new Person(370, 20, Skins.sleepy),
];
