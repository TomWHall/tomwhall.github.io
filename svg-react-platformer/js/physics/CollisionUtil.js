import { GameObjectType, NodeType } from "../types.js";
function rectCollides(rect, offset, testTopLeft, testBottomRight) {
    // Exclude if allow pass-through
    if (rect.passThrough)
        return false;
    const rectX = rect.x + offset[0];
    const rectY = rect.y + offset[1];
    return !(rectX + rect.width <= testTopLeft[0] ||
        rectX >= testBottomRight[0] ||
        rectY + rect.height <= testTopLeft[1] ||
        rectY >= testBottomRight[1]);
}
// Adapted from https://stackoverflow.com/a/402010
function circleCollides(circle, offset, testTopLeft, testBottomRight) {
    const circleX = circle.x + offset[0];
    const circleY = circle.y + offset[1];
    const collisionBoxWidth = testBottomRight[0] - testTopLeft[0];
    const collisionBoxHeight = testBottomRight[1] - testTopLeft[1];
    const collisionBoxCenter = [testTopLeft[0] + (collisionBoxWidth / 2), testTopLeft[1] + (collisionBoxHeight / 2)];
    const circleDistanceX = Math.abs(circleX - collisionBoxCenter[0]);
    const circleDistanceY = Math.abs(circleY - collisionBoxCenter[1]);
    if (circleDistanceX > (collisionBoxWidth / 2 + circle.radius))
        return false;
    if (circleDistanceY > (collisionBoxHeight / 2 + circle.radius))
        return false;
    if (circleDistanceX <= (collisionBoxWidth / 2))
        return true;
    if (circleDistanceY <= (collisionBoxHeight / 2))
        return true;
    const cornerDistanceSquared = (circleDistanceX - collisionBoxWidth / 2) ^ 2 + (circleDistanceY - collisionBoxHeight / 2) ^ 2;
    return (cornerDistanceSquared <= (circle.radius ^ 2));
}
function getFirstCollidingNodePrivate(testTopLeft, testBottomRight, node, offset) {
    if (node.ignoreCollision)
        return null;
    if (node.type === NodeType.Group) {
        for (let childNodeIndex = 0; childNodeIndex < node.children.length; childNodeIndex++) {
            const childNode = node.children[childNodeIndex];
            const childTestResult = getFirstCollidingNodePrivate(testTopLeft, testBottomRight, childNode, [offset[0] + node.x, offset[1] + node.y]);
            if (childTestResult !== null) {
                return childTestResult;
            }
        }
        return null;
    }
    switch (node.type) {
        case NodeType.Rect:
            {
                const rect = node;
                if (rectCollides(rect, offset, testTopLeft, testBottomRight))
                    return node;
                break;
            }
        case NodeType.Circle:
            if (circleCollides(node, offset, testTopLeft, testBottomRight))
                return node;
            break;
    }
    return null;
}
function getFirstCollidingNode(testTopLeft, testBottomRight, gameObjects, gameObjectType) {
    for (let gameObjectIndex = 0; gameObjectIndex < gameObjects.length; gameObjectIndex++) {
        const gameObject = gameObjects[gameObjectIndex];
        if (gameObject.type !== gameObjectType)
            continue;
        const result = getFirstCollidingNodePrivate(testTopLeft, testBottomRight, gameObject.node, [gameObject.x, gameObject.y]);
        if (result !== null) {
            return result;
        }
    }
    return null;
}
function collides(x, y, gameObjects, gameObjectType) {
    return getFirstCollidingNode([x, y], [x + 32, y + 128], gameObjects, gameObjectType) !== null;
}
function isOnRect(x, y, rect, offset) {
    const rectX = rect.x + offset[0];
    const rectY = rect.y + offset[1];
    return rectY === y + 128 &&
        !(rectX + rect.width <= x || rectX >= x + 32);
}
function getFirstRectOnPrivate(x, y, node, offset) {
    if (node.ignoreCollision)
        return null;
    if (node.type === NodeType.Group) {
        for (let childNodeIndex = 0; childNodeIndex < node.children.length; childNodeIndex++) {
            const childNode = node.children[childNodeIndex];
            const childTestResult = getFirstRectOnPrivate(x, y, childNode, [offset[0] + node.x, offset[1] + node.y]);
            if (childTestResult !== null) {
                return childTestResult;
            }
        }
        return null;
    }
    if (node.type !== NodeType.Rect)
        return null;
    const rect = node;
    if (isOnRect(x, y, rect, offset))
        return rect;
    return null;
}
function getFirstRectOn(x, y, gameObjects) {
    for (let gameObjectIndex = 0; gameObjectIndex < gameObjects.length; gameObjectIndex++) {
        const gameObject = gameObjects[gameObjectIndex];
        if (gameObject.type !== GameObjectType.Solid)
            continue;
        const result = getFirstRectOnPrivate(x, y, gameObject.node, [gameObject.x, gameObject.y]);
        if (result !== null) {
            return result;
        }
    }
    return null;
}
function isOnSolidRect(x, y, gameObjects) {
    return getFirstRectOn(x, y, gameObjects) !== null;
}
export default {
    collides: collides,
    isOnSolidRect: isOnSolidRect
};
