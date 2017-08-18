interface GameStateInterface {
    game: Game;
    update(delta: number): void;
    render(context: CanvasRenderingContext2D): void;
}