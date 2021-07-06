let canvas = document.getElementById('canv');
canvas.height = HEIGHT * SIZE;
canvas.width  = WIDTH * SIZE;
let ctx = canvas.getContext('2d');

const G = -9.8;

const Orientation = {
    LEFT: 0,
    RIGHT: 1,
}

class Player {
    constructor() {
        this.vel_x = 0;
        this.vel_y = 0;
        this.x = 0;
        this.y = 0;
        this.orientation = Orientation.RIGHT;
    }
}
let player = new Player();

function tick() {
    player.vel_y += G;
}
function draw() {
    //ctx.fillStyle = 'rgb(0,' + (255/MAX_GRASS_GROWTH * grass[row][col]) + ',0)';
    //ctx.fillRect(col * SIZE, row * SIZE, SIZE, SIZE);

    // Draw player

}
function loop() {
    tick();
    draw();
}

canvas.onclick = function(e) {
}

window.onkeydown = function(e) {
    let key = e.keyCode || e.which;

    switch (key) {
        // Up arrow
        case 38:
            player.vel_y = 5;
            break;
        // Down arrow
        case 40:
            break;
        default:
            console.log(key);
            break;
    }
}

loop();
let main_loop = setInterval(loop, 1);
