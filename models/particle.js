class Particle {
    constructor(x, y){
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.r = 0
    }

    update(){
        this.pos.add(this.vel);
    }

    edges() {
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