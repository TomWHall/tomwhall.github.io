import { NodeType } from "../types.js";
import CircleComponent from "./CircleComponent.js";
import RectComponent from "./RectComponent.js";
function renderNodes(nodes) {
    return nodes && nodes.length > 0
        ? nodes.map((node, index) => {
            switch (node.type) {
                case NodeType.Group:
                    return React.createElement(GroupComponent, Object.assign({}, node, { key: index }));
                case NodeType.Rect:
                    return React.createElement(RectComponent, Object.assign({}, node, { key: index }));
                case NodeType.Circle:
                    return React.createElement(CircleComponent, Object.assign({}, node, { key: index }));
            }
        })
        : null;
}
const GroupComponent = (props) => {
    const children = renderNodes(props.children);
    const x = props.x;
    const y = props.y;
    const angle = (props.angle || 0) * (180 / Math.PI);
    const flipHorizontalTranslation = props.flipHorizontal
        ? ' scale (-1, 1)'
        : '';
    const transform = `translate(${x} ${y}) rotate(${angle})${flipHorizontalTranslation}`;
    return React.createElement("g", { transform: transform, className: props.className }, children);
};
export default GroupComponent;
