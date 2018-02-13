var Tile = (function () {
    function Tile(map, tileMapImage, tileIndex, sourceCoords, col, row) {
        this.map = map;
        this.tileMapImage = tileMapImage;
        this.tileIndex = tileIndex;
        this.sourceCoords = sourceCoords;
        this.col = col;
        this.row = row;
        this.source = new Rectangle(sourceCoords.x * this.map.tileMapTileWidth, sourceCoords.y * this.map.tileMapTileHeight, this.map.tileMapTileWidth, this.map.tileMapTileHeight),
            this.destination = new Rectangle(0, 0, 0, 0);
        this.update();
    }
    Tile.prototype.render = function (renderWorker, context) {
        renderWorker.renderImageSource(context, this.tileMapImage, this.source, this.destination);
        // TODO: Remove (used for debugging)
        // renderWorker.renderRect(
        //     context,
        //     this.destination,
        //     'black',
        //     false);
    };
    Tile.prototype.update = function () {
        this.destination.x = this.map.screenOffset.x + this.col * this.map.tileWidth;
        this.destination.y = this.map.screenOffset.y + this.row * this.map.tileHeight;
        this.destination.width = this.map.tileWidth;
        this.destination.height = this.map.tileHeight;
    };
    return Tile;
}());
//# sourceMappingURL=tile.js.map