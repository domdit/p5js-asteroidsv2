let ship;
let alien = [];
let alienPew =[];
let rock = [];
let pew = [];
let dust = [];
let lives = [];
let powerup = [];

let amountOfRocks = 0;
let level = 0;
let points = 0;

let myFont;

function preload() {
    myFont = loadFont('assets/Aethv2.ttf');
}

function setup(){
    createCanvas(900, 600);
    frameRate(60);

    textFont(myFont);
    textSize(25);
    textAlign(CENTER, CENTER);

    ship = new Ship();



    //alien every x sec
    // setInterval(function(){
    //     alien.push(new Alien());
    // }, 30000)

}

function draw() {
    if (ship.dead === true){
        startScreen();
    } else {

        //this needs to be fixed (maybe put points inside ship?)
        if (points % 500 === 0 && points !== 0){
            if (ship.lifelock === false){
                ship.lives++;
                lives.push(new Ship());
            }
            ship.lifelock = true;
        }

        background(22);
        if (lives.length === 0){
            ship.dead = true;
        }
        if (ship.dead !== true) {
            ship.show();
            ship.update();
            ship.edges();

            //controls
            if (keyIsDown(RIGHT_ARROW)){
                ship.rotate(0.1)
            } else if (keyIsDown(LEFT_ARROW)){
                ship.rotate(-0.1)
            }
            if (keyIsDown(UP_ARROW)){
                ship.move();
            }
        }

        //show points
        textSize(25);
        fill(255);
        text(points, 60, 30);

        //calculate position of lifeMarker ships and display them
        for (var l = lives.length - 1; l >= 0; l--){
            lives[l].pos = createVector(25, 60);
            lives[l].shield = false;
            if (lives[l] !== lives[0]){
                lives[l].pos.x = lives[l-1].pos.x + 20;
            }
            lives[l].show();
        }


        //update the rocks
        for (var j = rock.length - 1; j >= 0; j--) {

            //crash the ship if it hits a rock
            if (int(dist(ship.pos.x, ship.pos.y, rock[j].pos.x, rock[j].pos.y)) <= rock[j].r + 7){
                if (ship.shield !== true){
                    explode(ship.pos.x, ship.pos.y, 50);
                    ship.die();
                }
            }

            //update the pews
            for (var i = pew.length - 1; i >= 0; i--) {

                //if pew hits a rock, destroy rock, destroy pew, explosion animation
                if (pew[i] && rock[j]) {
                    if (int(dist(pew[i].pos.x, pew[i].pos.y, rock[j].pos.x, rock[j].pos.y)) <= rock[j].r) {
                        handlePoints(rock[j].p);
                        explode(rock[j].pos.x, rock[j].pos.y, 80);
                        rock[j].break();
                        pew.shift(pew[i]);
                        rock.splice(j, 1);
                    }
                }

                //kill alien ship if it is shot at
                if (pew[i] && alien[0]){
                    if (int(dist(pew[i].pos.x, pew[i].pos.y, alien[0].pos.x, alien[0].pos.y)) <= 50){
                        points += alien[0].p;
                        explode(alien[0].pos.x, alien[0].pos.y, 100);
                        powerup.push(new Powerup(alien[0].pos.x, alien[0].pos.y));
                        pew.shift(pew[i]);
                        alien.shift(alien[0]);

                    }
                }
            }
        }

        //show the rocks
        for (var x = rock.length - 1; x >= 0; x--) {
            rock[x].show();
            rock[x].update();
            rock[x].edges();
        }
        //show the pew
        for (var y = pew.length - 1; y >= 0; y--) {
            pew[y].show();
            pew[y].update();
            if (pew[y].edges() === true){
                pew.splice(y, 1);
            }
        }
        //show the explosion
        for (var z = dust.length - 1; z >= 0; z--) {
            dust[z].update();
            dust[z].show();
            if (ship.shield !== true){
                dust[z].repulsion(ship.pos);
            }
        }

        //show alien ship
        for (var q = alien.length -1; q >= 0; q--){
            alien[q].show();
            alien[q].update();

            //make the alien shoot
            if (frameCount % (175 - level*5) === 0){
                alien[q].fire();
            }

            //pop alien ship if it went off screen
            if (alien[q].pos.x >= width){
                alien.shift(alien[q]);
            }
        }

        //show alien pew
        for (var b = alienPew.length - 1; b >= 0; b--) {
            alienPew[b].show();
            alienPew[b].update();

            //destroy ship if hit by alien missile
            if (int(dist(alienPew[b].pos.x, alienPew[b].pos.y, ship.pos.x, ship.pos.y)) <= ship.r && alienPew.length > 0){
                if (ship.shield !== true){
                    explode(ship.pos.x, ship.pos.y, 25);
                    ship.die();
                }
            }

            //delete pew if goes off edge
            if (alienPew[b].edges() === true){
                alienPew.filter(pew[y])
            }

        }

        //show power up
        for (var u = powerup.length -1; u >= 0; u--){
            powerup[u].show();
            powerup[u].update();
            powerup[u].grab(u);
        }

        startNewLevel();

    }


}

