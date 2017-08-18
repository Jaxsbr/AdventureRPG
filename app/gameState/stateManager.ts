class StateManager {
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    changeGameState(newState: GameStateInterface) {
        if (this.game.currentState) {
            this.game.currentState.active = false;
        }
        if (newState) {
            this.game.currentState = newState;
            this.game.currentState.active = true;
        }
    }
}