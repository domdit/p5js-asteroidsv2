class Asteroid extends Particle {
    constructor(x, y, size) {
        super(x, y);
        this.size = size;
        this.vel = p5.Vector.random2D();
        this.vel.mult(2);

        //change sides, size, and velocity depending on the size of the rock
        if (this.size === 'full'){
            this.r = 50;
            this.s = 7;
            this.vel.mult(1);
            this.p = 20;
        } else if (this.size === 'small'){
            this.r = 30;
            this.s = 13;
            this.vel.mult(1.25);
            this.p = 30;
        } if (this.size === 'tiny'){
            this.r = 13;
            this.s = 6;
            this.vel.mult(1.5);
            this.p = 50;
        }

    }

    //double and shrink when rock is hit... destroy if size is 'tiny'
    break() {
        if (this.size === 'full') {
            return [
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'small')),
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'small'))
            ];
        } else if (this.size === 'small') {
            return [
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'tiny')),
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'tiny'))
            ];
        }
        if (this.size === 'tiny') {
            return [];
        }
    };

    show(){
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        polygon(0, 0, this.r, this.s);
        pop();
    }
}


