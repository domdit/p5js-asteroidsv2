class Flame extends Particle{
    constructor(x, y, dir){
        super(x, y);
        this.vel.add(dir).mult(7);
        this.r = 5;
    }
    
    display(pew_array, idx, isAlienPew=false) {
        this.show();
        this.update();
        
        if (isAlienPew) {
            if (int(dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y)) <= ship.r && alienPew.length > 0){
                if (ship.shield !== true){
                    explode(ship.pos.x, ship.pos.y, 25);
                    ship.die();
                }
            }
        }
        
        if (this.edges() === true){
            pew_array.splice(idx, 1);
        }
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
