class Map {
    game: Game;   
    stateManager: StateManager;
    renderWorker: RenderWorker; 
    //mapAsset: MapAsset;

    tileCols: number;
    tileRows: number;
    tileWidth: number;
    tileHeight: number;    
    tileMapCols: number;
    tileMapRows: number;
    tileMapTileWidth: number;
    tileMapTileHeight: number;
    tileMapImageKey: string;
    visualLayers: any;

    tilemapImage: HTMLImageElement;
    

    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {  
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
    }

    loadMap(mapIndex: string) {
        let mapAsset = this.game.assetManager.getMap(mapIndex);

        this.tileCols = mapAsset.jsonRaw.tileCols;
        this.tileRows = mapAsset.jsonRaw.tileRows;
        this.tileWidth = mapAsset.jsonRaw.tileWidth;
        this.tileHeight = mapAsset.jsonRaw.tileHeight;        
        this.tileMapCols = mapAsset.jsonRaw.tileMapCols;
        this.tileMapRows = mapAsset.jsonRaw.tileMapRows;
        this.tileMapTileWidth = mapAsset.jsonRaw.tileMapTileWidth;
        this.tileMapTileHeight = mapAsset.jsonRaw.tileMapTileHeight;
        this.tileMapImageKey = mapAsset.jsonRaw.tileMapImageKey;
        this.visualLayers = mapAsset.jsonRaw.visualLayers;

        this.tilemapImage = this.game.assetManager.getImage(this.tileMapImageKey);
    }

    update(delta: number) {
        
    }    

    render(context: CanvasRenderingContext2D) {        
        this.renderWorker.renderText(context, 'Map', 100, 120);
        this.renderLayers(context);
    }  

    renderLayers(context: CanvasRenderingContext2D) {               
        this.visualLayers.forEach(data => {
            let row = 0;
            let col = 0;
            data.forEach(val => {            
                let sourceCoords = this.getSourceCoordsFromIndex(val as number);

                this.renderWorker.renderImageSource(
                    context,
                    this.tilemapImage,
                    new Rectangle(sourceCoords.x * this.tileMapTileWidth, sourceCoords.y * this.tileMapTileHeight, this.tileMapTileWidth, this.tileMapTileHeight),
                    new Rectangle(col * this.tileWidth, row * this.tileHeight, this.tileWidth, this.tileHeight));

                col++;
                if (col === this.tileCols) {
                    // Move to next row and reset col.
                    col = 0;
                    row++;
                }
            })
        });
    }

    getSourceCoordsFromIndex(index: number): Point {
        // TODO:
        // Re look at this, find cleaner solution.

        let coord = new Point(-1, -1);
        let val = 0;
        for (let row = 0; row < this.tileMapRows; row++) {                    
            for (let col = 0; col < this.tileMapCols; col++) {
                if (val === index) {
                    coord.x = col;
                    coord.y = row;
                }
                val++;
            }
        }
        return coord;
    }
}