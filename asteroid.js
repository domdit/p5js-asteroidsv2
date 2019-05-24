function Asteroid(x, y, size){
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.vel.mult(2);

    //change sides, size, and velocity depending on the size of the rock
    if (size === 'full'){
        this.r = 50;
        this.s = 7;
        this.vel.mult(1);
        this.p = 20;
    } else if (size === 'small'){
        this.r = 30;
        this.s = 13;
        this.vel.mult(1.25);
        this.p = 30;
    } if (size === 'tiny'){
        this.r = 13;
        this.s = 6;
        this.vel.mult(1.5);
        this.p = 50;
    }

    //double and shrink when rock is hit... destroy if size is 'tiny'
    this.break = function() {
        if (size === 'full'){
            return [
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'small')),
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'small'))
            ];
        } else if (size === 'small'){
            return [
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'tiny')),
                rock.push(new Asteroid(this.pos.x, this.pos.y, 'tiny'))
            ];
        } if (size === 'tiny'){
            return [];
        }
    };

    this.show = function() {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        polygon(0, 0, this.r, this.s);
        pop();

    };

    this.update = function() {
        this.pos.add(this.vel);

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
//polygon function from p5.js
function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}