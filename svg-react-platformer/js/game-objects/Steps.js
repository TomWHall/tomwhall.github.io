import GameObject from "./GameObject.js";
import { Direction, GameObjectType } from "../types.js";
import nb from '../NodeBuilder.js';
export default class Terrain extends GameObject {
    constructor(game, x, y, height, direction, className) {
        super(game, GameObjectType.Solid);
        const stepSize = 16;
        let currentX = (direction === Direction.Left ? 0 : height - stepSize);
        let currentY = 0;
        const steps = [];
        while (currentY < height) {
            steps.push(nb.getRect(currentX, currentY, stepSize, stepSize, className));
            currentY += stepSize;
            currentX += ((direction === Direction.Left ? 1 : -1) * stepSize);
        }
        this.node = nb.getGroup(steps, x, y);
    }
}
