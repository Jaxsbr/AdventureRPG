class Menu {
    game: Game;
    stateManager: StateManager;
    renderWorker: RenderWorker;

    backgroundImage: HTMLImageElement;
    playImage: HTMLImageElement;

    playButtonRect: Rectangle;
    playAnimation: Animation;

    // shrink: boolean;
    // tick: number;
    // ellapsed: number;
    // helpText: string;


    // TODO:
    // Replace pulsing menu button calculation simple with animation.


    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;

        this.backgroundImage = this.game.assetManager.getImage('menuBackground');
        this.playImage = this.game.assetManager.getImage('play');

        this.playButtonRect = new Rectangle(0, 0, 200, 110);
        this.playAnimation = new Animation(this.playImage, 0.08, 340, 78, 6, this.renderWorker);

        // this.shrink = false;
        // this.tick = 0.8;
        // this.ellapsed = 0;
    }

    update(delta: number) {
        //this.updatePulse(delta);
        //this.updateSize();
        this.updateButtonPosition();
        this.playAnimation.update(this.playButtonRect, delta);
    }

    updatePulse(delta: number) {
        // this.ellapsed += delta;
        // if (this.ellapsed >= this.tick) {
        //     this.ellapsed = 0;
        //     this.shrink = !this.shrink;
        // }        
    }

    updateSize() {
        // let crement = this.shrink ? -0.8 : 0.8;
        // this.playButtonRect.width += crement;
        // this.playButtonRect.height += crement;
    }

    updateButtonPosition() {
        let center = this.game.screenBounds.getCenter();
        let top = center.y - this.playButtonRect.height / 2;
        let left = center.x - this.playButtonRect.width / 2;
        this.playButtonRect.updatePosition(left, top);        
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWorker.clear(context, this.game.screenBounds);        
        this.renderWorker.renderImage(context, this.backgroundImage, 
            this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);

        this.playAnimation.draw(context);


        // this.renderWorker.renderImage(context, this.playImage,
        //     this.playButtonRect.x, this.playButtonRect.y, this.playButtonRect.width, this.playButtonRect.height);

        //this.renderWorker.renderText(context, 'Menu State', 100, 100);
        //this.renderWorker.renderText(context, this.helpText, 100, 150);
    }

    tap(point: Point) {
        let tapRect = new Rectangle(point.x, point.y, 1, 1);        
        if (this.playButtonRect.intersectRect(tapRect)) {
            this.stateManager.changeGameState(this.game.worldState);
        }
    }
}