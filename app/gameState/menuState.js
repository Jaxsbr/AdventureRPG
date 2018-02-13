var MenuState = (function () {
    function MenuState(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
    }
    MenuState.prototype.init = function () {
        this.menu = new Menu(this.game, this.stateManager, this.renderWorker);
        this.mousePoint = new Point(0, 0);
    };
    MenuState.prototype.update = function (delta) {
        this.menu.update(delta);
    };
    MenuState.prototype.render = function (context) {
        this.menu.render(context);
    };
    MenuState.prototype.mouseDown = function () {
        // TODO:
        // Check mobile: TAP
        this.menu.tap(this.mousePoint);
    };
    MenuState.prototype.mouseUp = function () {
    };
    MenuState.prototype.mouseMove = function (x, y) {
        this.mousePoint.x = x;
        this.mousePoint.y = y;
    };
    MenuState.prototype.resize = function () {
    };
    return MenuState;
}());
//# sourceMappingURL=menuState.js.map