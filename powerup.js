class Powerup extends Particle{
    constructor(x, y) {
        super(x, y);
        this.r = 20;
        this.vel = createVector(0, 0.5);


    }

    grab(u){
        if (int(dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y)) <= ship.r + this.r > 0){
            return [
                powerup.pop(powerup[u]),
                ship.powerup = true
            ]
        }
    }

    show(){
        fill(0,255,0);
        square(this.pos.x, this.pos.y, this.r)
    }

    update(){
        super.update();
    }

}