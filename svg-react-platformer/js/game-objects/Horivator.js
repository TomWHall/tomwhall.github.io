import { GameObjectType } from "../types.js";
import HorizontalSentry from "./HorizontalSentry.js";
import nb from '../NodeBuilder.js';
export default class Horivator extends HorizontalSentry {
    constructor(game, x1, x2, y, speed, direction) {
        super(game, GameObjectType.Solid, x1, x2, y, speed, direction);
        this.node = nb.getRect(0, 0, 128, 32, 'dance-floor', true);
    }
    update() {
        super.update();
        const distanceIncrement = this.x - this.previousX;
        const player = this.game.player;
        if (player.isOnSolid([this])) {
            player.adjustmentSpeedX = distanceIncrement;
        }
    }
}
