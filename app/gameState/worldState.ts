class WorldState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;
    
    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
    }

    init() {
        
    }

    update(delta: number) {
        
    }    

    render(context: CanvasRenderingContext2D) {
        this.renderWorker.clear(context, this.game.screenBounds); 
        this.renderWorker.renderText(context, 'World State', 100, 100);
    }    

    mouseDown() {
        
    }

    mouseUp() {

    }

    mouseMove(x: number, y: number) {

    }
}