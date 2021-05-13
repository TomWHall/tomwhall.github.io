import GroupComponent from "./GroupComponent.js";
const GameObjectComponent = (props) => {
    const gameObject = props.gameObject;
    const group = {
        x: gameObject.x,
        y: gameObject.y,
        children: [gameObject.node]
    };
    return React.createElement(GroupComponent, Object.assign({}, group));
};
export default GameObjectComponent;
