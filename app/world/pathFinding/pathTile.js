var PathTile = (function () {
    function PathTile(coords, distance, parent) {
        this.neighbors = [];
        this.coords = coords;
        this.distance = distance;
        this.parent = parent;
    }
    return PathTile;
}());
//# sourceMappingURL=pathTile.js.map