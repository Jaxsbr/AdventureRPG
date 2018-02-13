var Map = (function () {
    function Map(game, stateManger, renderWorker) {
        this.tileLayers = [];
        this.collisionGrid = [];
        this.inputProcessing = false;
        this.game = game;
        this.stateManager = stateManger;
        this.renderWorker = renderWorker;
        this.screenOffset = new Point(0, 0);
        this.mapBounds = new Rectangle(0, 0, 0, 0);
    }
    Map.prototype.loadMap = function (mapIndex) {
        var mapAsset = this.game.assetManager.getMap(mapIndex);
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
        this.enemyEngine = new EnemyEngine(this, this.game);
    };
    Map.prototype.calculateScreenOffset = function () {
        this.screenOffset.x = this.game.screenBounds.getCenter().x - ((this.tileCols * this.tileWidth) / 2);
        this.screenOffset.y = this.game.screenBounds.getCenter().y - ((this.tileRows * this.tileHeight) / 2);
    };
    Map.prototype.calculateMapBounds = function () {
        this.mapBounds = new Rectangle(this.screenOffset.x, this.screenOffset.y, this.tileCols * this.tileWidth, this.tileRows * this.tileHeight);
    };
    Map.prototype.loadMapTiles = function () {
        this.loadCollisionLayer();
        this.loadVisualLayers();
    };
    Map.prototype.loadCollisionLayer = function () {
        var _this = this;
        var row = 0;
        var col = 0;
        this.collisionGrid[0] = [];
        this.collisionLayer.forEach(function (val) {
            var index = val;
            var passable = val === 0 ? true : false;
            var collisionTile = new CollisionTile(_this, col, row, passable);
            _this.collisionGrid[row][col] = collisionTile;
            if (_this.playerStartTile == null && passable) {
                _this.playerStartTile = collisionTile;
            }
            col++;
            if (col === _this.tileCols) {
                col = 0;
                row++;
                _this.collisionGrid[row] = [];
            }
        });
    };
    Map.prototype.loadVisualLayers = function () {
        var _this = this;
        this.visualLayers.forEach(function (data) {
            var row = 0;
            var col = 0;
            var grid = [];
            grid[0] = [];
            data.forEach(function (val) {
                var index = val;
                var sourceCoords = _this.getSourceCoordsFromIndex(index);
                var tile = new Tile(_this, _this.tilemapImage, index, sourceCoords, col, row);
                grid[row][col] = tile;
                col++;
                if (col === _this.tileCols) {
                    col = 0;
                    row++;
                    grid[row] = [];
                }
            });
            _this.tileLayers.push(new TileLayer(grid));
        });
    };
    Map.prototype.update = function (delta) {
        this.calculateScreenOffset();
        this.calculateMapBounds();
        this.player.update(delta);
        this.enemyEngine.udpate(delta);
    };
    Map.prototype.resize = function () {
        var _this = this;
        this.calculateScreenOffset();
        this.calculateMapBounds();
        for (var row = 0; row < this.tileRows; row++) {
            for (var col = 0; col < this.tileCols; col++) {
                var tile = this.collisionGrid[row][col];
                tile.update();
            }
        }
        this.tileLayers.forEach(function (layer) {
            for (var row = 0; row < _this.tileRows; row++) {
                for (var col = 0; col < _this.tileCols; col++) {
                    var tile = layer.grid[row][col];
                    tile.update();
                }
            }
        });
        // TODO:
        // Provide resize vector
        this.player.setPosition();
        this.enemyEngine.resize();
    };
    Map.prototype.tap = function (point) {
        if (!this.inputProcessing && this.validInput(point)) {
            this.inputProcessing = true;
            var x = Math.floor((point.x - this.screenOffset.x) / this.tileWidth);
            var y = Math.floor((point.y - this.screenOffset.y) / this.tileHeight);
            this.processInput(new Point(x, y));
        }
    };
    Map.prototype.validInput = function (point) {
        var tapRect = new Rectangle(point.x, point.y, 1, 1);
        return this.mapBounds.intersectRect(tapRect);
    };
    Map.prototype.processInput = function (coords) {
        var collisionTile = this.collisionGrid[coords.y][coords.x];
        if (collisionTile.passable) {
            this.processPassableInput(collisionTile);
        }
        else {
            this.processImpassableInput(collisionTile);
        }
        this.inputProcessing = false;
    };
    Map.prototype.processPassableInput = function (collisionTile) {
        this.target = collisionTile.destination;
        this.player.movePlayer(collisionTile);
    };
    Map.prototype.processImpassableInput = function (collisionTile) {
        // TODO:
        // Select item that resides on the current tile, else nothing
    };
    Map.prototype.render = function (context) {
        //this.renderWorker.renderText(context, 'Map', 100, 120);
        this.renderMapDepthEffects(context);
        this.renderLayers(context);
        //this.renderDebugTiles(context);
        // TODO: Remove renderworker form player render call
        this.player.render(this.renderWorker, context);
        this.enemyEngine.render(context);
    };
    Map.prototype.renderMapDepthEffects = function (context) {
        var mapWidth = this.tileCols * this.tileWidth;
        var mapHeight = this.tileRows * this.tileHeight;
        // Shadow
        //context.save();
        //context.shadowBlur = 20;
        //context.shadowOffsetX = 0;
        //context.shadowOffsetY = 0;
        //context.shadowColor = 'black';
        // Border        
        this.renderWorker.renderRect(context, new Rectangle(this.screenOffset.x - 1, this.screenOffset.y - 1, mapWidth + 2, mapHeight + 2), 'black', false);
        //context.restore();
    };
    Map.prototype.renderLayers = function (context) {
        // TODO:
        // Add mechanism that checks if tiles need to be redrawn. e.g. resized
        var _this = this;
        this.tileLayers.forEach(function (layer) {
            for (var row = 0; row < _this.tileRows; row++) {
                for (var col = 0; col < _this.tileCols; col++) {
                    var tile = layer.grid[row][col];
                    tile.render(_this.renderWorker, context);
                }
            }
        });
    };
    Map.prototype.renderDebugTiles = function (context) {
        // TEMP: Players target rectangle
        if (this.target) {
            this.renderWorker.renderRect(context, this.target, 'red', true);
        }
        // TEMP: Players next target rectangle
        if (this.player.targetTile) {
            this.renderWorker.renderRect(context, this.player.targetTile.destination, 'yellow', true);
        }
        ;
        // TEMP: Players next target rectangle
        if (this.player.tile) {
            this.renderWorker.renderRect(context, this.player.tile.destination, 'blue', true);
        }
        ;
    };
    Map.prototype.getSourceCoordsFromIndex = function (index) {
        // TODO:
        // Re look at this, find cleaner solution.
        var coord = new Point(-1, -1);
        if (index == -1) {
            return coord;
        }
        var val = 0;
        for (var row = 0; row < this.tileMapRows; row++) {
            for (var col = 0; col < this.tileMapCols; col++) {
                if (val === index) {
                    coord.x = col;
                    coord.y = row;
                }
                val++;
            }
        }
        return coord;
    };
    return Map;
}());
//# sourceMappingURL=map.js.map