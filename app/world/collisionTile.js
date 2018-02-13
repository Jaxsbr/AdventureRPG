var CollisionTile = (function () {
    function CollisionTile(map, col, row, passable) {
        this.map = map;
        this.col = col;
        this.row = row;
        this.passable = passable;
        this.destination = new Rectangle(0, 0, 0, 0);
        this.update();
        this.destination.updatePosition(this.destination.x, this.destination.y);
    }
    CollisionTile.prototype.update = function () {
        this.destination.x = this.map.screenOffset.x + this.col * this.map.tileWidth;
        this.destination.y = this.map.screenOffset.y + this.row * this.map.tileHeight;
        this.destination.width = this.map.tileWidth;
        this.destination.height = this.map.tileHeight;
    };
    return CollisionTile;
}());
//# sourceMappingURL=collisionTile.js.map