var Animation = (function () {
    function Animation(image, speed, frameWidth, frameHeight, frameCount, renderWorker) {
        this.frameIndex = 0;
        this.elapsed = 0;
        this.image = image;
        this.speed = speed;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.renderWorker = renderWorker;
        this.sourceBounds = new Rectangle(0, 0, 0, 0);
        this.destinationBounds = new Rectangle(0, 0, 0, 0);
    }
    Animation.prototype.update = function (destination, delta) {
        this.destinationBounds = destination;
        this.updateFrameIndex(delta);
        // NOTE: Only supports single row sprite sheets.
        this.sourceBounds.x = this.frameIndex * this.frameWidth;
        this.sourceBounds.y = 0;
        this.sourceBounds.width = this.frameWidth;
        this.sourceBounds.height = this.frameHeight;
    };
    Animation.prototype.updateFrameIndex = function (delta) {
        this.elapsed += delta;
        if (this.elapsed >= this.speed) {
            this.elapsed = 0;
            this.frameIndex += 1;
            if (this.frameIndex >= this.frameCount) {
                this.frameIndex = 0;
            }
        }
    };
    Animation.prototype.draw = function (context) {
        this.renderWorker.renderImageSource(context, this.image, this.sourceBounds, this.destinationBounds);
    };
    return Animation;
}());
//# sourceMappingURL=animation.js.map