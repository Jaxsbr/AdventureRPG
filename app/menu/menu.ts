class Menu {
    game: Game;
    stateManager: StateManager;
    renderWorker: RenderWorker;

    backgroundImage: HTMLImageElement;
    playImage: HTMLImageElement;

    playButtonRect: Rectangle;
    playAnimation: Animation;


    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;

        this.backgroundImage = this.game.assetManager.getImage('menuBackground');
        this.playImage = this.game.assetManager.getImage('play');

        this.playButtonRect = new Rectangle(0, 0, 200, 110);
        this.playAnimation = new Animation(this.playImage, 0.08, 340, 78, 6, this.renderWorker);
    }

    update(delta: number) {
        this.updateButtonPosition();
        this.playAnimation.update(this.playButtonRect, delta);
    }

    updateButtonPosition() {
        let center = this.game.screenBounds.getCenter();
        let top = Math.round(center.y - this.playButtonRect.height / 2);
        let left = Math.round(center.x - this.playButtonRect.width / 2);
        this.playButtonRect.updatePosition(left, top);        
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWorker.clear(context, this.game.screenBounds);        
        this.renderWorker.renderImage(context, this.backgroundImage, 
            this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);

        this.playAnimation.draw(context);
    }

    tap(point: Point) {
        let tapRect = new Rectangle(point.x, point.y, 1, 1);        
        if (this.playButtonRect.intersectRect(tapRect)) {
            this.stateManager.changeGameState(this.game.worldState);
        }
    }
}