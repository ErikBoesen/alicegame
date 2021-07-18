window.onkeydown = function(e) {
    let key = e.keyCode || e.which;

    switch (key) {
        // Up arrow
        case 38:
            player.jump(rooms);
            break;
        // Down arrow
        case 40:
            break;
        // Left arrow
        case 37:
            player.orientation = Orientation.LEFT;
            player.velocityX = player.orientation * player.WALKING_SPEED;
            break;
        // Right arrow
        case 39:
            player.orientation = Orientation.RIGHT;
            player.velocityX = player.orientation * player.WALKING_SPEED;
            break;
        case 32:
            player.toggleDoor();
        default:
            //console.log(key);
            break;
    }
};
window.onkeyup = function(e) {
    let key = e.keyCode || e.which;

    switch (key) {
        // Up arrow
        case 38:
            break;
        // Down arrow
        case 40:
            break;
        // Left arrow
        case 37:
        // Right arrow
        case 39:
            player.velocityX = 0;
            break;
    }
};
