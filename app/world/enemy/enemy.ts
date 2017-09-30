class Enemy {
    map: Map;
    tile: CollisionTile;
    bounds: Rectangle;
    image: HTMLImageElement;
    sourceRect: Rectangle;

    aggroDistance: number = 35;

    directionRotation: number;
    direction: Direction;
    rotationTick: number = 2;
    rotationElapsed: number = 0;

    center: Point;
    renderBounds: Rectangle;

    gridSchema: Grid;

    playerEngaged: boolean = false;

    constructor(map: Map, tile: CollisionTile, assetManager: AssetManager) {
        this.map = map;
        this.tile = tile;
        this.bounds = tile.destination.clone();
        this.bounds.adjustSize(2, 2, true);
        this.image = assetManager.getImage('enemy');
        this.sourceRect = new Rectangle(0, 0, 64, 64);

        this.direction = Direction.South;
        this.setNextDirection();
        this.setDirectionRotation();
        this.renderBounds = new Rectangle(0, 0, this.bounds.width, this.bounds.height);

        this.gridSchema = new Grid(this.map.tileCols, this.map.tileRows);
    }

    udpate(delta: number) {
        this.center = this.bounds.getCenter();
        this.isPlayerDetected();

        if (!this.playerEngaged) {
            this.updateRotation(delta);
            this.updateRenderBounds();
        }        
    }

    isPlayerDetected() {
        let directionFacingTile = this.getDirectionFacingTileBound();

        if (directionFacingTile.equals(this.map.player.tile.destination)) {
            this.playerEngaged = true;

            // TODO: 
            // Implement a ecounter engine that manages the state
            // from interaction to turn based states.
            // This can replace the direct call to player below.

            this.map.player.enemyEncountered(this);
        }
    }

    updateRotation(delta: number) {
        this.rotationElapsed += delta;
        if (this.rotationElapsed >= this.rotationTick) {
            this.rotationElapsed = 0;
            this.setNextDirection();
        }
    }

    updateRenderBounds() {
        this.renderBounds.x = -(this.bounds.width / 2);
        this.renderBounds.y = -(this.bounds.height / 2);        
    }

    getDirectionFacingTileBound(): Rectangle {
        let coordX = this.tile.col;
        let coordY = this.tile.row;

        switch (this.direction) {
            case Direction.North:
            coordY -= 1;
            break;
            case Direction.East:
            coordX += 1;
            break;
            case Direction.South:
            coordY += 1;
            break;
            case Direction.West:
            coordX -= 1;
            break;
        }

        if (this.gridSchema.isXYCoordsValid(coordX, coordY)) {
            return this.map.collisionGrid[coordY][coordX].destination;
        }
        return this.tile.destination;
    }

    setNextDirection() {
        switch (this.direction) {
            case Direction.North:
                this.direction = Direction.East;
                break;
            case Direction.East:
                this.direction = Direction.South;
                break;
            case Direction.South:
                this.direction = Direction.West;
                break;
            case Direction.West:
                this.direction = Direction.North;
                break;                
        }
        this.setDirectionRotation();
    }

    setDirectionRotation() {
        switch (this.direction) {
            case Direction.North:
            this.directionRotation = this.degreesToRadians(0);                
                break;
            case Direction.East:
                this.directionRotation = this.degreesToRadians(90);                
                break;
            case Direction.South:
                this.directionRotation = this.degreesToRadians(180);                
                break;
            case Direction.West:
                this.directionRotation = this.degreesToRadians(270);
                break;                
        }
    }

    degreesToRadians(degrees: number) {
        return degrees * Math.PI / 180;
    }

    setPosition() {        
        this.bounds.updatePosition(this.tile.destination.x, this.tile.destination.y);
    }

    render(context: CanvasRenderingContext2D) {    
        context.save();
        context.translate(this.center.x, this.center.y);
        context.rotate(this.directionRotation);

        this.map.renderWorker.renderImageSource(
            context,
            this.image,
            this.sourceRect,
            this.renderBounds);

        context.restore();
    }
}