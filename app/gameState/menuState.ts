class MenuState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    
    constructor(game: Game, stateManger: StateManager) {
        this.game = game;
        this.stateManager = stateManger;
    }

    update(delta: number) {
        
    }

    render(context: CanvasRenderingContext2D) {
        
    }

    mouseDown() {
        
    }

    mouseUp() {

    }

    mouseMove(x: number, y: number) {

    }
}