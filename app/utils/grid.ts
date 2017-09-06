class Grid {
    cols: number;
    rows: number;

    constructor(cols: number, rows: number) {
        this.cols = cols;
        this.rows = rows;
    }

    isCoordsValid(coords: Point): boolean {
        if (coords.x < 0 || coords.y < 0 || coords.x > this.cols - 1 || coords.y > this.rows - 1) {
            return false;
        }    
        return true;
    }
}