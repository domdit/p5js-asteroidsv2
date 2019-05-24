class Ship extends Particle {
    constructor() {
        super();
        this.pos = createVector(width/2, height/2);
        this.vel = createVector();
        this.r = 10;
        this.angle = PI/-2;

        this.lives = 4;
        this.lifelock = false;
        this.dead = false;
        this.shield = false;
    }

    move(){
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
        if (this.shield === true){
            if (frameCount % 60 >= 30){
                stroke(22)
            } else {
                stroke(0,128,128);
            }
        } else{
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

