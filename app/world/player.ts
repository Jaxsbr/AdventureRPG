class Player {    
    map: Map;
    tile: CollisionTile;
    bounds: Rectangle;
    image: HTMLImageElement;
    sourceRect: Rectangle;

    targetReachedThresholdPixels: number = 0.5;
    targetTile: CollisionTile;
    velocity: Point;
    moveSpeed: number = 50;

    pathGenerator: PathGenerator;
    pathTiles: PathTile[] = [];

    constructor(map: Map, tile: CollisionTile, assetManager: AssetManager) {
        this.map = map;        
        this.tile = tile;
        this.bounds = this.tile.destination.clone();
        this.bounds.adjustSize(2, 2, true);
        this.image = assetManager.getImage('player');
        this.sourceRect = new Rectangle(0, 0, 64, 64);
        this.velocity = new Point(0, 0);
        this.pathGenerator = new PathGenerator(this.map);
    }

    update(delta: number) {        
        this.updateMovement(delta);
        this.updatePosition(delta);        
    }

    updateMovement(delta: number) {
        if (!this.targetTile) {
            return;
        }

        this.tile = this.getCurrentTile();
        let targetCenter = this.targetTile.destination.getCenter();
        let playerCenter = this.bounds.getCenter();

        if (this.targetTile === this.tile) {
            // We are on the target tile, now hone in on the center.
            var distanceFromTargetCenter = playerCenter.distanceBetween(targetCenter)

            if (distanceFromTargetCenter <= this.targetReachedThresholdPixels) {
                // On target, no movement required.
                this.velocity.x = 0;
                this.velocity.y = 0;            
                this.nextTargetTile();             
                return;
            }                        
        }        

        // Target not reached, calculate target velocity.
        let direction = targetCenter.normalize(playerCenter);
        this.velocity.x = direction.x * this.moveSpeed * delta;
        this.velocity.y = direction.y * this.moveSpeed * delta;
    }

    updatePosition(delta: number) {
        this.bounds.updatePosition(
            this.bounds.x + this.velocity.x,
            this.bounds.y + this.velocity.y);
    }
    
    nextTargetTile () {
        // TODO:
        // Debug why player is not moving!!

        if (this.pathTiles.length <= 0) { return; }
        let next = this.pathTiles.pop();
        this.targetTile = this.map.collisionGrid[next.coords.y][next.coords.x];
    }

    setPosition() {        
        if (!this.targetTile) {
            this.bounds.updatePosition(this.tile.destination.x, this.tile.destination.y);
            return;
        }
        
        if (this.tile == this.targetTile) {
            // Player has stopped moving
            this.bounds.updatePosition(this.targetTile.destination.x, this.targetTile.destination.y);
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        else {
            // TODO:
            // Reposition player acording to there movement position            
        }
    }

    getCurrentTile(): CollisionTile {
        var center = this.bounds.getCenter();
        var coords = new Point(
            Math.floor((center.x - this.map.screenOffset.x) / this.map.tileWidth),
            Math.floor((center.y - this.map.screenOffset.y) / this.map.tileHeight));
        return this.map.collisionGrid[coords.y][coords.x]; 
    }

    movePlayer(targetTile: CollisionTile) {
        this.targetTile = targetTile;
        this.tile = this.getCurrentTile();
        this.pathTiles = this.pathGenerator.getPathTilesToTarget(
            new Point (this.tile.col, this.tile.row),
            new Point (this.targetTile.col, this.targetTile.row));

        this.nextTargetTile();
    }

    render(renderWorker: RenderWorker, context: CanvasRenderingContext2D) {
        renderWorker.renderImageSource(
            context,
            this.image,
            this.sourceRect,
            this.bounds);
    }
}