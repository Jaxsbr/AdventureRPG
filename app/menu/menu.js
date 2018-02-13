var Menu = (function () {
    function Menu(game, stateManger, renderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.backgroundImage = this.game.assetManager.getImage('menuBackground');
        this.playImage = this.game.assetManager.getImage('play');
        this.playButtonRect = new Rectangle(0, 0, 200, 110);
        this.playAnimation = new Animation(this.playImage, 0.08, 340, 78, 6, this.renderWorker);
    }
    Menu.prototype.update = function (delta) {
        this.updateButtonPosition();
        this.playAnimation.update(this.playButtonRect, delta);
    };
    Menu.prototype.updateButtonPosition = function () {
        var center = this.game.screenBounds.getCenter();
        var top = center.y - this.playButtonRect.height / 2;
        var left = center.x - this.playButtonRect.width / 2;
        this.playButtonRect.updatePosition(left, top);
    };
    Menu.prototype.render = function (context) {
        this.renderWorker.clear(context, this.game.screenBounds);
        this.renderWorker.renderImage(context, this.backgroundImage, this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);
        this.playAnimation.draw(context);
    };
    Menu.prototype.tap = function (point) {
        var tapRect = new Rectangle(point.x, point.y, 1, 1);
        if (this.playButtonRect.intersectRect(tapRect)) {
            this.stateManager.changeGameState(this.game.worldState);
        }
    };
    return Menu;
}());
//# sourceMappingURL=menu.js.map