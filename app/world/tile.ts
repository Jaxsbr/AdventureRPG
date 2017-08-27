class Tile {
    map: Map;
    tileMapImage: HTMLImageElement;    
    tileIndex: number;
    sourceCoords: Point;

    source: Rectangle;
    destination: Rectangle;

    constructor(map: Map, tileMapImage: HTMLImageElement, tileIndex: number, sourceCoords: Point, col: number, row: number) {
        this.map = map;
        this.tileMapImage = tileMapImage;        
        this.tileIndex = tileIndex;
        this.sourceCoords = sourceCoords;

        this.source = new Rectangle(
            sourceCoords.x * this.map.tileMapTileWidth, 
            sourceCoords.y * this.map.tileMapTileHeight, 
            this.map.tileMapTileWidth, 
            this.map.tileMapTileHeight),

        this.destination = new Rectangle(
            this.map.screenOffset.x + col * this.map.tileWidth, 
            this.map.screenOffset.y + row * this.map.tileHeight, 
            this.map.tileWidth, 
            this.map.tileHeight);
    }

    render(renderWorker: RenderWorker, context: CanvasRenderingContext2D) {
        renderWorker.renderImageSource(
            context,
            this.tileMapImage,
            this.source,
            this.destination);
    }
}