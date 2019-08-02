class Ghost {
    constructor(row, col, color) {
        this.x = col * tileset.tileW;
        this.y = row * tileset.tileH;
        this.color = color;
        this.blobDelta = 0;
        this.blobDir = 0.1;
        this.dir = "left";
        this.speed = 2;
        this.path = [];
        this.lastDir = null;
    }

    applyAiPath() {
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

        if (openSpaces.length > 0)
            this.dir = openSpaces[round(random(0, openSpaces.length - 1))];
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

    update() {
        // update feet position displacement
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

        // ghost has reached a new tile's center
        if  ((this.x % tileset.tileW == 0) && (this.y % tileset.tileH == 0)) {
            // if ghost reaches the portal, it should come out the other side
            let row = this.y / tileset.tileH;
            let col = this.x / tileset.tileW;
            if (col == 0 && this.dir == "left") {
                this.x = 640;
                this.y = 288;
                return;
            } else if (col == 20 && this.dir == "right") {
                this.x = 0;
                this.y = 288;
                return;
            }


            this.applyAiPath();

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
