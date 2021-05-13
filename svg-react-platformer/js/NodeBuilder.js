import { NodeType } from "./types.js";
import config from './config.js';
function getGroup(children, x = 0, y = 0, className = null, angle = 0) {
    return {
        type: NodeType.Group,
        children: children,
        x: x,
        y: y,
        angle: angle,
        className: className
    };
}
function getRect(x, y, width, height, className, passThrough = false, angle = 0) {
    return {
        type: NodeType.Rect, x: x,
        y: y,
        width: width,
        height: height,
        angle: angle,
        className: className,
        passThrough: passThrough || undefined
    };
}
function getCircle(x, y, radius, className, angle = 0) {
    return {
        type: NodeType.Circle,
        x: x,
        y: y,
        radius: radius,
        angle: angle,
        className: className
    };
}
function getBackground(className) {
    return getRect(0, 0, config.viewportWidth, config.viewportHeight, className);
}
function getBlock(x, y, width, height, className) {
    return getRect(x, y, width, height, className);
}
function getBricks(x, y, width, height) {
    return getRect(x, y, width, height, 'bricks');
}
// x, y is at center of capsule shape. Capsule is upright when angle = 0
function getCapsule(x, y, width, height, className, angle = 0) {
    const halfWidth = width / 2;
    const rectHeight = height - width;
    const rectX = -(width / 2);
    const rectY = -(rectHeight / 2);
    return getGroup([
        getCircle(0, rectY, halfWidth, className),
        getCircle(0, -rectY, halfWidth, className),
        getRect(rectX, rectY, width, rectHeight, className)
    ], x, y, className, angle);
}
export default {
    getGroup,
    getRect,
    getCircle,
    getBackground,
    getBlock,
    getBricks,
    getCapsule
};
