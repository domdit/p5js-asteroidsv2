function Shield() {
    this.pos = createVector(ship.pos.x, ship.pos.y);
    this.vel = createVector(ship.vel.x, ship.vel.y);
    this.r = 35;

    this.show = function(){
        push();
        rectMode(CENTER);
        fill(255,92,203,102);
        stroke(55);
        strokeWeight(2);

        ellipse(this.pos.x, this.pos.y+2, this.r, this.r);
        pop();
    };

    this.update = function(){
        this.pos.add(ship.vel);
    }



}