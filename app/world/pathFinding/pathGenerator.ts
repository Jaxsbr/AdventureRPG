class PathGenerator {
    map: Map;
    grid: Grid;

    constructor(map: Map) {
        this.map = map;
        this.grid = new Grid(this.map.tileCols, this.map.tileRows);
    }


    public getPathTilesToTarget(fromTileCoords: Point, targetTileCoords: Point): PathTile[] {        
        let pathGrid = this.getPathGrid(targetTileCoords);
        let loadedPathGrid = this.populateNeighbors(pathGrid);
        let bestRoutePathTiles = this.searchPathGridForBestRoute(loadedPathGrid, fromTileCoords, targetTileCoords);
        return bestRoutePathTiles;
    }

    private searchPathGridForBestRoute(pathGrid: PathTile[][], fromTileCoords: Point, targetTileCoords: Point): PathTile[] {
        let reachable: PathTile[] = [];
        let explored: PathTile[] = [];
        let currentPathTile: PathTile = null;
        let destinationPathTile: PathTile = null;
        reachable.push(pathGrid[fromTileCoords.y][fromTileCoords.x]);

        while (reachable.length > 0) {
            currentPathTile = this.setInitialSearchPathTile(currentPathTile, reachable);

            destinationPathTile = this.setDestinationPathTile(currentPathTile, destinationPathTile);
            if (destinationPathTile != null) { break; }            

            let closest: PathTile = null;
            let closestIndex = -1;

            for (let n = 0; n < currentPathTile.neighbors.length; n++) {
                let neighborTile = currentPathTile.neighbors[n];
                //if (!this.isTilePathPassable(currentPathTile)) { continue; }                
                if (!this.isTilePathPassable(neighborTile)) { continue; }                
                if (this.isTileInTiles(neighborTile, explored) !== -1) { continue; }
                if (this.isTileInTiles(neighborTile, explored) !== -1) { continue; }
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
            
            let toRemoveIndex = this.isTileInTiles(currentPathTile, reachable);
            if (toRemoveIndex !== -1) {
                reachable.splice(toRemoveIndex, 1);
            }
        }

        if (destinationPathTile) {            
            let pathTiles: PathTile[] = [];
            let parent = destinationPathTile.parent;
            pathTiles.push(destinationPathTile);

            while (parent != null) {
                pathTiles.push(parent);
                if (parent === pathGrid[fromTileCoords.y][fromTileCoords.x]) { break; }
                parent = parent.parent;
            }

            return pathTiles;
        }

        return [];
    }    

    private isClosestPathTile(currentClosestTile: PathTile, currentClosestIndex: number, tileToCompare: PathTile): boolean {
        let closerThanCurrent = false;
        if ((currentClosestTile === null || currentClosestIndex === -1) ||
            (currentClosestTile.distance > tileToCompare.distance)) {
            closerThanCurrent = true;            
        }
        return closerThanCurrent;
    }

    private isTilePathPassable(pathTile: PathTile) {
        return this.map.collisionGrid[pathTile.coords.y][pathTile.coords.x].passable;
    }

    private isTileInTiles(pathTile: PathTile, tiles: PathTile[]): number {
        let found = -1;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i] === pathTile) {
                found = i;
                break;
            }
        }
        return found;
    }

    private setInitialSearchPathTile(currentPathTile: PathTile, reachable: PathTile[]) {
        if (currentPathTile === null && reachable.length > 0) {            
            currentPathTile = reachable[0];
        }
        return currentPathTile;
    }

    private setDestinationPathTile(currentPathTile: PathTile, destinationPathTile: PathTile): PathTile {
        if (currentPathTile && currentPathTile.distance === 0) {            
            destinationPathTile = currentPathTile;    
        }
        return destinationPathTile;
    }

    private getTileCenterFromTileCoords(targetTileCoords: Point): Point {
        let targetTile = this.getTargetTileRectFromCoords(targetTileCoords);
        return targetTile.getCenter();
    }

    private getTargetTileRectFromCoords(targetTileCoords: Point): Rectangle {
        return new Rectangle(
            targetTileCoords.x * this.map.tileWidth,
            targetTileCoords.y * this.map.tileHeight,
            this.map.tileWidth,
            this.map.tileHeight);
    }

    private getPathGrid(targetTileCoords: Point): PathTile[][] {
        let targetCenter = this.getTileCenterFromTileCoords(targetTileCoords);
        let grid = [];

        for (let row = 0; row < this.map.tileRows; row++) {          
            grid[row] = new Array();    
            for (let col = 0; col < this.map.tileCols; col++) {
                let tile = this.map.collisionGrid[row][col];
                let destWitoutScreenOffsets = tile.destination.getCenter();
                destWitoutScreenOffsets.x -= this.map.screenOffset.x;
                destWitoutScreenOffsets.y -= this.map.screenOffset.y;
                let distance = destWitoutScreenOffsets.distanceBetween(targetCenter);
                let pathTile = new PathTile(new Point(col, row), distance, null);
                grid[row][col] = pathTile;                
            }
        }    
        return grid;
    }          
    
    private populateNeighbors(pathGrid: PathTile[][]): PathTile[][] {
        for (let row = 0; row < this.map.tileRows; row++) {          
            for (let col = 0; col < this.map.tileCols; col++) {
                this.setNeighborTiles(this.grid, pathGrid[row][col], pathGrid);                                
            }
        }    
        return pathGrid;
    }

    private setNeighborTiles(tileGrid:Grid, pathTile: PathTile, pathGrid: PathTile[][]): PathTile[][] {        
        let leftBottom = new Point(pathTile.coords.x - 1, pathTile.coords.y + 1);
        let left = new Point(pathTile.coords.x - 1, pathTile.coords.y);
        let leftTop = new Point(pathTile.coords.x - 1, pathTile.coords.y - 1);
        let rightBottom = new Point(pathTile.coords.x + 1, pathTile.coords.y + 1);
        let right = new Point(pathTile.coords.x + 1, pathTile.coords.y);
        let rightTop = new Point(pathTile.coords.x + 1, pathTile.coords.y - 1);
        let top = new Point(pathTile.coords.x, pathTile.coords.y - 1);
        let bottom = new Point(pathTile.coords.x, pathTile.coords.y + 1);
    
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
    }
}