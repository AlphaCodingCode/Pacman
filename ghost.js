class Ghost {
    constructor(col, row, color) {
        this.x = col * tileset.tileW;
        this.y = row * tileset.tileH;
        this.color = color;
        this.blobDelta = 0;
        this.blobDir = 0.1;
        this.dir = "left";
        this.speed = 2;
        this.path = [];
        this.lastDir = null;
        this.mode = "scatter";
        this.possibleModes = ["scatter", "chase", "frightened"];
        this.stateCD = 60 * 3;
    }

    randomPathAI() {
        // if the ghost reached an intersection decide to change direction to a random direction
        let openSpaces = [];
        let dirs = ["up", "down", "left", "right"];
        for (let i = 0; i < dirs.length; i++) {
            let tile = this.getTileInDir(dirs[i]);
            if (tileset.map[tile.r][tile.c].name != "brick")
                openSpaces.push(dirs[i]);
        }

        // get rid of opposite direction from candidates
        if (openSpaces.indexOf(this.reverseDir(this.dir)) != -1)
            openSpaces.splice(openSpaces.indexOf(this.reverseDir(this.dir)), 1);

        if (openSpaces.length > 0) {
            let rand = round(random(0, openSpaces.length - 1));
            this.dir = openSpaces[rand];
            this.path = this.getTileInDir(rand);
        }
    }

    pickPathDir() {
        // get direction of first element of the path
        if (this.path[0].x > this.x) {
            this.dir = "right";
        } else if (this.path[0].x < this.x) {
            this.dir = "left";
        } else if (this.path[0].y > this.y) {
            this.dir = "down";
        } else if (this.path[0].y < this.y) {
            this.dir = "up";
        }
    }

    reverseDir(dir) {
        if (dir == "up")
            return "down";
        if (dir == "down")
            return "up";
        if (dir == "left")
            return "right";
        if (dir == "right")
            return "left";
    }

    getTileInDir(dir) {
        let col = this.x / tileset.tileW;
        let row = this.y / tileset.tileH;
        if (dir == "down") {
            row++;
        } else if (dir == "up") {
            row--;
        } else if (dir == "left") {
            col--;
        } else {
            col++;
        }
        return {c : col, r : row};
    }

    takePortal() {
        // if ghost reaches the portal, it should come out the other side
        let row = this.y / tileset.tileH;
        let col = this.x / tileset.tileW;
        if (col == 0 && this.dir == "left") {
            this.x = 640;
            this.y = 320;
            return true;
        } else if (col == 20 && this.dir == "right") {
            this.x = 0;
            this.y = 320;
            return true;
        }
        return false;
    }

    updateNewTileEntered() {
        if (this.takePortal())
            return;

        // apply the AI path
        this.randomPathAI();
        // check that in the current direction, ghost isn't running into a wall, if he is change dir
        let tile = this.getTileInDir(this.dir);
        if (tileset.map[tile.r][tile.c].name == "brick") {
            this.speed = 2;
            let dirs = ["left", "right", "down", "up"];
            while (true) {
                let index = round(random(0, dirs.length - 1));
                tile = this.getTileInDir(dirs[index]);
                if (tileset.map[tile.r][tile.c].name != "brick") {
                    this.dir = dirs[index];
                    break;
                }
            }
        }
    }

    updateFeetDir() {
        // update feet movement
        if (this.blobDelta < -0.5) {
            this.blobDir = 0.3;
        } else if (this.blobDelta > 1) {
            this.blobDir = -0.3;
        }
        this.blobDelta += this.blobDir;

        // update position based on direction
        if (this.dir == "down") {
            this.y += this.speed;
        } else if (this.dir == "up") {
            this.y -= this.speed;
        } else if (this.dir == "left") {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }
    }

    update() {
        updateFeetDir();
        // ghost has reached a new tile's center
        if  ((this.x % tileset.tileW == 0) && (this.y % tileset.tileH == 0))
            this.updateNewTileEntered();
    }

    render() {
        // body
        fill(this.color);
        arc(this.x + 16, this.y + 22, 24, 38, Math.PI, 0);
        noStroke();
        // feet
        for (let i = 0; i < 3; i++) {
            arc(this.x + 8 + i * 8 + this.blobDelta, this.y + 22, 8, 8, 0, Math.PI);
        }

        // eyes
        fill(255, 255, 255);
        ellipse(this.x + 11, this.y + 12, 8, 8);
        ellipse(this.x + 21, this.y + 12, 8, 8);

        // pupils looking in direction
        fill(0);
        if (this.dir == "left") {
            ellipse(this.x + 9, this.y + 12, 4, 4);
            ellipse(this.x + 19, this.y + 12, 4, 4);
        } else if (this.dir == "right") {
            ellipse(this.x + 13, this.y + 12, 4, 4);
            ellipse(this.x + 23, this.y + 12, 4, 4);
        } else if (this.dir == "up") {
            ellipse(this.x + 11, this.y + 10, 4, 4);
            ellipse(this.x + 21, this.y + 10, 4, 4);
        } else {
            ellipse(this.x + 11, this.y + 14, 4, 4);
            ellipse(this.x + 21, this.y + 14, 4, 4);
        }

        noFill();
        stroke(255, 255, 255);
        rect(this.x, this.y, 32, 32);
    }
}


