var LoadState = (function () {
    function LoadState(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.game.assetManager.init();
    }
    LoadState.prototype.update = function (delta) {
        this.game.assetManager.update();
        if (this.game.assetManager.loadCompleted) {
            this.stateManager.changeGameState(this.game.menuState);
        }
    };
    LoadState.prototype.render = function (context) {
        this.renderWorker.clear(context, this.game.screenBounds);
        var text = 'Loading ' + this.game.assetManager.loadedAssets +
            '/' + this.game.assetManager.totalAssets;
        this.renderWorker.renderText(context, text, 100, 100);
    };
    LoadState.prototype.mouseDown = function () {
    };
    LoadState.prototype.mouseUp = function () {
    };
    LoadState.prototype.mouseMove = function (x, y) {
    };
    return LoadState;
}());
//# sourceMappingURL=loadState.js.map