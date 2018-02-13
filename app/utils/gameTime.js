var GameTime = (function () {
    function GameTime() {
        this.delta = 0;
        this.previousLoopTime = Date.now();
    }
    GameTime.prototype.update = function () {
        var currentTime = Date.now();
        var delta = currentTime - this.previousLoopTime;
        this.delta = delta / 1000;
        this.previousLoopTime = currentTime;
    };
    return GameTime;
}());
//# sourceMappingURL=gameTime.js.map