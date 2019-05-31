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
let hiscore = 0;

let limiter = 4;

let myFont;
let song;

let songPlayed = false;

let musicToggleText = "Press 'M' to toggle music on and off!";

function preload() {
    soundFormats('mp3');
    song = loadSound('assets/Dominic DiTaranto - Asteroids.mp3');
    myFont = loadFont('assets/Chopsic-K6Dp.ttf');
}

function setup() {
    createCanvas(900, 600);

    frameRate(60);

    textFont(myFont);
    textSize(25);
    textAlign(CENTER, CENTER);

    ship = new Ship();
}

function draw() {

    if (ship.dead === true){
        startScreen();
    } else {

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

        //tell'em about toggle music
        textSize(15);
        text(musicToggleText, width/2, height-50);

        setTimeout(function(){
            musicToggleText = '';
        }, 5000);

        //handle power ups!
        power();

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
                        explode(rock[j].pos.x, rock[j].pos.y, 40);
                        rock[j].break();
                        pew.shift(pew[i]);
                        rock.splice(j, 1);
                    }
                }

                //pew hits alien
                for (var a = alien.length - 1; a >= 0; a--){
                    if (pew[i] && alien[a]){
                        if (int(dist(pew[i].pos.x, pew[i].pos.y, alien[a].pos.x, alien[a].pos.y)) <= 50){
                            handlePoints(alien[a].p);
                            explode(alien[a].pos.x, alien[a].pos.y, 100);
                            getPowerup(a);
                            pew.shift(pew[i]);
                            alien.shift(alien[a]);

                        }
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

        //send out alien ship
        if (frameCount % 1250 === 0){
            alien.push(new Alien());
        }

        //show alien ship
        for (var q = alien.length -1; q >= 0; q--){
            alien[q].show();
            alien[q].update();

            if (int(dist(ship.pos.x, ship.pos.y, alien[q].pos.x, alien[q].pos.y)) <= 35){
                if (ship.shield !== true){
                    explode(ship.pos.x, ship.pos.y, 50);
                    ship.die();
                }
            }

            //make the alien shoot
            if (frameCount % (175 - level*5) === 0){
                alien[q].fire();
            }

            //pop alien ship if it went off screen
            if (alien[q].pos.x >= width){
                alien.shift(alien[q]);
                frameCount = 0;
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
                alienPew.splice(b, 1)
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
    if (rock.length === 0){

        ship.pos.x = width/2;
        ship.pos.y = height/2;

        for (var n = dust.length - 1; n >= 0; n--){
            dust.pop();
        }

        for (var i = alien.length - 1; i >= 0; i--){
            alien.pop();
        }

        for (var j = alienPew.length - 1; j >= 0; j--){
            alienPew.pop();
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
            frameCount = 0;
            clear();
            background(22);
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

//handle the points
function handlePoints(pointsGained){
    for (var p = 0; p <= pointsGained-1; p++){
        points++;
        ship.lifelock = false;
        if (points % 5000 === 0 && points !== 0){
            if (ship.lifelock === false){
                ship.lives++;
                lives.push(new Ship());
            }
            ship.lifelock = true;
        }
    }
}

//randomly select a powerup
function getPowerup(a){
    var randomType = int(random(1,10));
    if (randomType <= 2){
        return powerup.push(new Powerup(alien[a].pos.x, alien[a].pos.y, 'triShot'));
    } else if (randomType > 2 && randomType <= 4) {
        return powerup.push(new Powerup(alien[a].pos.x, alien[a].pos.y, 'freeze'));
    } else if (randomType > 4 && randomType <= 6) {
        return powerup.push(new Powerup(alien[a].pos.x, alien[a].pos.y, 'shield'));
    } else if (randomType > 6 && randomType <= 8) {
        return powerup.push(new Powerup(alien[a].pos.x, alien[a].pos.y, 'bomb'));
    } else {
        return null;
    }
}

//handle the power ups
function power(){
    if (ship.powerup !== false){
        //trishot powerup
        if (ship.powerup === 'triShot'){
            textSize(15);
            fill(255);
            if (ship.powerup !== false){
                text("Tri-Shot Activated!", width/2, height - 50);
            } else {
                clear();
            }
            setTimeout(function(){
                ship.powerup = false;
            }, 10000);

        } else {
            var powerupText = "Press down arrow to activate " + ship.powerup + "!";
            textSize(20);
            fill(255);

            if (ship.powerup !== false){
                text(powerupText, width/2, height/1.2);
            } else {
                clear();
            }

            //bomb powerup
            if (ship.powerup === 'bomb') {
                if (keyCode === DOWN_ARROW){
                    ship.powerup = false;
                    for (var i = rock.length - 1; i >= 0; i--){
                        handlePoints(rock[i].p);
                        explode(rock[i].pos.x, rock[i].pos.y, 40);
                        rock[i].break();
                        rock.splice(i, 1)
                    }
                }
            }

            //shield powerup
            if (ship.powerup === 'shield'){
                if (keyCode === DOWN_ARROW){
                    ship.powerup = false;
                    ship.shield = true;
                    ship.specShield = true;
                    setTimeout(function(){
                        ship.shield = false;
                        ship.specShield = false;
                    }, 7500);
                }
            }

            //freeze powerup
            if (ship.powerup === 'freeze'){

                if (keyCode === DOWN_ARROW){
                    ship.powerup = false;
                    limiter = 0.3;
                    setTimeout(function(){
                        limiter = 4;
                        console.log('!');
                        for (var b = rock.length - 1; b >= 0; b--){
                            rock[b].vel.add(0.7);
                            rock[b].vel.mult(2);
                            if (rock[b].size === 'small'){
                                rock[b].vel.mult(1.25);
                            } if (rock[b].size === 'tiny'){
                                rock[b].vel.mult(1.5);
                            }
                        }
                    }, 5000);
                }
            }
        }
    }
}

//Controls
function keyPressed() {
    if (keyCode === 77){
        if (song.isLooping()){
            song.pause();
        } else if (song.isPaused()) {
            song.loop();

        }
    }

    if (keyCode === 32){
        if (ship.powerup === 'triShot'){
            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle + 0.2)));
            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle)));
            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle - 0.2)));
        } else {
            pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle)));
        }
    }
}

