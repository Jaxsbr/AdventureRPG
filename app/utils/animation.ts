class Animation {

    image: HTMLImageElement;
    speed: number;
    frameWidth: number;
    frameHeight: number;
    frameCount: number;
    renderWorker: RenderWorker;

    frameIndex: number = 0;
    elapsed: number = 0;

    sourceBounds: Rectangle;
    destinationBounds: Rectangle;

    constructor(image: HTMLImageElement, speed: number, frameWidth: number, frameHeight: number, frameCount: number, renderWorker: RenderWorker) {
        this.image = image;
        this.speed = speed;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.renderWorker = renderWorker;

        this.sourceBounds = new Rectangle(0, 0, 0, 0);
        this.destinationBounds = new Rectangle(0, 0, 0, 0);
    }

    update(destination: Rectangle, delta: number) {
        this.destinationBounds = destination;
        this.updateFrameIndex(delta);

        // NOTE: Only supports single row sprite sheets.
        this.sourceBounds.x = this.frameIndex * this.frameWidth;
        this.sourceBounds.y = 0;
        this.sourceBounds.width = this.frameWidth;
        this.sourceBounds.height = this.frameHeight;
    }

    private updateFrameIndex(delta: number) {
        this.elapsed += delta;
        if (this.elapsed >= this.speed) {
            this.elapsed = 0;
            this.frameIndex += 1;
            if (this.frameIndex >= this.frameCount) {
                this.frameIndex = 0;
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        this.renderWorker.renderImageSource(context, this.image, this.sourceBounds, this.destinationBounds);
    }
}