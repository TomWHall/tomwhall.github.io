import { GameObjectType } from "../types.js";
import GameObject from "./GameObject.js";
import nb from '../NodeBuilder.js';
export default class Collectable extends GameObject {
    constructor(game, x, y, className) {
        super(game, GameObjectType.Collectable);
        this.collected = false;
        this.x = x;
        this.y = y;
        this.node = nb.getRect(0, 0, 32, 32, `collectable ${className}`);
    }
}
