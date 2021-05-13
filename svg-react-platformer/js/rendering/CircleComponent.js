const CircleComponent = (props) => {
    const angle = (props.angle || 0) * 180 / Math.PI;
    const transform = `rotate(${angle})`;
    return React.createElement("circle", { cx: props.x, cy: props.y, r: props.radius, transform: transform, className: props.className });
};
export default CircleComponent;
