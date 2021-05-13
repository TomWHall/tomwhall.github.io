import GameObject from "./GameObject.js";
import { GameObjectType } from "../types.js";
export default class Terrain extends GameObject {
    constructor(game, node) {
        super(game, GameObjectType.Solid);
        this.node = node;
    }
}
