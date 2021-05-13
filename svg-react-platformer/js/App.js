import Patterns from "./rendering/Patterns.js";
import Game from "./Game.js";
import { Direction } from "./types.js";
import config from './config.js';
import GameScreenComponent from "./rendering/GameScreenComponent.js";
import GameObjectComponent from "./rendering/GameObjectComponent.js";
import GroupComponent from "./rendering/GroupComponent.js";
import PlayerNodeWrapper from "./game-objects/PlayerNodeWrapper.js";
const windowResizeEvent = 'resize';
const windowOrientationChangeEvent = 'orientationchange';
const documentKeydownEvent = 'keydown';
const documentKeyupEvent = 'keyup';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.windowResize = () => {
            const windowWidth = Math.min(window.innerWidth, config.containerWidth);
            const windowHeight = Math.min(window.innerHeight, config.containerHeight);
            const windowRatio = windowWidth / windowHeight;
            const containerRatio = config.containerWidth / config.containerHeight;
            let width;
            let height;
            if (windowRatio > containerRatio) {
                // Window is wider than the container
                width = Math.floor(windowHeight * containerRatio);
                height = windowHeight;
            }
            else {
                // Window is taller than the container
                width = windowWidth;
                height = Math.floor(windowWidth / containerRatio);
            }
            this.setState({ width: width });
            this.setState({ height: height });
            this.setState({ left: Math.floor((windowWidth - width) / 2) });
        };
        this.handleKeyDown = (e) => {
            if (e.keyCode === 32) {
                e.preventDefault();
                this.game.player.jump();
            }
            const direction = this.getDirection(e);
            if (direction === null)
                return;
            e.preventDefault();
            this.game.player.move(direction);
        };
        this.handleKeyUp = (e) => {
            const direction = this.getDirection(e);
            if (direction === null)
                return;
            this.game.player.move(null);
        };
        this.game = new Game();
        this.state = {
            width: 0,
            height: 0,
            left: 0,
            time: performance.now()
        };
        this.animate = this.animate.bind(this);
    }
    componentDidMount() {
        window.addEventListener(windowResizeEvent, this.windowResize);
        window.addEventListener(windowOrientationChangeEvent, this.windowResize);
        document.addEventListener(documentKeydownEvent, this.handleKeyDown);
        document.addEventListener(documentKeyupEvent, this.handleKeyUp);
        this.windowResize();
        this.game.initialize(this.game.getDefaultGameState());
        this.animate(performance.now());
    }
    componentWillUnmount() {
        window.removeEventListener(windowResizeEvent, this.windowResize);
        window.removeEventListener(windowOrientationChangeEvent, this.windowResize);
    }
    render() {
        const game = this.game;
        if (!game.initialized)
            return null;
        const screen = game.getCurrentScreen();
        if (!screen)
            return null;
        const containerStyle = {
            width: this.state.width + 'px',
            height: this.state.height + 'px',
            left: this.state.left + 'px'
        };
        return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 1920 928", className: game.gameOver ? 'game-over' : null, style: containerStyle },
            React.createElement("defs", null,
                React.createElement("clipPath", { id: "viewport" },
                    React.createElement("rect", { x: "0", y: "0", width: "1920", height: "864" })),
                React.createElement(Patterns, null)),
            React.createElement("g", { clipPath: "url(#viewport)" },
                React.createElement(GameScreenComponent, { gameScreen: screen }),
                React.createElement(GameObjectComponent, { gameObject: game.player })),
            React.createElement("g", { transform: "translate(0 864)" },
                React.createElement("rect", { className: "screen-name-container", x: "8", y: "8", width: "928", height: "48" }),
                React.createElement("text", { className: "screen-name", x: "472", y: "45", textAnchor: "middle" }, screen.name),
                React.createElement("text", { className: "lives", x: "960", y: "45" }, "Lives"),
                React.createElement("g", { transform: "translate(1112 8)" }, this.getLivesGroup()),
                React.createElement("text", { className: "items", x: "1400", y: "45" }, `Items: ${game.collectedItems.length}`),
                React.createElement("a", { href: "https://github.com/TomWHall/svg-react-platformer/", target: "_blank" },
                    React.createElement("text", { className: "github", x: "1830", y: "38" }, "GitHub")))));
    }
    getLivesGroup() {
        const lifeGroups = [];
        for (let i = 1; i <= this.game.lives; i++) {
            lifeGroups.push(new PlayerNodeWrapper().group);
        }
        return lifeGroups.map((group, index) => React.createElement("g", { key: index, transform: `translate(${index * 24} 0)` },
            React.createElement("g", { transform: "scale(0.375)" },
                React.createElement(GroupComponent, Object.assign({}, group)))));
    }
    animate(time) {
        requestAnimationFrame(this.animate);
        this.game.tick(time);
        this.setState({ time: time }); // Trigger render
    }
    getDirection(e) {
        switch (e.keyCode) {
            case 37:
                return Direction.Left;
            case 39:
                return Direction.Right;
            default:
                return null;
        }
    }
}
