class Dust extends Particle {
    constructor(x, y) {
        super(x, y);
        this.vel = createVector(random(), random());
        this.vel.limit(4);
        this.r = 3;
    }

    show() {
        fill(random(255), random(255), random(255));
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    };


}