class Blinky extends Ghost {
    /*
    Blinky(Red) is an aggressive ghost. It follows the player around precisely.
    */

    constructor(col, row) {
        super(col, row, color(200, 0, 0));
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[round(player.y / tileset.tileH)][round(player.x / tileset.tileW)]);
        super.pickPathDir();
    }

    updateNewTileEntered() {
        this.path.splice(0, 1);
        if (super.takePortal())
            return;
    }

    chase() {
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[round(player.y / tileset.tileH)][round(player.x / tileset.tileW)]);
        super.pickPathDir();
        this.updateNewTileEntered();
    }

    update() {
        this.stateCD--;
        super.updateFeetDir();
        if  ((this.x % tileset.tileW == 0) && (this.y % tileset.tileH == 0)) {
            if (this.stateCD <= 0) {
                if (this.mode == "scatter") {
                    this.mode = "chase";
                    this.stateCD = random(2, 6) * 60;

                }
                else if (this.mode == "chase") {
                    this.mode = "scatter";
                    this.stateCD = random(1, 3) * 60;
                }
            }

            // scatter mode blinky aims for the top right
            if (this.mode == "scatter") {
                this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[2][18]);
                if (this.path.length <  1) {
                    // blinky is already there.. what do we do?
                    this.chase();
                }
                super.pickPathDir();
                this.updateNewTileEntered();
            } else if (this.mode == "chase") {
                // blinky follows the player aggressively
                this.chase();
            } else {
                // flee mode just inverts the direction and randomizes ghost pathing
                super.randomPathAI();
            }
        }
    }
}


class Pinky extends Ghost {
    /*
    Pinky is an ambush ghost. It predicts where pacman will be in 2 steps, and then goes there
    */
    constructor(col, row) {
        console.log("pinky an the brain");
        super(col, row, color(255, 168, 223));
        let coord = this.dimensionsInFrontOfPlayer();
        this.r = coord.r;
        this.c = coord.c;
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[round(player.y / tileset.tileH)][round(player.x / tileset.tileW)]);
        super.pickPathDir();
        // if that position 2 tiles ahead is a block, pick a position near it
    }

    dimensionsInFrontOfPlayer() {
        // get pacman's direction and try to get ahead of him
        let col = round(player.x / tileset.tileW);
        let row = round(player.y / tileset.tileH);
        let path;
        if (player.dir == "left") {
            let i = 3;
            col = constrain(col - i, 0, 19);
            // check if this tile is walkable and a path to it exists
            while (true) {
                path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[row][col]);
                if (path.length > 0)
                    break;
                i--;
                col = constrain(col - i, 0, 19);
            }

        } else if (player.dir == "right") {
            let i = 3;
            col = constrain(col + i, 0, 19);
            // check if this tile is walkable and a path to it exists
            while (true) {
                console.log(row, col);
                path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[row][col]);
                if (path.length > 0)
                    break;
                i--;
                col = constrain(col + i, 0, 19);
            }
        } else if (player.dir == "up") {
            let i = 3;
            row = constrain(row - i, 0, 23);
            // check if this tile is walkable and a path to it exists
            while (true) {
                path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[row][col]);
                if (path.length > 0)
                    break;
                i--;
                row = constrain(row - i, 0, 23);
            }
        } else {
            let i = 3;
            row = constrain(row + i, 0, 23);
            // check if this tile is walkable and a path to it exists
            while (true) {
                path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[row][col]);
                if (path.length > 0)
                    break;
                i--;
                row = constrain(row + i, 0, 23);
            }
        }
        return {r : row, c : col};
    }

    updateNewTileEntered() {
        this.path.splice(0, 1);
        if (super.takePortal())
            return;
    }

    chase() {
        let coord = this.dimensionsInFrontOfPlayer();
        this.r = coord.r;
        this.c = coord.c;
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[this.r][this.c]);
        super.pickPathDir();
        this.updateNewTileEntered();
    }

    update() {
        this.stateCD--;
        super.updateFeetDir();
        if  ((this.x % tileset.tileW == 0) && (this.y % tileset.tileH == 0)) {
            if (this.stateCD <= 0) {
                if (this.mode == "scatter") {
                    this.mode = "chase";
                    this.stateCD = random(2, 6) * 60;

                }
                else if (this.mode == "chase") {
                    this.mode = "scatter";
                    this.stateCD = random(1, 3) * 60;
                }
            }

            // scatter mode pinky aims for the top left
            if (this.mode == "scatter") {
                this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[2][2]);
                if (this.path.length <  1) {
                    // pinky is already there.. what do we do?
                    this.chase();
                }
                super.pickPathDir();
                this.updateNewTileEntered();
            } else if (this.mode == "chase") {
                // blinky attempts to abush the player in chase mode
                this.chase();
            } else {
                // flee mode just inverts the direction and randomizes ghost pathing
                super.randomPathAI();
            }

        }
    }
}


