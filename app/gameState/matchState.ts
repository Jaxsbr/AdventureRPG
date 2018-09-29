class MatchState implements GameStateInterface {
    game: Game;
    active: boolean;
    stateManager: StateManager;
    renderWorker: RenderWorker;

    mousePoint: Point;

    backgroundImage: HTMLImageElement;
    enemyImage: HTMLImageElement;
    playerImage: HTMLImageElement;

    enemyRect: Rectangle;
    playerRect: Rectangle;

    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.mousePoint = new Point(0, 0);        
    }

    init() {
        this.backgroundImage = this.game.assetManager.getImage('matchBackground');  
        this.enemyImage = this.game.assetManager.getImage('enemy');      
        this.playerImage = this.game.assetManager.getImage('player');      

        this.enemyRect = new Rectangle(250, 150, 128, 128);
        this.playerRect = new Rectangle(500, 500, 128, 128);

        this.resize();
    }

    update(delta: number) {
        this.calculateEntityBounds();
    }

    calculateEntityBounds() {
        this.enemyRect.x = this.game.screenBounds.x + this.enemyRect.width * 2;
        this.enemyRect.y = this.game.screenBounds.getCenter().y - this.enemyRect.height;

        this.playerRect.x = this.game.screenBounds.right - this.playerRect.width * 3;
        this.playerRect.y = this.game.screenBounds.getCenter().y + this.playerRect.height;
    }

    render(context: CanvasRenderingContext2D) {
        this.renderWorker.clear(context, this.game.screenBounds);
        this.renderWorker.renderImage(context, this.backgroundImage,
            this.game.screenBounds.x, this.game.screenBounds.y, this.game.screenBounds.width, this.game.screenBounds.height);

        this.renderWorker.renderImageRect(context, this.enemyImage, this.enemyRect);
        this.renderWorker.renderImageRect(context, this.playerImage, this.playerRect);
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
        this.enemyRect.width = this.game.screenBounds.width / 18;
        this.enemyRect.height = this.game.screenBounds.height / 9;

        this.playerRect.width = this.game.screenBounds.width / 18;
        this.playerRect.height = this.game.screenBounds.height / 9;
    }

    completeMath() {
        // TODO:
        // 1) If player kills enemy >> Destroy enemy from world state
        // 2) If enemy kills player >> Reset game >> Show game end screen/score >> Show game menu
        this.stateManager.changeGameState(this.game.worldState);
    }
}