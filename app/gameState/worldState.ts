class WorldState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;

    mousePoint: Point;

    backgroundImage: HTMLImageElement;

    maps: string[];
    currentMap: Map;

    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.mousePoint = new Point(0, 0);        
    }

    init() {
        this.backgroundImage = this.game.assetManager.getImage('menuBackground');

        this.currentMap = new Map(this.game, this.stateManager, this.renderWorker);
        this.currentMap.loadMap('map1');        
    }

    update(delta: number) {
        this.currentMap.update(delta);
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWorker.clear(context, this.game.screenBounds);

        this.renderWorker.renderImage(context, this.backgroundImage,
            this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);

        //this.renderWorker.renderText(context, 'World State', 100, 100);



        this.currentMap.render(context);
    }

    mouseDown() {
        // TODO:
        // Check mobile: TAP
        this.currentMap.tap(this.mousePoint);
    }

    mouseUp() {

    }

    mouseMove(x: number, y: number) {
        this.mousePoint.x = x;
        this.mousePoint.y = y;
    }

    resize() {
        this.currentMap.updateTiles();
    }
}