function startScreen() {
    lives = [];
    level = 0;

    if (points > 0){
        for (var a = dust.length - 1; a >= 0; a--){
            dust.pop();
        }

        for (var b = alien.length - 1; b >= 0; b--){
            alien.pop();
        }

        for (var c = rock.length - 1; c >= 0; c--){
            rock.pop();
        }

        for (var d = alienPew.length - 1; d >= 0; d--){
            alienPew.pop();
        }

        if (points > hiscore){
            hiscore = points;
        }
    }

    points = 0;
    background(22);
    fill(0,128,128);
    textSize(15);
    text('HI-SCORE', width/2, 20);
    textSize(15);
    fill(255);
    text(hiscore, width/2, 35);
    textSize(45);
    text('Asteroids', width/2, height/5);

    fill(0,128,128);
    textSize(30);

    var instructiontext = height/2 - 50;

    text('Instructions: ', width/2, instructiontext);
    fill(255);
    textSize(20);

    text('-L and R arrows rotate ship', width/2, instructiontext + 40);
    text('-Up arrow engages boosters', width/2, instructiontext + 70);
    text('-Space Bar shoots', width/2, instructiontext + 100);
    text('-Down arrow activates power up', width/2, instructiontext + 130);

    textSize(35);
    fill(255);
    text('Press Enter to Begin!', width/2, height/1.2);

    var name = 'Dominic DiTaranto';

    textSize(15);
    fill(0,128,128);
    text('Game and Music by ', width/2 + 150, height -20);

    if (int(dist(mouseX, mouseY, width-120, height-20)) <= 80){
        fill(0,128,0);
    } else {
        fill(128,0,0);
    }

    text(name, width-120, height -20);

    amountOfRocks = 10;
    rockInit();

    //show the rocks
    for (var x = rock.length - 1; x >= 0; x--) {
        rock[x].show();
        rock[x].update();
        rock[x].edges();
    }

    if (keyCode === 13){
        if (songPlayed === false){
            song.loop();
            songPlayed = true;
        }

        for (var i = rock.length - 1; i >= 0; i--) {
            rock.splice(i, 1)
        }

        ship.lives = 4;
        // level++;
        amountOfRocks = -2;

        //setup lives
        for (var n = 0; n <= ship.lives - 1; n++) {
            lives.push(new Ship());
        }

        ship.dead = false;
        startNewLevel();

    }
}

function mousePressed(){
    if (int(dist(mouseX, mouseY, width-120, height-20)) <= 100){
            window.open('http://www.domdit.com');
        }
}