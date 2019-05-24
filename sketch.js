let ship;
let shield;
var alien = [];
var alienPew =[];
var rock = [];
var pew = [];
var particle = [];

var amountOfRocks = 0;
var level = 1;

var points = 0;

var hiscore = 0;

var lives = [];

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
    shield = new Shield();

    //setup lives
    for (var n = 0; n <= ship.lives - 1; n++) {
        lives.push(new Ship());
    }

    //create initial rocks
    rockInit();

    //alien every x sec
    setInterval(function(){
        alien.push(new Alien());
    }, 30000);

}

function draw() {

    if (points % 5000 === 0 && points !== 0){
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
        if (int(dist(ship.pos.x, ship.pos.y, rock[j].pos.x, rock[j].pos.y)) <= rock[j].r + 5){
            if (ship.shield !== true){
                explode(ship.pos.x, ship.pos.y, 50);
                ship.die();
            }
        }

        //update the pews
        for (var i = pew.length - 1; i >= 0; i--) {

            //if pew hits a rock, destroy rock, destroy pew, create 10 particles for explosion animation
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
    }
    //show the pew
    for (var y = pew.length - 1; y >= 0; y--) {
        pew[y].show();
        pew[y].update();
        if (pew[y].edges() === true){
            pew.shift(pew[y])
        }
    }
    //show the explosion
    for (var z = particle.length - 1; z >= 0; z--) {
        particle[z].update();
        particle[z].show();
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
            alienPew.shift(pew[y])
        }

    }

    //what happens at the end of the level
    if (rock.length === 0){

        ship.pos.x = width/2;
        ship.pos.y = height/2;

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


//explode the particles upon impact, delete them after 5 sec
function explode(x, y, size){
    for(var n = 0; n <= size; n++) {
        particle.push(new Particle(x, y));
        setTimeout(function(){particle.shift(particle[n])}, 5000)
    }
}

//recursively find random position for rock to make sure it does not spawn on the ship
function randomRockPos(range, excludeLow, excludeHigh){
    this.randomPos =  Math.floor(Math.random() * range);
    console.log(this.randomPos);
    if (this.randomPos < excludeLow || this.random > excludeHigh){
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

//shoot the gun, ya turkey
function keyPressed() {
    if (keyCode === 32){
        pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle)));
    }
}