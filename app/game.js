var Game = (function () {
    function Game(canvas) {
        this.currentState = null;
        this.canvas = canvas;
    }
    // TODO:
    // State Management
    // Asset Loading
    // Rendering
    Game.prototype.start = function () {
        this.renderingContext = this.canvas.getContext('2d');
        this.initGameStates();
    };
    Game.prototype.initGameStates = function () {
        this.loadState = new LoadState();
        this.menuState = new MenuState();
        this.worldState = new WorldState();
        this.currentState = this.loadState;
    };
    Game.prototype.mouseDown = function () {
    };
    Game.prototype.mouseUp = function () {
    };
    Game.prototype.mouseMove = function (x, y) {
    };
    Game.prototype.loop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.loop(); });
        if (this.currentState) {
            this.currentState.update(0);
        }
    };
    return Game;
}());
//# sourceMappingURL=game.js.map