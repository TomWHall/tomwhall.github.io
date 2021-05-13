import { Direction } from "./types.js";
import Logger from "./Logger.js";
import Player from "./game-objects/Player.js";
import Collectable from "./game-objects/Collectable.js";
const baseTickTime = 1000 / 60;
const startTime = performance.now();
export default class Game {
    constructor() {
        this.initialized = false;
        this.gameOver = false;
        this.time = startTime;
        this.previousTime = startTime;
        this.tickTimeFactor = 1;
        this.collectedItems = [];
        this.player = new Player(this);
    }
    initialize(gameState) {
        this.screens = [];
        this.screenX = gameState.screenX;
        this.screenY = gameState.screenY;
        this.lives = gameState.lives;
        this.player.x = gameState.x;
        this.player.y = gameState.y;
        this.player.speedX = gameState.speedX;
        this.player.speedY = gameState.speedY;
        this.player.displayDirection = gameState.displayDirection;
        this.player.animationPhase = gameState.animationPhase;
        this.previousTime = gameState.time;
        this.handleRequestScreen(this.screenX, this.screenY);
        this.initialized = true;
    }
    tick(time) {
        if (this.gameOver || this.player.lostLife || this.isLoadingScreen)
            return;
        const deltaTime = time - (this.previousTime || time);
        if (deltaTime > 500) {
            this.previousTime = time;
            return;
        }
        this.previousTime = time;
        this.time = time;
        this.tickTimeFactor = deltaTime / baseTickTime;
        const screen = this.getCurrentScreen();
        screen.gameObjects.forEach(gameObject => gameObject.update());
        this.player.update();
    }
    getScreen(screenX, screenY) {
        return (this.screens[screenX] && this.screens[screenX][screenY]) || null;
    }
    getCurrentScreen() {
        return this.getScreen(this.screenX, this.screenY);
    }
    handleRequestScreen(screenX, screenY) {
        const screen = this.getScreen(screenX, screenY);
        if (screen) {
            this.screenX = screenX;
            this.screenY = screenY;
            this.screenCollectables = screen.gameObjects.filter(go => go instanceof Collectable);
        }
        else {
            this.loadScreen(screenX, screenY);
        }
        const player = this.player;
        player.screenEntryGameSnapshot = this.getState();
    }
    handleItemCollected(collectable) {
        this.markItemCollected(collectable);
        this.collectedItems.push({
            screenX: this.screenX,
            screenY: this.screenY,
            x: collectable.x,
            y: collectable.y
        });
    }
    markItemCollected(collectable) {
        collectable.collected = true;
        collectable.node.className += ' collected';
    }
    isItemCollected(gameObject) {
        return !!this.collectedItems.find(item => item.screenX === this.screenX && item.screenY === this.screenY && item.x === gameObject.x && item.y === gameObject.y);
    }
    getState() {
        return {
            screenX: this.screenX,
            screenY: this.screenY,
            x: this.player.x,
            y: this.player.y,
            speedX: this.player.speedX,
            speedY: this.player.speedY,
            displayDirection: this.player.displayDirection,
            animationPhase: this.player.animationPhase,
            lives: this.lives,
            time: this.previousTime
        };
    }
    getDefaultGameState() {
        return {
            screenX: 100,
            screenY: 100,
            x: 64,
            y: 704,
            speedX: 0,
            speedY: 0,
            displayDirection: Direction.Right,
            animationPhase: 0,
            lives: 10,
            time: performance.now()
        };
    }
    loadScreen(screenX, screenY) {
        Logger.log(`Loading screen ${screenX}-${screenY}`);
        this.isLoadingScreen = true;
        const modulePath = `./game-screens/screen-${screenX}-${screenY}.js`;
        import(modulePath).then(Module => {
            const gameScreenFunc = Module.default;
            const screen = gameScreenFunc(this);
            const screens = this.screens;
            screens[screenX] = screens[screenX] || [];
            screens[screenX][screenY] = screen;
            this.screenX = screenX;
            this.screenY = screenY;
            this.screenCollectables = screen.gameObjects.filter(go => go instanceof Collectable);
            this.screenCollectables.forEach(c => {
                if (this.isItemCollected(c)) {
                    this.markItemCollected(c);
                }
            });
            this.isLoadingScreen = false;
        });
    }
}
