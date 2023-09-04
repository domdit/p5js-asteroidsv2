function displayPoints(points) {
    textSize(25);
    fill(255);
    text(points, 60, 30);
}

function displayLives (lives) {
    for (var l = lives.length - 1; l >= 0; l--){
        lives[l].pos = createVector(25, 60);
        lives[l].shield = false;
        if (lives[l] !== lives[0]){
            lives[l].pos.x = lives[l-1].pos.x + 20;
        }
        lives[l].show();
    }
}

function alertMusicMuteOption () {
    textSize(15);
    text(musicToggleText, width/2, height-50);

    setTimeout(function(){
        musicToggleText = '';
    }, 5000);
}

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
function generateRocks(){
    for (var r = rock.length; r <= amountOfRocks; r++){
        rock.push(new Asteroid(randomRockPos(width, 400, 500),
            randomRockPos(height, 250, 350), 'full'));
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

function displayPowerUpText() {
    var powerupText = "Press down arrow to activate " + ship.powerup.type + "!";
    textSize(20);
    fill(255);

    if (ship.powerup){
        text(powerupText, width/2, height/1.2);
    } else {
        clear();
    }
}

//randomly select a powerup
function generatePowerup(a){
    return powerup.push(new Powerup(alien[a].pos.x, alien[a].pos.y));
}

//handle the power ups
function usePowerUp(){
    if (ship.powerup !== null){
        //trishot powerup
        if (ship.powerup.type === 'triShot'){
            ship.powerup.typeMap[ship.powerup.type]();
        } else {
            displayPowerUpText();

            if (keyCode === DOWN_ARROW){
                ship.powerup.typeMap[ship.powerup.type]['function']();
                ship.powerup = null;
            }
        }
    }
}

function mousePressed() {
    if (int(dist(mouseX, mouseY, width-120, height-20)) <= 100){
            window.open('http://www.domdit.com');
        }
}