// Any global variables can be defined up here
let tileNames = ["brick", "space"];
let tileset;
let worldMap = [
["space", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "space"],
["space", "brick", "space", "space", "space", "space", "space", "space", "space", "space", "brick", "space", "space", "space", "space", "space", "space", "space", "space", "brick", "space"],
["space", "brick", "space", "brick", "brick", "space", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "space", "brick", "brick", "space", "brick", "space"],
["space", "brick", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "brick", "space"],
["space", "brick", "space", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "space", "brick", "space"],
["space", "brick", "space", "space", "space", "space", "brick", "space", "space", "space", "brick", "space", "space", "space", "brick", "space", "space", "space", "space", "brick", "space"],
["space", "brick", "brick", "brick", "brick", "space", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "space", "brick", "brick", "brick", "brick", "space"],
["space", "space", "space", "space", "brick", "space", "brick", "space", "space", "space", "space", "space", "space", "space", "brick", "space", "brick", "space", "space", "space", "space"],
["brick", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "space", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "brick"],
["space", "space", "space", "space", "space", "space", "space", "space", "brick", "space", "space", "space", "brick", "space", "space", "space", "space", "space", "space", "space", "space"],
["brick", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "brick"],
["space", "space", "space", "space", "brick", "space", "brick", "space", "space", "space", "space", "space", "space", "space", "brick", "space", "brick", "space", "space", "space", "space"],
["space", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "space"],
["space", "brick", "space", "space", "space", "space", "space", "space", "space", "space", "brick", "space", "space", "space", "space", "space", "space", "space", "space", "brick", "space"],
["space", "brick", "space", "brick", "brick", "space", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "space", "brick", "brick", "space", "brick", "space"],
["space", "brick", "space", "space", "brick", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "brick", "space", "space", "brick", "space"],
["space", "brick", "brick", "space", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "space", "brick", "brick", "space"],
["space", "brick", "space", "space", "space", "space", "brick", "space", "space", "space", "brick", "space", "space", "space", "brick", "space", "space", "space", "space", "brick", "space"],
["space", "brick", "space", "brick", "brick", "brick", "brick", "brick", "brick", "space", "brick", "space", "brick", "brick", "brick", "brick", "brick", "brick", "space", "brick", "space"],
["space", "brick", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "brick", "space"],
["space", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "brick", "space"],
];

/*sni
    Code in the setup function will only be run once at the start of the animation
*/

function preload() {
    tileset = new Tileset("imgs/pacman_tileset.png", 32, 32, tileNames);
    tileset.setMap(worldMap);
}

function setup() {
    createCanvas(21 * 32, 21 * 32);
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    // Render
    //tileset.drawTile("brick", width / 2, height / 2);
    //background(0);
    tileset.displayMap();
}

function mouseClicked() {
    tileset.handleClick();
}

function mouseDragged() {
    tileset.handleDrag();
}
