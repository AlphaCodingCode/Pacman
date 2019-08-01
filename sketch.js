// Any global variables can be defined up here
let tileNames = ["brick", "space"];
let tileset;
let worldMap = [];

/*
    Code in the setup function will only be run once at the start of the animation
*/

function preload() {
    tileset = new Tileset("imgs/pacman_tileset.png", 32, 32, tileNames);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    // Update
    // Render
}
