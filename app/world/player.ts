class Player {    
    tile: Tile;
    bounds: Rectangle;
    image: HTMLImageElement;
    sourceRect: Rectangle;

    constructor(tile: Tile, assetManager: AssetManager) {
        this.tile = tile;
        this.bounds = new Rectangle(
            this.tile.destination.x + 2,
            this.tile.destination.y + 2,
            this.tile.destination.width - 4,
            this.tile.destination.height - 4);
        this.image = assetManager.getImage('player');
        this.sourceRect = new Rectangle(0, 0, 64, 64);

        this.bounds.updatePosition(
            this.bounds.x + 64,
            this.bounds.y + 64
        )
    }

    update(delta: number) {

    }

    render(renderWorker: RenderWorker, context: CanvasRenderingContext2D) {
        renderWorker.renderImageSource(
            context,
            this.image,
            this.sourceRect,
            this.bounds);
    }
}