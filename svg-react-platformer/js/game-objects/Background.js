import GameObject from "./GameObject.js";
import { GameObjectType } from "../types.js";
export default class Background extends GameObject {
    constructor(game, node) {
        super(game, GameObjectType.Background);
        this.node = node;
    }
}
