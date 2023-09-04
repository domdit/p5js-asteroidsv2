class Powerup extends Particle{
    constructor(x, y) {
        super(x, y);
        this.r = 20;
        this.vel = createVector(0, 0.5);
        
        this.typeMap = {
            'triShot': {
                'function': this.triShot,
                'color': function() { fill(255, 0, 0); },
                'shape': function(_this) { circle(_this.pos.x, _this.pos.y, _this.r); }
            },
            'freeze': {
                'function': this.freeze,
                'color': function() { fill(165, 242, 243); },
                'shape': function(_this) { circle(_this.pos.x, _this.pos.y, _this.r); }
            },
            'shield': {
                'function': this.shield,
                'color': function() { fill(0, 255, 0); },
                'shape': function(_this) { circle(_this.pos.x, _this.pos.y, _this.r); }
            },
            'bomb': {
                'function': this.bomb,
                'color': function() { fill(117, 0, 142); },
                'shape': function(_this) { circle(_this.pos.x, _this.pos.y, _this.r); }
            },
            null: null
        };
        
        this.type = Object.keys(this.typeMap)[Math.floor(Math.random() * Object.keys(this.typeMap).length)] ;
    }
    
    display(idx){
        this.show();
        this.update();
        this.grab(idx);
    };

    grab(u){
        if (int(dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y)) <= ship.r + this.r > 0){
            return [
                powerup.pop(powerup[u]),
                ship.powerup = this
            ];
        }
    }

    show(){
        this.typeMap[this.type]['color']();
        this.typeMap[this.type]['shape'](this);
    }

    update(){
        super.update();
    }
    
    triShot() {
        textSize(20);
        fill(255);

        text("Tri-Shot Activated!", width/2, height - 50);

        setTimeout(function(){
            ship.powerup = null;
        }, 10000);
    }
    
    
    bomb() {
        ship.powerup = null;
        for (var i = rock.length - 1; i >= 0; i--){
            handlePoints(rock[i].p);
            explode(rock[i].pos.x, rock[i].pos.y, 40);
            rock[i].break();
            rock.splice(i, 1);
        }
    }
    
    shield() {
        ship.shield = true;
        ship.specShield = true;
        setTimeout(function(){
            ship.shield = false;
            ship.specShield = false;
        }, 7500);
    }
    
    freeze() {
        limiter = 0.3;
        setTimeout(function(){
            limiter = 4;
            console.log('!');
            for (var b = rock.length - 1; b >= 0; b--){
                rock[b].vel.add(0.7);
                rock[b].vel.mult(2);
                if (rock[b].size === 'small'){
                    rock[b].vel.mult(1.25);
                } if (rock[b].size === 'tiny'){
                    rock[b].vel.mult(1.5);
                }
            }
        }, 5000);
    }

}