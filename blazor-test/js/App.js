let gameHost;
window.BlazorTest = {
    startGameLoop: function (gameHostObj) {
        console.log('startGameLoop enter');
        gameHost = gameHostObj;
        setTimeout(() => {
            gameHost.invokeMethodAsync('TickGame').then(() => {
                console.log('Tick complete');
            });
        }, 3000);
    }
};
export {};
//# sourceMappingURL=App.js.map