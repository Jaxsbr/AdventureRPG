class PathGenerator {
    map: Map;
    grid: Grid;

    constructor(map: Map) {
        this.map = map;
        this.grid = new Grid(this.map.tileCols, this.map.tileRows);
    }


    public getPathTilesToTarget(targetTileCoords: Point) {        
        // Basic idea of this path finding algorithm.
        // - Calculate custom grid that show distance of each tile to target tile.
        // - Do flood fill on passable tiles and calculate score. (check collision grid)
        // - Track previous tile via parent field.
        // - Use score and parent to determine least amount path.
        let pathGrid = this.getPathGrid(targetTileCoords);
        this.populateNeighbors(pathGrid);
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
                let distance = tile.destination.getCenter().distanceBetween(targetCenter);
                let pathTile = new PathTile(new Point(col, row), distance, null);
                grid[row][col] = pathTile;                
            }
        }    
        return grid;
    }          
    
    private populateNeighbors(pathGrid: PathTile[][]) {
        for (let row = 0; row < this.map.tileRows; row++) {          
            for (let col = 0; col < this.map.tileCols; col++) {
                this.setNeighborTiles(this.grid, pathGrid[row][col], pathGrid);                                
            }
        }    
    }

    private setNeighborTiles(tileGrid:Grid, pathTile: PathTile, pathGrid: PathTile[][]) {        
        let leftBottom = new Point(pathTile.coords.x - 1, pathTile.coords.y + 1);
        let left = new Point(pathTile.coords.x - 1, pathTile.coords.y);
        let leftTop = new Point(pathTile.coords.x - 1, pathTile.coords.y - 1);
        let rightBottom = new Point(pathTile.coords.x + 1, pathTile.coords.y + 1);
        let right = new Point(pathTile.coords.x + 1, pathTile.coords.y);
        let rightTop = new Point(pathTile.coords.x + 1, pathTile.coords.y - 1);
        let top = new Point(pathTile.coords.x, pathTile.coords.y - 1);
        let bottom = new Point(pathTile.coords.x, pathTile.coords.y + 1);
    
        if (tileGrid.isCoordsValid(leftBottom)) {
            pathTile.neighbors.push(pathGrid[leftBottom.x][leftBottom.y]);
        }
    
        if (tileGrid.isCoordsValid(left)) {
            pathTile.neighbors.push(pathGrid[left.x][left.y]);
        }
    
        if (tileGrid.isCoordsValid(leftTop)) {
            pathTile.neighbors.push(pathGrid[leftTop.x][leftTop.y]);
        }
    
        if (tileGrid.isCoordsValid(rightBottom)) {
            pathTile.neighbors.push(pathGrid[rightBottom.x][rightBottom.y]);
        }
    
        if (tileGrid.isCoordsValid(right)) {
            pathTile.neighbors.push(pathGrid[right.x][right.y]);
        }
    
        if (tileGrid.isCoordsValid(rightTop)) {
            pathTile.neighbors.push(pathGrid[rightTop.x][rightTop.y]);
        }
    
        if (tileGrid.isCoordsValid(top)) {
            pathTile.neighbors.push(pathGrid[top.x][top.y]);
        }
    
        if (tileGrid.isCoordsValid(bottom)) {
            pathTile.neighbors.push(pathGrid[bottom.x][bottom.y]);
        }
    }
}