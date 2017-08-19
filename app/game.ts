class Game {

    gameTime: GameTime;

    canvas: HTMLCanvasElement;
    screenBounds: Rectangle;
    renderingContext: CanvasRenderingContext2D;
    renderWorker: RenderWorker;

    stateManager: StateManager;
    currentState: GameStateInterface;
    loadState: LoadState;
    menuState: MenuState;
    worldState: GameStateInterface;    

    assetManager: AssetManager;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;    
    }

    start() {
        this.gameTime = new GameTime();
        this.assetManager = new AssetManager();
        this.initCanvas();
        this.initGameStates();        
        this.loop();
    }

    initCanvas() {
        this.renderingContext = this.canvas.getContext('2d');
        this.renderWorker = new RenderWorker();        
        this.resize();        
    }

    initGameStates() {
        this.stateManager = new StateManager(this);
        this.loadState = new LoadState(this, this.stateManager, this.renderWorker);
        this.menuState = new MenuState(this, this.stateManager, this.renderWorker);
        this.worldState = new WorldState(this, this.stateManager, this.renderWorker);
        this.stateManager.changeGameState(this.loadState);
    }

    loop() {        
        this.gameTime.update();
        if (this.currentState && this.currentState.active) {
            this.currentState.update(this.gameTime.delta);
            this.currentState.render(this.renderingContext);
        }
        requestAnimationFrame(() => this.loop());
    }

    mouseDown() {
        if (this.currentState && this.currentState.active) {
            this.currentState.mouseDown();
        }
    }

    mouseUp() {
        if (this.currentState && this.currentState.active) {
            this.currentState.mouseUp();
        }
    }

    mouseMove(x: number, y: number) {
        if (this.currentState && this.currentState.active) {
            this.currentState.mouseMove(x, y);
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.screenBounds = new Rectangle(0, 0, this.canvas.width, this.canvas.height);
    }
}


window.onload = () => {
    var canvas = document.getElementById('mycanvas');
    var game = new Game(canvas as HTMLCanvasElement);
    game.start();

    window.addEventListener('mousedown', function() { game.mouseDown(); } );
    window.addEventListener('mouseup', function () { game.mouseUp(); });
    window.addEventListener('mousemove', function (e) { game.mouseMove(e.clientX, e.clientY); });
    window.addEventListener('resize', function () { game.resize(); });
};