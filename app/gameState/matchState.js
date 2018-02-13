var MatchState = (function () {
    function MatchState(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.mousePoint = new Point(0, 0);
    }
    MatchState.prototype.init = function () {
        this.backgroundImage = this.game.assetManager.getImage('matchBackground');
        this.enemyImage = this.game.assetManager.getImage('enemy');
        this.playerImage = this.game.assetManager.getImage('player');
        this.enemyRect = new Rectangle(250, 150, 128, 128);
        this.playerRect = new Rectangle(500, 500, 128, 128);
        this.resize();
    };
    MatchState.prototype.update = function (delta) {
        this.calculateEntityBounds();
    };
    MatchState.prototype.calculateEntityBounds = function () {
        this.enemyRect.x = this.game.screenBounds.x + this.enemyRect.width * 2;
        this.enemyRect.y = this.game.screenBounds.getCenter().y - this.enemyRect.height;
        this.playerRect.x = this.game.screenBounds.right - this.playerRect.width * 3;
        this.playerRect.y = this.game.screenBounds.getCenter().y + this.playerRect.height;
    };
    MatchState.prototype.render = function (context) {
        this.renderWorker.clear(context, this.game.screenBounds);
        this.renderWorker.renderImage(context, this.backgroundImage, this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);
        this.renderWorker.renderImageRect(context, this.enemyImage, this.enemyRect);
        this.renderWorker.renderImageRect(context, this.playerImage, this.playerRect);
    };
    MatchState.prototype.mouseDown = function () {
    };
    MatchState.prototype.mouseUp = function () {
    };
    MatchState.prototype.mouseMove = function (x, y) {
        this.mousePoint.x = x;
        this.mousePoint.y = y;
    };
    MatchState.prototype.resize = function () {
        this.enemyRect.width = this.game.screenBounds.width / 18;
        this.enemyRect.height = this.game.screenBounds.height / 9;
        this.playerRect.width = this.game.screenBounds.width / 18;
        this.playerRect.height = this.game.screenBounds.height / 9;
    };
    return MatchState;
}());
//# sourceMappingURL=matchState.js.map