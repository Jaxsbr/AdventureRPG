class Grid {
    cols: number;
    rows: number;
    private coords: Point = new Point(0, 0);

    constructor(cols: number, rows: number) {
        this.cols = cols;
        this.rows = rows;
    }

    isXYCoordsValid(col: number, row: number) {
        this.coords.x = col;
        this.coords.y = row;
        return this.isCoordsValid(this.coords);
    }

    isCoordsValid(coords: Point): boolean {
        if (coords.x < 0 || coords.y < 0 || coords.x > this.cols - 1 || coords.y > this.rows - 1) {
            return false;
        }    
        return true;
    }
}