class Inky extends Ghost {
    /* Inky is erratic, and takes into account Blinky in it's movements towards pacman */
    constructor(col, row) {
        super(col, row, color(155, 168, 255));
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[19][18]);
        super.pickPathDir();
        this.updateNewTileEntered();
        this.destTile = {x : 0, y : 0};
    }


    updateNewTileEntered() {
        if (this.path.length > 0) {
            this.path.splice(0, 1);
        }
        if (super.takePortal())
            return;
    }

    chase() {
        // inky's path
        // get two tiles ahead of pac-man
        let pTile = createVector(player.x, player.y);
        if (player.dir == "left") {
            pTile.x -= 2;
        } else if (player.dir == "right") {
            pTile.x += 2;
        } else if (player.dir == "up") {
            pTile.y -= 2;
        } else {
            pTile.y += 2;
        }
        // get blinky's position
        let bTile = createVector(ghosts[blinkyIndex].x, ghosts[blinkyIndex].y);
        // get X-y component dists between blinky and tile, double them
        this.destTile = p5.Vector.sub(pTile, bTile);
        //this.destTile.mult(2);
        // convert coords to tile
        this.destTile.x = round(this.destTile.x / tileset.tileW) + round((player.x / tileset.tileW));
        this.destTile.y = round(this.destTile.y / tileset.tileH) + round((player.y / tileset.tileH));
        // check if picked tile is pathable location, if not, go scatter mode for 1 second
        let path = [];
        try {
            // don't want to update if a chase path exists which is valid and this one isn't valid
            path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[this.destTile.y][this.destTile.x]);
        } catch (e) {
            console.log("failed to make a path...");
        }

        if (path.length > 1) {
            this.path = path;
            super.pickPathDir();
        } else {
            this.mode = "scatter";
            // bottom left
            this.path = tileset.shortestPath(tileset.map[this.y / tileset.tileH][this.x / tileset.tileW], tileset.map[19][18]);
            if (this.path.length <= 1) {
                // inky doesn't have a valid path to take. Go to blinky
                this.path = tileset.shortestPath(tileset.map[(this.y / tileset.tileH)][(this.x / tileset.tileW)], tileset.map[round(ghosts[blinkyIndex].y / tileset.tileH)][round(ghosts[blinkyIndex].x / tileset.tileW)]);
            }
            super.pickPathDir();
        }
        this.updateNewTileEntered();
    }

    update() {
        super.updateFeetDir();
        if  ((this.x % tileset.tileW == 0) && (this.y % tileset.tileH == 0)) {
            if (this.path.length > 0) {
                super.pickPathDir();
                this.updateNewTileEntered();
            }
            while (this.path.length < 1) {
                this.chase();
            }
        }
    }
}

class Clyde extends Ghost {
    /*
    Clyde is a ghost which switches between scatter and chase mode based on it's distance to pacman.
    If within 8 tiles, of pacman clyde will enter scatter, else he will be in chase mode identical
    to blinky's chase mode
    */
    constructor(col, row) {
        super(col, row, color(250, 180, 0));
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[19][2]);
        super.pickPathDir();
        this.updateNewTileEntered();
    }

    updateNewTileEntered() {
        this.path.splice(0, 1);
        if (super.takePortal())
            return;
    }

    chase() {
        this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[round(player.y / tileset.tileH)][round(player.x / tileset.tileW)]);
        super.pickPathDir();
        this.updateNewTileEntered();
    }

    update() {
        super.updateFeetDir();
        if  ((this.x % tileset.tileW == 0) && (this.y % tileset.tileH == 0)) {
            // take manhattan distance
            if ((Math.abs(this.x - player.x) + Math.abs(this.y - player.y)) < 8 * 32) {
                this.mode = "scatter";
            } else {
                this.mode = "chase";
            }

            // scatter mode Clyde aims for the bot left
            if (this.mode == "scatter") {
                this.path = tileset.shortestPath(tileset.map[round(this.y / tileset.tileH)][round(this.x / tileset.tileW)], tileset.map[19][2]);
                if (this.path.length <  2) {
                    // blinky is already there.. what do we do?
                    this.chase();
                } else {
                    super.pickPathDir();
                    this.updateNewTileEntered();
                }
            } else if (this.mode == "chase") {
                // blinky follows the player aggressively
                this.chase();
            } else {
                // flee mode just inverts the direction and randomizes ghost pathing
                super.randomPathAI();
            }
        }
    }
}
