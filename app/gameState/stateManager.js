var StateManager = (function () {
    function StateManager(game) {
        this.game = game;
    }
    StateManager.prototype.changeGameState = function (newState) {
        if (this.game.currentState) {
            this.game.currentState.active = false;
        }
        if (newState) {
            this.game.currentState = newState;
            this.game.currentState.init();
            this.game.currentState.active = true;
        }
    };
    return StateManager;
}());
//# sourceMappingURL=stateManager.js.map