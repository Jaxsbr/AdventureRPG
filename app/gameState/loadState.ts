class LoadState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;


    
    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;

        this.game.assetManager.init();
    }



    update(delta: number) {
        this.game.assetManager.update();

        if (this.game.assetManager.loadCompleted) {
            this.stateManager.changeGameState(this.game.menuState);
        }
    }

    render(context: CanvasRenderingContext2D) {   
        this.renderWorker.clear(context, this.game.screenBounds);
        let text = 'Loading ' + this.game.assetManager.loadedAssets +
        '/' + this.game.assetManager.totalAssets;

        this.renderWorker.renderText(context, text, 100, 100);
    }

    mouseDown() {
        
    }

    mouseUp() {

    }

    mouseMove(x: number, y: number) {

    }
}