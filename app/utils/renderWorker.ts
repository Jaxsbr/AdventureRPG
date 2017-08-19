class RenderWorker {

    clear(context: CanvasRenderingContext2D, area: Rectangle = null) {
        if (!area) {
            // Clear all
        }
        else {
            context.clearRect(area.x, area.y, area.width, area.height)
        }
    }

    renderText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {

        // TODO:
        // Manage font family, style, size and color
        context.fillStyle = 'red';
        context.font = '20px Calibri';

        context.fillText(text, x, y);
    }

    renderImage(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number = null, height: number = null) {
        var w = width == null ? image.width : width;
        var h = height == null ? image.height : height;
        context.drawImage(image, x, y, w, h);
    }
}