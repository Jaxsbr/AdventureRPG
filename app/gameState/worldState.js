var WorldState = (function () {
    function WorldState(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.mousePoint = new Point(0, 0);
    }
    WorldState.prototype.init = function () {
        this.backgroundImage = this.game.assetManager.getImage('menuBackground');
        this.currentMap = new Map(this.game, this.stateManager, this.renderWorker);
        this.currentMap.loadMap('map1');
    };
    WorldState.prototype.update = function (delta) {
        this.currentMap.update(delta);
    };
    WorldState.prototype.render = function (context) {
        this.renderWorker.clear(context, this.game.screenBounds);
        this.renderWorker.renderImage(context, this.backgroundImage, this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);
        //this.renderWorker.renderText(context, 'World State', 100, 100);
        this.currentMap.render(context);
    };
    WorldState.prototype.mouseDown = function () {
        // TODO:
        // Check mobile: TAP
        this.currentMap.tap(this.mousePoint);
    };
    WorldState.prototype.mouseUp = function () {
    };
    WorldState.prototype.mouseMove = function (x, y) {
        this.mousePoint.x = x;
        this.mousePoint.y = y;
    };
    WorldState.prototype.resize = function () {
        this.currentMap.resize();
    };
    return WorldState;
}());
//# sourceMappingURL=worldState.js.map