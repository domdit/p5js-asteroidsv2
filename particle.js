function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(), random());
    this.r = 3;

    this.show = function() {
        fill(random(255), random(255), random(255));
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    };

    this.update = function() {
        this.vel.limit(4);
        this.pos.add(this.vel);
    };



}