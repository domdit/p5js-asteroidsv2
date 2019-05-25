class Dust extends Particle {
    constructor(x, y) {
        super(x, y);
        this.vel = createVector(random(), random());
        this.vel.limit(4);
        this.r = 3;
        this.acc = createVector();
    }

    show() {
        fill(random(255), random(255), random(255));
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    };

    repulsion(target) {
        var force = p5.Vector.sub(target, this.pos);
        var d = force.mag();
        var strength = 0.5 / (d*d);
        force.setMag(strength);
        force.mult(-1);
        force.limit(8);
        this.acc.add(force);
    }

    update(){
        this.vel.add(this.acc);
        this.vel.mult(1);
        this.pos.add(this.vel);
    }

}

