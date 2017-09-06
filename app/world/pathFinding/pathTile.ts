class PathTile {
    coords: Point
    distance: number;
    parent: PathTile;
    neighbors: PathTile[] = [];

    constructor(coords: Point, distance: number, parent: PathTile) {
        this.coords = coords;
        this.distance = distance;
        this.parent = parent;         
    }    
}