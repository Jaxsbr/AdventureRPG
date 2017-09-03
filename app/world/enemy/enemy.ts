class Enemy {
    map: Map;
    tile: CollisionTile;
    bounds: Rectangle;
    image: HTMLImageElement;
    sourceRect: Rectangle;

    aggroDistance: number = 35;
    rotation: number; //0up 1right 2down 3left

    constructor(map: Map, tile: CollisionTile, assetManager: AssetManager) {
        this.map = map;
        this.tile = tile;
        this.bounds = tile.destination.clone();
        this.bounds.adjustSize(2, 2, true);
        this.image = assetManager.getImage('enemy');
        this.sourceRect = new Rectangle(0, 0, 64, 64);
    }

    udpate(delta: number) {

    }

    setPosition() {        
        this.bounds.updatePosition(this.tile.destination.x, this.tile.destination.y);
    }

    render(context: CanvasRenderingContext2D) {
        this.map.renderWorker.renderImageSource(
            context,
            this.image,
            this.sourceRect,
            this.bounds);
    }
}