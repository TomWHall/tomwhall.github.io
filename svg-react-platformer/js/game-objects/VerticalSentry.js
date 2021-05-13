import GameObject from "./GameObject.js";
export default class VerticalSentry extends GameObject {
    constructor(game, type, y1, y2, x, speed, direction) {
        super(game, type);
        this.y1 = y1;
        this.y2 = y2;
        this.y = direction ? y1 : y2;
        this.x = x;
        this.speed = speed;
        this.direction = direction;
    }
    update() {
        let targetY = this.direction ? this.y2 : this.y1;
        if (this.y === targetY) {
            // Turn around
            this.direction = !this.direction;
            targetY = this.direction ? this.y2 : this.y1;
        }
        const diffY = targetY - this.y;
        const distance = Math.abs(diffY);
        const distanceIncrement = Math.round(Math.min(distance, this.speed * this.game.tickTimeFactor) * (this.direction ? 1 : -1));
        this.previousY = this.y;
        this.y += distanceIncrement;
    }
}
