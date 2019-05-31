class Powerup extends Particle{
    constructor(x, y, type) {
        super(x, y);
        this.r = 20;
        this.vel = createVector(0, 0.5);

        this.type = type;
    }


    grab(u){
        if (int(dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y)) <= ship.r + this.r > 0){
            return [
                powerup.pop(powerup[u]),
                ship.powerup = this.type
            ]
        }
    }

    show(){
        if (this.type === 'triShot'){
            fill(255, 0, 0);
            circle(this.pos.x, this.pos.y, this.r)
        } else if (this.type === 'freeze'){
            fill(165, 242, 243);
            circle(this.pos.x, this.pos.y, this.r)
        } else if (this.type === 'shield'){
            fill(0, 255, 0);
            circle(this.pos.x, this.pos.y, this.r)
        } else if (this.type === 'bomb'){
            fill(117, 0, 142);
            circle(this.pos.x, this.pos.y, this.r)
        }

    }

    update(){
        super.update();
    }

}