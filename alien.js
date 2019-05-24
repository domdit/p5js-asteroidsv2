function Alien(){
    this.pos = createVector(0, random(50, 500));
    this.vel = createVector(2, 0);
    this.w = 50;
    this.h = 40;
    this.rw = 70;
    this.rh = 15;
    this.p = 100;

    this.fire = function(){
        //aim at the ship
        var dir = p5.Vector.sub(ship.pos, this.pos);
        dir.normalize();
        //create pew
        return alienPew.push(new Flame(this.pos.x, this.pos.y, dir));
    };

    this.update = function() {
        this.pos.add(this.vel);
    };

    this.show = function() {
        push();
        noStroke;

        fill(128, 128, 128);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y+8, this.rw, this.rh, 20);
        noFill();
        stroke(77.6, 88.6, 89);
        strokeWeight(3);
        fill(77.6, 88.6, 89);
        arc(this.pos.x, this.pos.y, this.w, this.h, PI, TWO_PI);

        strokeWeight(0);
        fill(random(255), random(255), random(255));
        ellipse(this.pos.x, this.pos.y+8, 7, 7);
        fill(random(255), random(255), random(255));
        ellipse(this.pos.x+20, this.pos.y+8, 7, 7);
        fill(random(255), random(255), random(255));
        ellipse(this.pos.x-20, this.pos.y+8, 7, 7);

        pop();
    }

}