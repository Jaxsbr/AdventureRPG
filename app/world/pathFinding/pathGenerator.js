var PathGenerator = (function () {
    function PathGenerator(map) {
        this.map = map;
        this.grid = new Grid(this.map.tileCols, this.map.tileRows);
    }
    PathGenerator.prototype.getPathTilesToTarget = function (fromTileCoords, targetTileCoords) {
        var pathGrid = this.getPathGrid(targetTileCoords);
        var loadedPathGrid = this.populateNeighbors(pathGrid);
        var bestRoutePathTiles = this.searchPathGridForBestRoute(loadedPathGrid, fromTileCoords, targetTileCoords);
        return bestRoutePathTiles;
    };
    PathGenerator.prototype.searchPathGridForBestRoute = function (pathGrid, fromTileCoords, targetTileCoords) {
        var reachable = [];
        var explored = [];
        var currentPathTile = null;
        var destinationPathTile = null;
        reachable.push(pathGrid[fromTileCoords.y][fromTileCoords.x]);
        while (reachable.length > 0) {
            currentPathTile = this.setInitialSearchPathTile(currentPathTile, reachable);
            destinationPathTile = this.setDestinationPathTile(currentPathTile, destinationPathTile);
            if (destinationPathTile != null) {
                break;
            }
            var closest = null;
            var closestIndex = -1;
            for (var n = 0; n < currentPathTile.neighbors.length; n++) {
                var neighborTile = currentPathTile.neighbors[n];
                //if (!this.isTilePathPassable(currentPathTile)) { continue; }                
                if (!this.isTilePathPassable(neighborTile)) {
                    continue;
                }
                if (this.isTileInTiles(neighborTile, explored) !== -1) {
                    continue;
                }
                if (this.isTileInTiles(neighborTile, explored) !== -1) {
                    continue;
                }
                neighborTile.parent = currentPathTile;
                reachable.push(neighborTile);
                if (this.isClosestPathTile(closest, closestIndex, neighborTile)) {
                    closest = neighborTile;
                    closestIndex = n;
                }
            }
            if (currentPathTile && this.isTileInTiles(currentPathTile, explored) === -1) {
                explored.push(currentPathTile);
            }
            if (closestIndex != -1) {
                currentPathTile = closest;
            }
            var toRemoveIndex = this.isTileInTiles(currentPathTile, reachable);
            if (toRemoveIndex !== -1) {
                reachable.splice(toRemoveIndex, 1);
            }
        }
        if (destinationPathTile) {
            var pathTiles = [];
            var parent_1 = destinationPathTile.parent;
            pathTiles.push(destinationPathTile);
            while (parent_1 != null) {
                pathTiles.push(parent_1);
                if (parent_1 === pathGrid[fromTileCoords.y][fromTileCoords.x]) {
                    break;
                }
                parent_1 = parent_1.parent;
            }
            return pathTiles;
        }
        return [];
    };
    PathGenerator.prototype.isClosestPathTile = function (currentClosestTile, currentClosestIndex, tileToCompare) {
        var closerThanCurrent = false;
        if ((currentClosestTile === null || currentClosestIndex === -1) ||
            (currentClosestTile.distance > tileToCompare.distance)) {
            closerThanCurrent = true;
        }
        return closerThanCurrent;
    };
    PathGenerator.prototype.isTilePathPassable = function (pathTile) {
        return this.map.collisionGrid[pathTile.coords.y][pathTile.coords.x].passable;
    };
    PathGenerator.prototype.isTileInTiles = function (pathTile, tiles) {
        var found = -1;
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i] === pathTile) {
                found = i;
                break;
            }
        }
        return found;
    };
    PathGenerator.prototype.setInitialSearchPathTile = function (currentPathTile, reachable) {
        if (currentPathTile === null && reachable.length > 0) {
            currentPathTile = reachable[0];
        }
        return currentPathTile;
    };
    PathGenerator.prototype.setDestinationPathTile = function (currentPathTile, destinationPathTile) {
        if (currentPathTile && currentPathTile.distance === 0) {
            destinationPathTile = currentPathTile;
        }
        return destinationPathTile;
    };
    PathGenerator.prototype.getTileCenterFromTileCoords = function (targetTileCoords) {
        var targetTile = this.getTargetTileRectFromCoords(targetTileCoords);
        return targetTile.getCenter();
    };
    PathGenerator.prototype.getTargetTileRectFromCoords = function (targetTileCoords) {
        return new Rectangle(targetTileCoords.x * this.map.tileWidth, targetTileCoords.y * this.map.tileHeight, this.map.tileWidth, this.map.tileHeight);
    };
    PathGenerator.prototype.getPathGrid = function (targetTileCoords) {
        var targetCenter = this.getTileCenterFromTileCoords(targetTileCoords);
        var grid = [];
        for (var row = 0; row < this.map.tileRows; row++) {
            grid[row] = new Array();
            for (var col = 0; col < this.map.tileCols; col++) {
                var tile = this.map.collisionGrid[row][col];
                var destWitoutScreenOffsets = tile.destination.getCenter();
                destWitoutScreenOffsets.x -= this.map.screenOffset.x;
                destWitoutScreenOffsets.y -= this.map.screenOffset.y;
                var distance = destWitoutScreenOffsets.distanceBetween(targetCenter);
                var pathTile = new PathTile(new Point(col, row), distance, null);
                grid[row][col] = pathTile;
            }
        }
        return grid;
    };
    PathGenerator.prototype.populateNeighbors = function (pathGrid) {
        for (var row = 0; row < this.map.tileRows; row++) {
            for (var col = 0; col < this.map.tileCols; col++) {
                this.setNeighborTiles(this.grid, pathGrid[row][col], pathGrid);
            }
        }
        return pathGrid;
    };
    PathGenerator.prototype.setNeighborTiles = function (tileGrid, pathTile, pathGrid) {
        var leftBottom = new Point(pathTile.coords.x - 1, pathTile.coords.y + 1);
        var left = new Point(pathTile.coords.x - 1, pathTile.coords.y);
        var leftTop = new Point(pathTile.coords.x - 1, pathTile.coords.y - 1);
        var rightBottom = new Point(pathTile.coords.x + 1, pathTile.coords.y + 1);
        var right = new Point(pathTile.coords.x + 1, pathTile.coords.y);
        var rightTop = new Point(pathTile.coords.x + 1, pathTile.coords.y - 1);
        var top = new Point(pathTile.coords.x, pathTile.coords.y - 1);
        var bottom = new Point(pathTile.coords.x, pathTile.coords.y + 1);
        if (tileGrid.isCoordsValid(leftBottom)) {
            pathTile.neighbors.push(pathGrid[leftBottom.y][leftBottom.x]);
        }
        if (tileGrid.isCoordsValid(left)) {
            pathTile.neighbors.push(pathGrid[left.y][left.x]);
        }
        if (tileGrid.isCoordsValid(leftTop)) {
            pathTile.neighbors.push(pathGrid[leftTop.y][leftTop.x]);
        }
        if (tileGrid.isCoordsValid(rightBottom)) {
            pathTile.neighbors.push(pathGrid[rightBottom.y][rightBottom.x]);
        }
        if (tileGrid.isCoordsValid(right)) {
            pathTile.neighbors.push(pathGrid[right.y][right.x]);
        }
        if (tileGrid.isCoordsValid(rightTop)) {
            pathTile.neighbors.push(pathGrid[rightTop.y][rightTop.x]);
        }
        if (tileGrid.isCoordsValid(top)) {
            pathTile.neighbors.push(pathGrid[top.y][top.x]);
        }
        if (tileGrid.isCoordsValid(bottom)) {
            pathTile.neighbors.push(pathGrid[bottom.y][bottom.x]);
        }
        return pathGrid;
    };
    return PathGenerator;
}());
//# sourceMappingURL=pathGenerator.js.map