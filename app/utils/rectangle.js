var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        this.width = width;
        this.height = height;
        this.updatePosition(x, y);
    }
    Rectangle.prototype.updatePosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
    };
    Rectangle.prototype.adjustSize = function (width, height, adjustPosition) {
        if (adjustPosition) {
            this.x += width;
            this.y += height;
            this.width += (2 * width);
            this.height += (2 * height);
        }
        else {
            this.width += width;
            this.height += height;
        }
    };
    Rectangle.prototype.intersectRect = function (rectangle) {
        return !(rectangle.x > this.right ||
            rectangle.right < this.x ||
            rectangle.y > this.bottom ||
            rectangle.bottom < this.y);
    };
    Rectangle.prototype.containsRect = function (rectangle) {
        return (this.x <= rectangle.x &&
            rectangle.right <= this.right &&
            this.y <= rectangle.y &&
            rectangle.bottom <= this.bottom);
    };
    Rectangle.prototype.getCenter = function () {
        this.updatePosition(this.x, this.y);
        return new Point(this.right - this.width / 2, this.bottom - this.height / 2);
    };
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.equals = function (rect) {
        return (this.x == rect.x &&
            this.y == rect.y &&
            this.width == rect.width &&
            this.height == rect.height);
    };
    return Rectangle;
}());
//# sourceMappingURL=rectangle.js.map