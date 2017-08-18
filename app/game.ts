class Game {

    gameTime: GameTime;

    canvas: HTMLCanvasElement;
    renderingContext: CanvasRenderingContext2D;

    currentState: GameStateInterface = null;
    loadState: LoadState;
    menuState: MenuState;
    worldState: GameStateInterface;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;    
    }

    // TODO:
    // State Management
    // Asset Loading
    // Rendering

    start() {
        this.gameTime = new GameTime();
        this.initCanvas();
        this.initGameStates();
    }

    initCanvas() {
        this.renderingContext = this.canvas.getContext('2d');
    }

    initGameStates() {
        this.loadState = new LoadState();
        this.menuState = new MenuState();
        this.worldState = new WorldState();
        this.currentState = this.loadState;
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
}