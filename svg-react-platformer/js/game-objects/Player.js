import GameObject from "./GameObject.js";
import config from '../config.js';
import { Direction, GameObjectType } from "../types.js";
import CollisionUtil from "../physics/CollisionUtil.js";
import PlayerNodeWrapper from "./PlayerNodeWrapper.js";
const viewportWidth = config.viewportWidth;
const viewportHeight = config.viewportHeight;
export default class Player extends GameObject {
    constructor(game) {
        super(game, GameObjectType.Background);
        this.inputDirection = null;
        this.forceX = 0;
        this.forceY = 0;
        this.speedX = 0;
        this.speedY = 0;
        // Transient speed adjustments made by entities e.g. Horivator
        this.adjustmentSpeedX = 0;
        this.adjustmentSpeedY = 0;
        this.nodeWrapper = new PlayerNodeWrapper();
        this.node = this.nodeWrapper.group;
    }
    update() {
        const { game, x, y, forceX, forceY, speedX, animationPhase, inputDirection, displayDirection } = this;
        const { forceXDelta, forceYDelta, maxForceX, maxForceY } = config;
        const screen = game.getCurrentScreen();
        const gameObjects = screen.gameObjects;
        // Check if collected an itwm
        this.checkCollectables();
        // Check if zapped
        if (this.isInFatal(gameObjects)) {
            this.handleLostLife();
            return;
        }
        // Cache the "on solid" result for this phase
        const onSolid = this.onSolid = this.isOnSolid(gameObjects);
        const newForceX = onSolid
            ? inputDirection === null
                ? 0
                : inputDirection === Direction.Left
                    ? this.constrain(forceX - (forceXDelta * this.game.tickTimeFactor), -maxForceX, 0)
                    : this.constrain(forceX + (forceXDelta * this.game.tickTimeFactor), 0, maxForceX)
            : forceX;
        let newForceY = onSolid
            ? Math.min(forceY, 0)
            : Math.min(forceY + forceYDelta, maxForceY);
        let newSpeedX = onSolid
            ? inputDirection === null ? 0 : newForceX
            : speedX;
        let newSpeedY = newForceY;
        // Apply any speed adjustments made by entities, and reset them
        newSpeedX += this.adjustmentSpeedX;
        newSpeedY += this.adjustmentSpeedY;
        this.adjustmentSpeedY = 0;
        this.adjustmentSpeedX = 0;
        const targetPositionX = newSpeedX === 0
            ? x
            : Math.round(x + (newSpeedX < 0 ? Math.floor(Math.min(newSpeedX, -1)) : Math.ceil(Math.max(newSpeedX, 1))));
        const targetPositionY = newSpeedY === 0
            ? y
            : Math.round(y + (newSpeedY < 0 ? Math.floor(Math.min(newSpeedY, -1)) : Math.ceil(Math.max(newSpeedY, 1))));
        let [newX, newY] = this.getClosestPosition(x, y, targetPositionX, targetPositionY, screen);
        let newScreenX = this.game.screenX;
        let newScreenY = this.game.screenY;
        // Check if player has moved to a new screen
        if (newX > viewportWidth - 16) {
            newX -= viewportWidth;
            newScreenX++;
        }
        else if (newX < -16) {
            newX += viewportWidth;
            newScreenX--;
        }
        else if (newY > viewportHeight - 64) {
            newY -= viewportHeight;
            newScreenY++;
        }
        else if (newY < -64) {
            newY += viewportHeight;
            newScreenY--;
        }
        if (newX === x && newY === y) {
            newSpeedX = 0;
            newSpeedY = 0;
            newForceY = 0;
        }
        const newDisplayDirection = onSolid && inputDirection !== null
            ? inputDirection
            : displayDirection;
        const newAnimationPhase = newForceX !== 0 && onSolid
            ? (animationPhase + (Math.abs(newX - x) / config.xUnitsPerAnimationPhase)) % 1
            : animationPhase;
        this.nodeWrapper.update(newDisplayDirection, newAnimationPhase);
        this.forceX = newForceX;
        this.forceY = newForceY;
        this.speedX = newSpeedX;
        this.speedY = newSpeedY;
        this.x = newX;
        this.y = newY;
        this.animationPhase = newAnimationPhase;
        this.displayDirection = newDisplayDirection;
        if (newScreenX !== this.game.screenX || newScreenY !== this.game.screenY) {
            this.game.handleRequestScreen(newScreenX, newScreenY);
        }
    }
    move(direction) {
        this.inputDirection = direction;
        if (direction !== null && this.isOnSolid) {
            this.displayDirection = direction;
        }
    }
    jump() {
        if (this.onSolid) {
            this.forceY = config.jumpInitialForceY;
        }
    }
    isOnSolid(gameObjects) {
        return CollisionUtil.isOnSolidRect(this.x, this.y, gameObjects);
    }
    isInFatal(gameObjects) {
        return this.isInMaterialType(GameObjectType.Fatal, gameObjects);
    }
    isInCollectable(gameObjects) {
        return this.isInMaterialType(GameObjectType.Collectable, gameObjects);
    }
    isInMaterialType(materialType, gameObjects) {
        return CollisionUtil.collides(this.x, this.y, gameObjects, materialType);
    }
    getClosestPosition(currentX, currentY, targetX, targetY, screen) {
        if (targetX === currentX && targetY === currentY)
            return [targetX, targetY];
        const xDistance = targetX - currentX;
        const yDistance = targetY - currentY;
        const distance = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
        let closestX = currentX;
        let closestY = currentY;
        for (let i = 1; i <= distance; i++) {
            const x = Math.ceil(currentX + ((xDistance / distance) * i));
            const y = Math.ceil(currentY + ((yDistance / distance) * i));
            if (targetY > currentY && CollisionUtil.isOnSolidRect(x, y, screen.gameObjects))
                return [x, y];
            if (CollisionUtil.collides(x, y, screen.gameObjects, GameObjectType.Solid))
                break;
            closestX = x;
            closestY = y;
        }
        if (closestX !== currentX || closestY !== currentY)
            return [closestX, closestY];
        if (this.onSolid) {
            // Try elevated (walking up steps)
            const maxYRise = 32;
            const yStart = currentY;
            for (let i = 1; i <= maxYRise; i++) {
                const y = yStart - i;
                if (!CollisionUtil.collides(targetX, y, screen.gameObjects, GameObjectType.Solid))
                    return [targetX, y];
            }
        }
        return [closestX, closestY];
    }
    checkCollectables() {
        const game = this.game;
        const collectable = game.screenCollectables.find(c => !c.collected &&
            CollisionUtil.collides(this.x, this.y, [c], GameObjectType.Collectable));
        if (collectable) {
            game.handleItemCollected(collectable);
        }
    }
    handleLostLife() {
        if (this.game.lives === 1) {
            this.game.gameOver = true;
            window.setTimeout(() => {
                this.game.gameOver = false;
                this.game.initialize(this.game.getDefaultGameState());
            }, 3000);
            return;
        }
        this.lostLife = true;
        this.nodeWrapper.group.className = 'player lost-life';
        window.setTimeout(() => {
            this.lostLife = false;
            this.nodeWrapper.group.className += 'player';
            const screenEntryGameState = this.screenEntryGameSnapshot;
            this.x = screenEntryGameState.x;
            this.y = screenEntryGameState.y;
            this.speedX = screenEntryGameState.speedX;
            this.speedY = screenEntryGameState.speedY;
            this.adjustmentSpeedX = 0;
            this.adjustmentSpeedY = 0;
            this.forceX = 0;
            this.forceY = 0;
            this.game.lives--;
        }, 3000);
    }
    constrain(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
}