function startNewLevel(){
    if (rock.length === 0 && level !== 0){

        ship.pos.x = width/2;
        ship.pos.y = height/2;

        for (var n = dust.length; n >= 0; n--){
            dust.pop();
        }

        clear();
        background(22);
        fill(255);
        textSize(25);
        text("Great Job", width/2, height/2 - 50);
        text("Get Ready for Level " + (level + 1), width/2, height/2);
        textSize(15);
        text("Press Enter to Begin!", width/2, height/2+50);

        if (keyCode === 13){

            clear();
            amountOfRocks += 2;
            level++;
            rockInit();


        }
    }


}



//explode into dust upon impact, delete them after 5 sec
function explode(x, y, size){
    for(var n = 0; n <= size; n++) {
        dust.push(new Dust(x, y));
        setTimeout(function(){dust.shift(dust[n])}, 5000)
    }
}

//recursively find random position for rock to make sure it does not spawn on the ship
function randomRockPos(range, excludeLow, excludeHigh){
    this.randomPos =  Math.floor(Math.random() * range);
    if (this.randomPos < excludeLow || this.randomPos > excludeHigh){
        return this.randomPos;
    }
    return randomRockPos(range, excludeLow, excludeHigh);
}

//create the rocks
function rockInit(){
    for (var r = rock.length; r <= amountOfRocks; r++){
        rock.push(new Asteroid(randomRockPos(width, 400, 500),
            randomRockPos(height, 250, 350), 'full'))
    }
}

function handlePoints(pointsGained){
    for (var p = 0; p <= pointsGained-1; p++){
        points++;
    }
    ship.lifelock = false;
}

//Controls
function keyPressed() {
    if (keyCode === 32){
        if (ship.powerup === true){

            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle + 0.2)));
            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle)));
            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle - 0.2)));

        } else {
            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle)));
        }
    }
}

function startScreen() {
    clear();
    background(22);
    fill(255);
    textSize(45);
    text('Asteroids', width/2, height/5);
    textSize(35);
    text('Press Enter to Begin!', width/2, height/1.2);

    var rotateShip = new Ship();
    rotateShip.pos = createVector(width/3, height/2);
    rotateShip.r *= 2;

    rotateShip.rotate(0.1);

    rotateShip.update();
    rotateShip.show();



    amountOfRocks = 10;
    rockInit();

    //show the rocks
    for (var x = rock.length - 1; x >= 0; x--) {
        rock[x].show();
        rock[x].update();
        rock[x].edges();
    }

    if (keyCode === 13){
        for (var z = rock.length; z >= 0; z--) {
            rock.pop();
        }

        level++;
        amountOfRocks = 0;
        ship.dead = false;

        //setup lives
        for (var n = 0; n <= ship.lives - 1; n++) {
            lives.push(new Ship());
        }

        //create initial rocks
        rockInit();
    }


}