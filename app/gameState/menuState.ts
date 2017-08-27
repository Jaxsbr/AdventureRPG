class MenuState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;
    menu: Menu;
    mousePoint: Point;
    
    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;        
    }

    init() {
        this.menu = new Menu(this.game, this.stateManager, this.renderWorker);
        this.mousePoint = new Point(0, 0);
    }

    update(delta: number) {
        this.menu.update(delta);
    }

    render(context: CanvasRenderingContext2D) {
        this.menu.render(context);
    }

    mouseDown() {
        // TODO:
        // Check mobile: TAP
        this.menu.tap(this.mousePoint);
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