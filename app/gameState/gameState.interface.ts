interface GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;
    update(delta: number): void;
    render(context: CanvasRenderingContext2D): void;
    mouseDown(): void;
    mouseUp(): void;
    mouseMove(x: number, y: number): void;
}