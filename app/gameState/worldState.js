var WorldState = (function () {
    function WorldState(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
    }
    WorldState.prototype.update = function (delta) {
    };
    WorldState.prototype.render = function (context) {
        this.renderWorker.renderText(context, 'World State', 100, 100);
    };
    WorldState.prototype.mouseDown = function () {
    };
    WorldState.prototype.mouseUp = function () {
    };
    WorldState.prototype.mouseMove = function (x, y) {
    };
    return WorldState;
}());
//# sourceMappingURL=worldState.js.map