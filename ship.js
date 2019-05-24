function Ship() {
    this.pos = createVector(width/2, height/2);
    this.acc = createVector(0,0);
    this.vel = createVector(this.acc.x, this.acc.y);
    this.lives = 4;

    this.dead = false;
    this.shield = false;

    this.r = 10;

    //makes ship start facing north
    this.angle = PI/-2;

    this.show = function() {

        push();
        noFill();

        if (this.shield === true){
            if (frameCount % 60 >= 30){
                stroke(22)
            } else {
                stroke(0,128,128);
            }
        } else{
            stroke(0,128,128);
        }

        strokeWeight(2);
        translate(this.pos.x, this.pos.y);
        rotate(this.angle + PI/2);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);

        pop();



    };

    this.die = function() {
        if (ship.shield !== true){
            ship.pos = createVector(width/2, height/2);
            this.vel.mult(0);
            this.lives--;
            this.shield = true;

            setTimeout(function(){ship.shield = false}, 3000);

            return lives.pop();

        }

    };

    this.rotate = function(degree){
        this.angle += degree;
    };

    this.move = function(){
        var force = p5.Vector.fromAngle(this.angle);
        this.vel.add(force);


    };

    this.update = function() {

        if (keyIsDown(RIGHT_ARROW)){
            this.rotate(0.1)
        } else if (keyIsDown(LEFT_ARROW)){
            this.rotate(-0.1)
        }
        if (keyIsDown(UP_ARROW)){
            this.move();
        }

        this.pos.add(this.vel);
        this.vel.mult(0.99);
        this.vel.limit(4);

        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        } else if (this.pos.y > height){
            this.pos.y = 0;
        } else if (this.pos.y < 0){
            this.pos.y = height;
        }


    }

}