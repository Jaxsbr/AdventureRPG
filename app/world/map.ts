class Map {
    game: Game;   
    stateManager: StateManager;
    renderWorker: RenderWorker; 
    screenOffset: Point;
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
    tileLayers: TileLayer[] = [];
    

    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {  
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;     
        this.screenOffset = new Point(0, 0);           
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
        this.calculateScreenOffset();
        this.loadMapTiles();
    }

    calculateScreenOffset() {        
        this.screenOffset.x = this.game.screenBounds.getCenter().x - ((this.tileCols * this.tileWidth) / 2);
        this.screenOffset.y = this.game.screenBounds.getCenter().y - ((this.tileRows * this.tileHeight) / 2);
    }

    loadMapTiles() {
        this.visualLayers.forEach(data => {
            let row = 0;
            let col = 0;            
            let grid: Tile[][] = [];
            grid[0] = [];

            data.forEach(val => {            
                let index = val as number;                
                let sourceCoords = this.getSourceCoordsFromIndex(index);
                var tile = new Tile(this, this.tilemapImage, index, sourceCoords, col, row);
                grid[row][col] = tile;

                col++;
                if (col === this.tileCols) {
                    col = 0;
                    row++;
                    grid[row] = [];
                }
            })
            this.tileLayers.push(new TileLayer(grid));
        });
    }

    update(delta: number) {
        this.calculateScreenOffset();
    }    

    render(context: CanvasRenderingContext2D) {        
        //this.renderWorker.renderText(context, 'Map', 100, 120);
        this.renderMapDepthEffects(context);
        this.renderLayers(context);
    }  

    renderMapDepthEffects(context: CanvasRenderingContext2D) {
        var mapWidth = this.tileCols * this.tileWidth;
        var mapHeight = this.tileRows * this.tileHeight;

        // Shadow
        //context.save();
        //context.shadowBlur = 20;
        //context.shadowOffsetX = 0;
        //context.shadowOffsetY = 0;
        //context.shadowColor = 'black';

        // Border        
        this.renderWorker.renderRect(
            context, 
            new Rectangle(this.screenOffset.x - 1, this.screenOffset.y - 1, mapWidth + 2, mapHeight + 2),
            'black', 
            false);

        //context.restore();
    }

    renderLayers(context: CanvasRenderingContext2D) {          
        
        // TODO:
        // Add mechanism that checks if tiles need to be redrawn. e.g. resized

        this.tileLayers.forEach(layer => {
            for (let row = 0; row < this.tileRows; row++) {
                for (let col = 0; col < this.tileCols; col++) {
                    let tile = layer.grid[row][col];
                    tile.render(this.renderWorker, context);
                }
            }
        });
    }

    getSourceCoordsFromIndex(index: number): Point {
        // TODO:
        // Re look at this, find cleaner solution.

        let coord = new Point(-1, -1);
        if (index == -1) {
            return coord;
        }

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