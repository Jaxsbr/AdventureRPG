var Grid = (function () {
    function Grid(cols, rows) {
        this.coords = new Point(0, 0);
        this.cols = cols;
        this.rows = rows;
    }
    Grid.prototype.isXYCoordsValid = function (col, row) {
        this.coords.x = col;
        this.coords.y = row;
        return this.isCoordsValid(this.coords);
    };
    Grid.prototype.isCoordsValid = function (coords) {
        if (coords.x < 0 || coords.y < 0 || coords.x > this.cols - 1 || coords.y > this.rows - 1) {
            return false;
        }
        return true;
    };
    return Grid;
}());
//# sourceMappingURL=grid.js.map