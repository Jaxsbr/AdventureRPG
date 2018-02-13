var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.normalize = function (point) {
        var px = this.x - point.x;
        var py = this.y - point.y;
        var distance = Math.sqrt(px * px + py * py);
        return new Point(px / distance, py / distance);
    };
    Point.prototype.distanceBetween = function (point) {
        var px = this.x - point.x;
        var py = this.y - point.y;
        return Math.sqrt(px * px + py * py);
    };
    return Point;
}());
//# sourceMappingURL=point.js.map