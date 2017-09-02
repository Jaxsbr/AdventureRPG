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
    collisionLayer: any;
    tilemapImage: HTMLImageElement;
    tileLayers: TileLayer[] = [];
    
    collisionGrid: CollisionTile[][] = [];

    mapBounds: Rectangle;

    playerStartTile: CollisionTile;
    player: Player;

    inputProcessing: boolean = false;
    
    // TEMP
    target: Rectangle;


    constructor(game: Game, stateManger: StateManager, renderWorker: RenderWorker) {  
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;     
        this.screenOffset = new Point(0, 0);           
        this.mapBounds = new Rectangle(0, 0, 0, 0);
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
        this.collisionLayer = mapAsset.jsonRaw.collisionLayer;
        
        this.tilemapImage = this.game.assetManager.getImage(this.tileMapImageKey);
        this.calculateScreenOffset();
        this.calculateMapBounds();
        this.loadMapTiles();
        this.player = new Player(this, this.playerStartTile, this.game.assetManager);
    }

    calculateScreenOffset() {        
        this.screenOffset.x = this.game.screenBounds.getCenter().x - ((this.tileCols * this.tileWidth) / 2);
        this.screenOffset.y = this.game.screenBounds.getCenter().y - ((this.tileRows * this.tileHeight) / 2);
    }

    calculateMapBounds() {
        this.mapBounds = new Rectangle(
            this.screenOffset.x, 
            this.screenOffset.y, 
            this.tileCols * this.tileWidth, 
            this.tileRows * this.tileHeight);        
    }

    loadMapTiles() {
        this.loadCollisionLayer();
        this.loadVisualLayers();
    }

    loadCollisionLayer() {
        let row = 0;
        let col = 0;                    
        this.collisionGrid[0] = [];

        this.collisionLayer.forEach(val => {
            let index = val as number;                
            let passable = (val as number) === 0 ? true : false;
            var collisionTile = new CollisionTile(this, col, row, passable);
            this.collisionGrid[row][col] = collisionTile;

            if (this.playerStartTile == null && passable) {
                this.playerStartTile = collisionTile;
            }

            col++;
            if (col === this.tileCols) {
                col = 0;
                row++;
                this.collisionGrid[row] = [];
            }
        });


    }

    loadVisualLayers() {
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
        this.calculateMapBounds();
        this.player.update(delta);
    }    

    updateTiles() {
        this.calculateScreenOffset();
        this.calculateMapBounds();

        for (let row = 0; row < this.tileRows; row++) {
            for (let col = 0; col < this.tileCols; col++) {
                let tile = this.collisionGrid[row][col];
                tile.update();
            }
        }

        this.tileLayers.forEach(layer => {
            for (let row = 0; row < this.tileRows; row++) {
                for (let col = 0; col < this.tileCols; col++) {
                    let tile = layer.grid[row][col];
                    tile.update();
                }
            }
        });
    } 

    tap(point: Point) {
        if (!this.inputProcessing && this.validInput(point)) {
            this.inputProcessing = true;
            let x = Math.floor((point.x - this.screenOffset.x) / this.tileWidth);
            let y = Math.floor((point.y - this.screenOffset.y) / this.tileHeight);
            this.processInput(new Point(x, y));
        }
    }

    validInput(point: Point): boolean {
        let tapRect = new Rectangle(point.x, point.y, 1, 1);        
        return this.mapBounds.intersectRect(tapRect);
    }

    processInput(coords: Point) {
        var collisionTile = this.collisionGrid[coords.y][coords.x];      
        if (collisionTile.passable)   {
            this.processPassableInput(collisionTile);
        }
        else {
            this.processImpassableInput(collisionTile);
        }
        this.inputProcessing = false;
    }

    processPassableInput(collisionTile: CollisionTile) {
        this.target = collisionTile.destination;
        this.player.movePlayer(collisionTile);
    }

    processImpassableInput(collisionTile: CollisionTile) {
        // TODO:
        // Select item that resides on the current tile, else nothing
    }


    render(context: CanvasRenderingContext2D) {        
        //this.renderWorker.renderText(context, 'Map', 100, 120);
        this.renderMapDepthEffects(context);
        this.renderLayers(context);

        // TEMP
        if (this.target) {
            this.renderWorker.renderRect(context, this.target, 'red', true);
        }

        this.player.render(this.renderWorker, context);
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