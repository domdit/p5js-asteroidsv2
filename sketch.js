let ship;
let lives = [];
let powerup = [];

let pew = [];

let alien = [];
let alienPew =[];

let rock = [];
let dust = [];


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
        
        alertMusicMuteOption();
        displayPoints(points);
        displayLives(lives);
        
        ship.main(lives);

        //handle power ups!
        usePowerUp(); // improve this
        
        for (var i = pew.length - 1; i >= 0; i--){
            pew[i].display(pew, i);
            
            for (var j = rock.length - 1; j >= 0; j--) {
                if (pew[i]) {
                    rock[j].getShot(pew[i], j);
                }
            }
            
            for (var j = alien.length - 1; j >= 0; j--) {
                if (pew[i]) {
                    alien[j].getShot(pew[i], j);
                }
            } 
        }

        //show the rocks
        for (var i = rock.length - 1; i >= 0; i--) {
            ship.handleCollision(rock[i]);
            rock[i].display();
        }

        //show the explosion
        for (var z = dust.length - 1; z >= 0; z--) {
            dust[z].display(ship);
        }

        //send out alien ship
        if (frameCount % 1250 === 0){
            alien.push(new Alien());
        }

        //show alien ship
        for (var q = alien.length -1; q >= 0; q--){
            alien[q].main(q);
        }

        //show alien pew
        for (var b = alienPew.length - 1; b >= 0; b--) {
            alienPew[b].display(alienPew, b, isAlienPew=true);
        }

        //show power up
        for (var u = powerup.length -1; u >= 0; u--){
            console.log(powerup[u].type)
            if (powerup[u].type !== null) {
                powerup[u].display(u);
            }
        }

        startNewLevel();
    }
}

function startNewLevel(){
    if (rock.length === 0){

        ship.pos.x = width/2;
        ship.pos.y = height/2;
        
        dust = [];
        alien = [];
        alienPew = [];
        powerup = [];
        
        level++;

        clear();
        background(22);
        fill(255);
        textSize(25);
        text("Great Job", width/2, height/2 - 50);
        text("Get Ready for Level " + level, width/2, height/2);
        textSize(15);
        text("Press Enter to Begin!", width/2, height/2+50);

        if (keyCode === 13){
            frameCount = 0;
            clear();
            background(22);
            amountOfRocks += 2;
            generateRocks();

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
        if (ship.powerup !== null){
            if (ship.powerup.type === 'triShot') { 
                pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle + 0.2)));
                pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle)));
                pew.push(new Flame(ship.pos.x, ship.pos.y, p5.Vector.fromAngle(ship.angle - 0.2)));
            }
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
    generateRocks();

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
            rock.splice(i, 1);
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