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
["space", "space", "space", "space", "space", "fruit", "space", "fruit", "brick", "space", "space", "space", "brick", "fruit", "fruit", "fruit", "space", "space", "space", "space", "space"],
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
