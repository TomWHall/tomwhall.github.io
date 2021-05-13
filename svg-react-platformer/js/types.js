// Shared
var Direction;
(function (Direction) {
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
})(Direction || (Direction = {}));
// Nodes / GameObject
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Group"] = 1] = "Group";
    NodeType[NodeType["Rect"] = 2] = "Rect";
    NodeType[NodeType["Circle"] = 3] = "Circle";
})(NodeType || (NodeType = {}));
var GameObjectType;
(function (GameObjectType) {
    GameObjectType[GameObjectType["Background"] = 0] = "Background";
    GameObjectType[GameObjectType["Solid"] = 1] = "Solid";
    GameObjectType[GameObjectType["Fatal"] = 2] = "Fatal";
    GameObjectType[GameObjectType["Collectable"] = 3] = "Collectable";
})(GameObjectType || (GameObjectType = {}));
export { Direction, NodeType, GameObjectType };
