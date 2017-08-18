class Game {

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

    mouseDown() {

    }

    mouseUp() {
        
    }

    mouseMove(x: number, y: number) {

    }

    loop() {        
        if (this.currentState) {
            this.currentState.update(0);
            this.currentState.render(this.renderingContext);
        }
        requestAnimationFrame(() => this.loop());
    }
}