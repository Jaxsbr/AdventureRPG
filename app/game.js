var Game = (function () {
    function Game(canvas) {
        this.canvas = canvas;
    }
    // TODO:
    // State Management
    // Asset Loading
    // Rendering
    Game.prototype.start = function () {
        this.gameTime = new GameTime();
        this.initCanvas();
        this.initGameStates();
    };
    Game.prototype.initCanvas = function () {
        this.renderingContext = this.canvas.getContext('2d');
    };
    Game.prototype.initGameStates = function () {
        this.stateManager = new StateManager(this);
        this.loadState = new LoadState(this, this.stateManager);
        this.menuState = new MenuState(this, this.stateManager);
        this.worldState = new WorldState(this, this.stateManager);
        this.stateManager.changeGameState(this.loadState);
    };
    Game.prototype.loop = function () {
        var _this = this;
        this.gameTime.update();
        if (this.currentState && this.currentState.active) {
            this.currentState.update(this.gameTime.delta);
            this.currentState.render(this.renderingContext);
        }
        requestAnimationFrame(function () { return _this.loop(); });
    };
    Game.prototype.mouseDown = function () {
        if (this.currentState && this.currentState.active) {
            this.currentState.mouseDown();
        }
    };
    Game.prototype.mouseUp = function () {
        if (this.currentState && this.currentState.active) {
            this.currentState.mouseUp();
        }
    };
    Game.prototype.mouseMove = function (x, y) {
        if (this.currentState && this.currentState.active) {
            this.currentState.mouseMove(x, y);
        }
    };
    return Game;
}());
//# sourceMappingURL=game.js.map