class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    normalize(point: Point): Point {
        var px = this.x - point.x;
        var py = this.y - point.y;
        var distance = Math.sqrt(px * px + py * py);
        return new Point(px / distance, py / distance);
    }

    distanceBetween(point: Point) {
        var px = this.x - point.x;
        var py = this.y - point.y;
        return Math.sqrt(px * px + py * py);
    }
}