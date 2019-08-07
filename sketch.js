// Any global variables can be defined up here
let tileNames = ["brick", "space", "fruit", "berry"];
let tileset;
let gameScore = 0;
let GAMEOVER = false;
let worldMap = [
["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
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
["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
["space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space", "space"],
];

let disallow = ["brick"];

let player;
let ghosts = [];
let blinkyIndex = 0;

function preload() {
    tileset = new Tileset("imgs/pacman_tileset.png", 32, 32, tileNames);
    tileset.setMap(worldMap);
    tileset.initBlockedList(disallow);
}

function setup() {
    createCanvas(21 * 32, 24 * 32);
    player = new Pacman(10, 12);
    ghosts.push(new Blinky(10, 10));
    blinkyIndex = 0;
    ghosts.push(new Pinky(10, 10));
    ghosts.push(new Inky(10, 10));
    ghosts.push(new Clyde(10, 10));
    frameRate(60);
    console.log("fps 60");
}

/*
    The draw function is executed once per frame.
*/
function draw() {
    if (GAMEOVER) {
        // show the gameover screen
        background(0);
        fill(255, 0, 0);
        textSize(40);
        textAlign(CENTER);
        text("GAME OVER!", width / 2, height / 2);
        return;
    }

    // Update
    player.update();
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].update();
    }
    // Render
    //background(0);
    tileset.displayMap();
    player.render();
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].render();
    }

    // text score
    fill(255, 255, 255);
    textSize(30);
    stroke(0);
    text("Score: " + gameScore, 20, height - 20);
    fill(255, 255, 255);
}
