class CollisionTile {
    map: Map;
    col: number;
    row: number;
    passable: boolean;
    destination: Rectangle;

    constructor(map: Map, col: number, row: number, passable: boolean) {
        this.map = map;
        this.col = col;
        this.row = row;
        this.passable = passable;

        this.destination = new Rectangle(0,0,0,0);
        
        this.update();
        this.destination.updatePosition(this.destination.x, this.destination.y);
    }

    update() {
        this.destination.x = this.map.screenOffset.x + this.col * this.map.tileWidth; 
        this.destination.y = this.map.screenOffset.y + this.row * this.map.tileHeight;
        this.destination.width = this.map.tileWidth;
        this.destination.height = this.map.tileHeight;
    }
}