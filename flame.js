class Flame extends Particle{
    constructor(x, y, dir){
        super(x, y);
        this.vel.add(dir).mult(7);
        this.r  = 5
    }

    edges() {
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            return true
        }
    };

    show(){
        push();
        fill(220, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        pop();
    };

}
