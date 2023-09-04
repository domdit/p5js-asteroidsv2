class Alien extends Particle {
    constructor() {
        super();

        if (random(0, 1) > 0.5) {
            this.pos = createVector(0, random(50, 500));
            this.vel = createVector(2, 0);
        } else {
            this.pos = createVector(width - 1, random(50, 500));
            this.vel = createVector(-2, 0);
        }

        this.w = 50;
        this.h = 40;
        this.rw = 70;
        this.rh = 15;
        this.p = 100; //points
    }
    
    main(idx) {
        this.display();
        
        // destroy ship if collides with alien
        if (int(dist(ship.pos.x, ship.pos.y, alien[idx].pos.x, alien[idx].pos.y)) <= 35){
            if (ship.shield !== true){
                explode(ship.pos.x, ship.pos.y, 50);
                ship.die();
            }
        }
        
        // alien shoots on time interval
        if (frameCount % (175 - level * 5) === 0) {
            this.fire();
        }
        
        // pop alien if it goes off screen
        if (this.pos.x >= width){
            alien.shift(alien[idx]);
            frameCount = 0;
        }
    };
    
    display() {
        this.show();
        this.update();
    };

    fire() {
        //aim at the ship
        var dir = p5.Vector.sub(ship.pos, this.pos);
        dir.normalize();
        //create pew
        alienPew.push(new Flame(this.pos.x, this.pos.y, dir));
    }
    
    getShot(entity, idx) {
        if (int(dist(entity.pos.x, entity.pos.y, this.pos.x, this.pos.y)) <= 50) {
            handlePoints(this.p);
            explode(this.pos.x, this.pos.y, 100);
            generatePowerup(idx);
            pew.shift(entity);
            alien.shift(alien[idx]);
        }
    };

    show() {
        push();
        noStroke();

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
