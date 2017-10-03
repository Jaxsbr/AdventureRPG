class MatchState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;

    mousePoint: Point;

    backgroundImage: HTMLImageElement;

    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.mousePoint = new Point(0, 0);        
    }

    init() {
        this.backgroundImage = this.game.assetManager.getImage('matchBackground');        
    }

    update(delta: number) {
        
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWorker.clear(context, this.game.screenBounds);
        this.renderWorker.renderImage(context, this.backgroundImage,
            this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);
    }

    mouseDown() {
        
    }

    mouseUp() {

    }

    mouseMove(x: number, y: number) {
        this.mousePoint.x = x;
        this.mousePoint.y = y;
    }

    resize() {
        
    }
}