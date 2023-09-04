class Ship extends Particle {
    constructor() {
        super();
        this.pos = createVector(width/2, height/2);
        this.vel = createVector();
        this.r = 10;
        this.angle = PI/-2;

        this.lives = 4;
        this.lifelock = false;
        this.dead = true;
        this.shield = false;
        this.specShield = false;

        this.powerup = null;

        this.animationDegree = 0;
    }
    
    main(lives) {
        if (lives.length === 0){
            this.dead = true;
        }
        if (this.dead !== true) {
            this.display();
            this.handleControls();
        }
    }
    
    display() {
        this.show();
        this.update();
        this.edges();
    };
    
    handleCollision(entity) {
        if (int(dist(this.pos.x, this.pos.y, entity.pos.x, entity.pos.y)) <= entity.r + entity.shipOffset) {
            if (this.shield !== true){
                explode(this.pos.x, this.pos.y, 50);
                this.die();
            }
        }
    };
    
    handleControls() {
        if (keyIsDown(RIGHT_ARROW)){
            this.rotate(0.1);
        } else if (keyIsDown(LEFT_ARROW)){
            this.rotate(-0.1);
        }
        if (keyIsDown(UP_ARROW)){
            this.move();
        }
    }

    move() {
        var force = p5.Vector.fromAngle(this.angle);
        this.vel.add(force);
    }

    rotate(degree){
        this.angle += degree;
    }

    die(){
        if (ship.shield !== true){
            ship.pos = createVector(width/2, height/2);
            this.vel.mult(0);
            this.lives--;

            if (ship.lives === 0){
                ship.dead = true;
            }

            this.shield = true;
            this.powerup = null;
            setTimeout(function(){ship.shield = false}, 3000);
            return lives.pop();
        }
    }

    show(){
        push();
        noFill();
        translate(this.pos.x, this.pos.y);
        strokeWeight(2);

        //make ship flash when shield is on
        if (this.shield === true && this.specShield === false){
            if (frameCount % 60 >= 30){
                stroke(22)
            } else {
                stroke(0,128,128);
            }
        } else if (this.specShield === true && this.shield === true){
            stroke(0, random(255), random(255));
        } else {
            stroke(0,128,128);
        }

        rotate(this.angle + PI/2);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }

    update(){
        super.update();
        this.vel.mult(0.99);
        this.vel.limit(4);
    }
}

