function Flame(x, y, dir) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.vel.add(dir);
    this.vel.mult(7);

    this.r = 5;

    this.edges = function(){
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            return true
        }
    };

    this.show = function(){
        push();
        fill(220, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        pop();
    };

    this.update = function () {
        this.pos.add(this.vel)
    }




}