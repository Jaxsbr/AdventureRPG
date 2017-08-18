var MenuState = (function () {
    function MenuState(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
    }
    MenuState.prototype.update = function (delta) {
    };
    MenuState.prototype.render = function (context) {
        this.renderWorker.renderText(context, 'Menu State', 100, 100);
    };
    MenuState.prototype.mouseDown = function () {
    };
    MenuState.prototype.mouseUp = function () {
    };
    MenuState.prototype.mouseMove = function (x, y) {
    };
    return MenuState;
}());
//# sourceMappingURL=menuState.js.map