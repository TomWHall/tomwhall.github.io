import GameObjectComponent from "./GameObjectComponent.js";
const GameScreenComponent = (props) => {
    const gameObjectsFragment = props.gameScreen.gameObjects.map((gameObject, index) => React.createElement(GameObjectComponent, { gameObject: gameObject, key: index }));
    return React.createElement(React.Fragment, null, gameObjectsFragment);
};
export default GameScreenComponent;
