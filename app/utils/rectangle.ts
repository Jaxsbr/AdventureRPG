class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    bottom: number;
    right: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.updatePosition(x, y);
    }

    updatePosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
    }

    intersectRect(rectangle: Rectangle): boolean {
        return !(rectangle.x > this.right ||
                rectangle.right < this.x ||
                rectangle.y > this.bottom ||
                rectangle.bottom < this.y);
    }

    containsRect(rectangle: Rectangle): boolean {
        return (this.x <= rectangle.x &&
                rectangle.right <= this.right &&
                this.y <= rectangle.y &&
                rectangle.bottom <= this.bottom);
    }

    getCenter(): Point {
        return new Point(
            this.right - this.width / 2, this.bottom - this.height / 2);
    }

    equals(rect: Rectangle): boolean {
        return (this.x == rect.x &&
                this.y == rect.y &&
                this.width == rect.width &&
                this.height == rect.height);
    }
}