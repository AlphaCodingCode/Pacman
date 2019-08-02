// Any global variables can be defined up here
let tileNames = ["brick", "space", "fruit", "berry"];
let tileset;
let worldMap = [
["space", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "space"],
["space", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "space"],
["space", "brick", "berry", "brick", "brick", "fruit", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "fruit", "brick", "brick", "berry", "brick", "space"],
["space", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "space"],
["space", "brick", "fruit", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "fruit", "brick", "space"],
["space", "brick", "fruit", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "fruit", "brick", "space"],
["space", "brick", "brick", "brick", "brick", "fruit", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "fruit", "brick", "brick", "brick", "brick", "space"],
["space", "space", "space", "space", "brick", "fruit", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "fruit", "brick", "space", "space", "space", "space"],
["brick", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "space", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "brick"],
["space", "space", "space", "space", "space", "fruit", "fruit", "fruit", "brick", "space", "space", "space", "brick", "fruit", "fruit", "fruit", "space", "space", "space", "space", "space"],
["brick", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "brick"],
["space", "space", "space", "space", "brick", "fruit", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "fruit", "brick", "space", "space", "space", "space"],
["space", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "space"],
["space", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "space"],
["space", "brick", "fruit", "brick", "brick", "fruit", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "fruit", "brick", "brick", "fruit", "brick", "space"],
["space", "brick", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "brick", "space"],
["space", "brick", "brick", "fruit", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "fruit", "brick", "brick", "space"],
["space", "brick", "fruit", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "brick", "fruit", "fruit", "fruit", "fruit", "brick", "space"],
["space", "brick", "fruit", "brick", "brick", "brick", "brick", "brick", "brick", "fruit", "brick", "fruit", "brick", "brick", "brick", "brick", "brick", "brick", "fruit", "brick", "space"],
["space", "brick", "berry", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "fruit", "berry", "brick", "space"],
["space", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "space"],
];

let player;
let ghosts = [];

function preload() {
    tileset = new Tileset("imgs/pacman_tileset.png", 32, 32, tileNames);
    tileset.setMap(worldMap);
}

function setup() {
    createCanvas(21 * 32, 21 * 32);
    player = new Pacman(13, 9);
    ghosts.push(new Ghost(13, 6, color(200, 0, 0)));
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    player.update();
    ghosts[0].update();
    // Render
    //background(0);
    tileset.displayMap();
    player.render();
    ghosts[0].render();

}

function mouseClicked() {
    //tileset.handleClick();
    loop();
}

function mouseDragged() {
    //tileset.handleDrag();
}
