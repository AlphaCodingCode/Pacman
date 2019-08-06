// Any global variables can be defined up here
let tileNames = ["brick", "space", "fruit", "berry"];
let tileset;
let gameScore = 0;
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
}

/*
    The draw function is executed once per frame.
*/
function draw() {
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
    stroke(0);

    // fill(255);
    // rect(18 * tileset.tileW, 2 * tileset.tileH, 32, 32);
    // for (let i = 0; i < ghosts[1].path.length; i++) {
    //     fill(0, 100, 0, 100);
    //     rect(ghosts[1].path[i].x, ghosts[1].path[i].y, 32, 32);
    // }
    // try {
    //     fill(200, 0, 0);
    //     rect(ghosts[1].destTile.x * tileset.tileW, ghosts[1].destTile.y * tileset.tileH, 32, 32);
    // } catch(e) {
    //     console.log("reee");
    // }
    // textAlign(CENTER);
    // textSize(20);
    // let row = round(ghosts[1].y / tileset.tileH);
    // let col = round(ghosts[1].x / tileset.tileW);
    // fill(255);
    // text("(" + tileset.map[row][col].x + "," + tileset.map[row][col].y + ")", ghosts[1].x, ghosts[1].y);
    // noFill();
    // stroke(255, 0, 0);
    // rect(col * tileset.tileW, row * tileset.tileH, 32, 32);
}

let t = false;
function mouseClicked() {
    //tileset.handleClick();
    if (t)
        loop();
    else
        noLoop();
    t = !t;
}

function mouseDragged() {
    //tileset.handleDrag();
}
