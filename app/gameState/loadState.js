var LoadState = (function () {
    function LoadState(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
    }
    LoadState.prototype.update = function (delta) {
    };
    LoadState.prototype.render = function (context) {
        this.renderWorker.renderText(context, 'Load State', 100, 100);
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