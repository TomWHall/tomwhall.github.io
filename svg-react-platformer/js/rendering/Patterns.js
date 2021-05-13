import Styles from "../Styles.js";
function getBricks() {
    return (React.createElement("pattern", { id: "bricks", width: "16", height: "16", patternUnits: "userSpaceOnUse" },
        React.createElement("rect", { x: "0", y: "0", width: "16", height: "16", fill: Styles.grey }),
        React.createElement("rect", { x: "0", y: "0", width: "14", height: "6", className: Styles.red }),
        React.createElement("rect", { x: "0", y: "8", width: "6", height: "6", className: Styles.red }),
        React.createElement("rect", { x: "8", y: "8", width: "8", height: "6", className: Styles.red })));
}
function getDanceFloor() {
    return (React.createElement("pattern", { id: "dance-floor", width: "32", height: "32", patternUnits: "userSpaceOnUse" },
        React.createElement("rect", { x: "0", y: "0", width: "32", height: "32", fill: Styles.black }),
        React.createElement("rect", { x: "0", y: "0", width: "32", height: "2", className: Styles.white }),
        React.createElement("rect", { x: "0", y: "30", width: "32", height: "2", className: Styles.white }),
        React.createElement("rect", { x: "0", y: "4", width: "8", height: "8", className: Styles.white }),
        React.createElement("rect", { x: "16", y: "4", width: "8", height: "8", className: Styles.white }),
        React.createElement("rect", { x: "8", y: "12", width: "8", height: "8", className: Styles.white }),
        React.createElement("rect", { x: "24", y: "12", width: "8", height: "8", className: Styles.white }),
        React.createElement("rect", { x: "0", y: "20", width: "8", height: "8", className: Styles.white }),
        React.createElement("rect", { x: "16", y: "20", width: "8", height: "8", className: Styles.white })));
}
function getCup() {
    return (React.createElement("pattern", { id: "cup", width: "32", height: "32", patternUnits: "userSpaceOnUse" },
        React.createElement("svg", { width: "32", height: "32" },
            React.createElement("rect", { x: "14", y: "0", width: "4", height: "32", className: Styles.yellow }),
            React.createElement("circle", { cx: "16", cy: "-12", r: "24", className: Styles.yellow }),
            React.createElement("circle", { cx: "16", cy: "42", r: "16", className: Styles.yellow }))));
}
const Patterns = () => {
    return React.createElement(React.Fragment, null,
        getBricks(),
        getDanceFloor(),
        getCup());
};
export default Patterns;
