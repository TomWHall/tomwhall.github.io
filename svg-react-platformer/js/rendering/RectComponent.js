const RectComponent = (props) => {
    const angle = (props.angle || 0) * 180 / Math.PI;
    const transform = 'rotate(' + angle + ')';
    return React.createElement("rect", { x: props.x, y: props.y, width: props.width, height: props.height, transform: transform, className: props.className });
};
export default RectComponent;
