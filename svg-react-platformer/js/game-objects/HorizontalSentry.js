import GameObject from "./GameObject.js";
export default class HorizontalSentry extends GameObject {
    constructor(game, type, x1, x2, y, speed, direction) {
        super(game, type);
        this.x1 = x1;
        this.x2 = x2;
        this.x = direction ? x1 : x2;
        this.y = y;
        this.speed = speed;
        this.direction = direction;
    }
    update() {
        let targetX = this.direction ? this.x2 : this.x1;
        if (this.x === targetX) {
            // Turn around
            this.direction = !this.direction;
            targetX = this.direction ? this.x2 : this.x1;
        }
        const diffX = targetX - this.x;
        const distance = Math.abs(diffX);
        const distanceIncrement = Math.round(Math.min(distance, this.speed * this.game.tickTimeFactor) * (this.direction ? 1 : -1));
        this.previousX = this.x;
        this.x += distanceIncrement;
    }
}
