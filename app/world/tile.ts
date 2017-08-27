class Tile {
    map: Map;
    tileMapImage: HTMLImageElement;    
    tileIndex: number;
    sourceCoords: Point;

    col: number;
    row: number;
    source: Rectangle;
    destination: Rectangle;

    constructor(map: Map, tileMapImage: HTMLImageElement, tileIndex: number, sourceCoords: Point, col: number, row: number) {
        this.map = map;
        this.tileMapImage = tileMapImage;        
        this.tileIndex = tileIndex;
        this.sourceCoords = sourceCoords;
        this.col = col;
        this.row = row;

        this.source = new Rectangle(
            sourceCoords.x * this.map.tileMapTileWidth, 
            sourceCoords.y * this.map.tileMapTileHeight, 
            this.map.tileMapTileWidth, 
            this.map.tileMapTileHeight),
        this.destination = new Rectangle(0,0,0,0);

        this.update();
    }

    render(renderWorker: RenderWorker, context: CanvasRenderingContext2D) {
        renderWorker.renderImageSource(
            context,
            this.tileMapImage,
            this.source,
            this.destination);
    }

    update() {
        this.destination.x = this.map.screenOffset.x + this.col * this.map.tileWidth; 
        this.destination.y = this.map.screenOffset.y + this.row * this.map.tileHeight;
        this.destination.width = this.map.tileWidth;
        this.destination.height = this.map.tileHeight;
    }
}