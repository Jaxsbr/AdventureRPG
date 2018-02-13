var Game = (function () {
    function Game(canvas) {
        this.canvas = canvas;
    }
    Game.prototype.start = function () {
        this.gameTime = new GameTime();
        this.assetManager = new AssetManager();
        this.initCanvas();
        this.initGameStates();
        this.loop();
    };
    Game.prototype.initCanvas = function () {
        this.renderingContext = this.canvas.getContext('2d');
        this.renderWorker = new RenderWorker();
        this.resize();
    };
    Game.prototype.initGameStates = function () {
        this.stateManager = new StateManager(this);
        this.loadState = new LoadState(this, this.stateManager, this.renderWorker);
        this.menuState = new MenuState(this, this.stateManager, this.renderWorker);
        this.worldState = new WorldState(this, this.stateManager, this.renderWorker);
        this.matchState = new MatchState(this, this.stateManager, this.renderWorker);
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
    Game.prototype.resize = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.screenBounds = new Rectangle(0, 0, this.canvas.width, this.canvas.height);
        if (this.currentState && this.currentState.active) {
            this.currentState.resize();
        }
    };
    return Game;
}());
window.onload = function () {
    var canvas = document.getElementById('mycanvas');
    var game = new Game(canvas);
    game.start();
    window.addEventListener('mousedown', function () { game.mouseDown(); });
    window.addEventListener('mouseup', function () { game.mouseUp(); });
    window.addEventListener('mousemove', function (e) { game.mouseMove(e.clientX, e.clientY); });
    window.addEventListener('resize', function () { game.resize(); });
};
//# sourceMappingURL=game.js.map