let gameHost;
function animate(time) {
    requestAnimationFrame(animate);
    gameHost.invokeMethodAsync('TickGame').then(() => { });
}
window.BlazorTest = {
    startGameLoop: function (gameHostObj) {
        console.log('startGameLoop enter');
        gameHost = gameHostObj;
        animate(performance.now());
    }
};
export {};
//# sourceMappingURL=App.js.map