class WorldState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;

    maps: string[];
    currentMap: Map;
    
    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
    }

    init() {
        
        this.currentMap = new Map(this.game, this.stateManager, this.renderWorker);
        this.currentMap.loadMap('map1');
    }

    update(delta: number) {
        
    }    

    render(context: CanvasRenderingContext2D) {
        this.renderWorker.clear(context, this.game.screenBounds);         
        this.renderWorker.renderText(context, 'World State', 100, 100);
        this.currentMap.render(context);
    }    

    mouseDown() {
        
    }

    mouseUp() {

    }

    mouseMove(x: number, y: number) {

    }
}