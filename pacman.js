class Pacman {
    constructor(col, row) {
        this.dir = "left";
        this.lastDir = this.dir;
        this.x = tileset.tileW * col;
        this.y = tileset.tileH * row;
        this.speed = 2;
        this.mouthTop = 0 * Math.PI;
        this.mouthBot = 2 * Math.PI;
        this.mouthTopInitial = 0;
        this.mouthBotInitial = 0;
        this.mouthOpening = false;
        this.mouthDelay = 0;
        this.mouthSetDir();
    }

    mouthSetDir() {
        if (this.dir == "right") {
            this.mouthTopInitial = 0;
            this.mouthBotInitial = 0;
            this.mouthTop = 0;
            this.mouthBot = 2 * Math.PI;
        } else if (this.dir == "left") {
            this.mouthTopInitial = Math.PI;
            this.mouthBotInitial = Math.PI;
            this.mouthTop = Math.PI;
            this.mouthBot = Math.PI;
        } else if (this.dir == "down") {
            this.mouthTopInitial = Math.PI / 2;
            this.mouthBotInitial = Math.PI / 2;
            this.mouthTop = Math.PI / 2;
            this.mouthBot = 5 * Math.PI / 2;
        } else if (this.dir == "up") {
            this.mouthTopInitial = 3 * Math.PI / 2;
            this.mouthBotInitial = 3 * Math.PI / 2;
            this.mouthTop = 3 * Math.PI / 2;
            this.mouthBot = 7 * Math.PI / 2;
        }
    }

    updateMouth() {
        if (this.mouthDelay <= 0) {
            this.mouthDelay = 5;
        } else {
            this.mouthDelay--;
            return;
        }

        if (this.mouthTop >= this.mouthTopInitial + Math.PI / 4) {
            // dir reverse
            this.mouthOpening = false;
        } else if (this.mouthTop <= 0 + this.mouthBotInitial) {
            this.mouthOpening = true;
        }

        if (!this.mouthOpening) {
            // open mouth
            this.mouthTop -= Math.PI / 8;
            this.mouthBot += Math.PI / 8;
        } else {
            this.mouthTop += Math.PI / 8;
            this.mouthBot -= Math.PI / 8;
        }
    }

    update() {
        // pacman's mouth chomping animation update
        this.updateMouth();

        // log last player input direction
        if (keys[UP_ARROW] || keys[keyW])
            this.lastDir = "up";
        else if (keys[DOWN_ARROW] || keys[keyS])
            this.lastDir = "down";
        else if (keys[LEFT_ARROW] || keys[keyA])
            this.lastDir = "left";
        else if (keys[RIGHT_ARROW] || keys[keyD])
            this.lastDir = "right";

        // change pacman's position based on current direction facing
        if (this.dir == "down") {
            this.y += this.speed;
        } else if (this.dir == "up") {
            this.y -= this.speed;
        } else if (this.dir == "left") {
            this.x -= this.speed;
        } else {
            this.x += this.speed;
        }

        // pacman has reached a new tile's center
        if  ((this.x % tileset.tileW == 0) && (this.y % tileset.tileH == 0)) {

            // change pacman's direction if a new direction was inputted
            if (this.dir != this.lastDir) {
                let tile = this.getTileInDir(this.lastDir);
                if (tile.name != "brick") {
                    this.dir = this.lastDir;
                    // mouth facing direction needs to re-adjust to facing direction
                    this.mouthSetDir();
                    this.speed = 2;
                }
            }

            // pacman should eat berries
            let row = this.y / tileset.tileH;
            let col = this.x / tileset.tileW;
            if (tileset.map[row][col].name == "fruit") {
                tileset.map[row][col].name = "space";
                gameScore += 15;
            } else if (tileset.map[row][col].name == "berry") {
                tileset.map[row][col].name = "space";
                gameScore += 45;
                for (let i = 0; i < ghosts.length; i++) {
                    ghosts[i].vulnerable = true;
                }
            }

            // if pacman reaches the portal, he should come out the other side
            if (col == 0 && this.dir == "left") {
                this.x = 640;
                this.y = 320;
                this.mouthSetDir();
            } else if (col == 20 && this.dir == "right") {
                this.x = 0;
                this.y = 320;
                this.mouthSetDir();
            }

            // check that in the current direction, pacman isn't running into a wall, if he is stop him
            let tile = this.getTileInDir(this.dir);
            if (tile.name != "brick") {
                this.speed = 2;
            } else {
                this.speed = 0;
            }
        }

        // check contact with a ghost
        for (let i = 0; i < ghosts.length; i++) {
            if (dist(this.x, this.y, ghosts[i].x, ghosts[i].y) <= 16) {
                ghosts[i].contactedPacman();
            }
        }
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
        return tileset.map[col][row];
    }

    render() {
        fill(200, 200, 0);
        arc(this.x + 16, this.y + 16, 32, 32, this.mouthTop, this.mouthBot, PIE);
        noFill();
    }
}
