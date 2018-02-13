var Enemy = (function () {
    function Enemy(map, tile, assetManager) {
        this.aggroDistance = 35;
        this.rotationTick = 2;
        this.rotationElapsed = 0;
        this.playerEngaged = false;
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
    Enemy.prototype.udpate = function (delta) {
        this.center = this.bounds.getCenter();
        this.isPlayerDetected();
        if (!this.playerEngaged) {
            this.updateRotation(delta);
            this.updateRenderBounds();
        }
    };
    Enemy.prototype.isPlayerDetected = function () {
        var directionFacingTile = this.getDirectionFacingTileBound();
        if (directionFacingTile.equals(this.map.player.tile.destination)) {
            this.playerEngaged = true;
            this.map.enemyEngine.playerEncountered(this);
        }
    };
    Enemy.prototype.updateRotation = function (delta) {
        this.rotationElapsed += delta;
        if (this.rotationElapsed >= this.rotationTick) {
            this.rotationElapsed = 0;
            this.setNextDirection();
        }
    };
    Enemy.prototype.updateRenderBounds = function () {
        this.renderBounds.x = -(this.bounds.width / 2);
        this.renderBounds.y = -(this.bounds.height / 2);
    };
    Enemy.prototype.getDirectionFacingTileBound = function () {
        var coordX = this.tile.col;
        var coordY = this.tile.row;
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
    };
    Enemy.prototype.setNextDirection = function () {
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
    };
    Enemy.prototype.setDirectionRotation = function () {
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
    };
    Enemy.prototype.degreesToRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    Enemy.prototype.setPosition = function () {
        this.bounds.updatePosition(this.tile.destination.x, this.tile.destination.y);
    };
    Enemy.prototype.render = function (context) {
        context.save();
        context.translate(this.center.x, this.center.y);
        context.rotate(this.directionRotation);
        this.map.renderWorker.renderImageSource(context, this.image, this.sourceRect, this.renderBounds);
        context.restore();
    };
    return Enemy;
}());
//# sourceMappingURL=enemy.js.map