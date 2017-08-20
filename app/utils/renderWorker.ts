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

    renderRect(context: CanvasRenderingContext2D, rect: Rectangle, color: string, fill:boolean) {
        if (fill) {
            context.fillStyle = color;
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
        else {
            context.beginPath();
            context.strokeStyle = color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);            
        }
    }

    renderImage(context: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number = null, height: number = null) {
        var w = width == null ? image.width : width;
        var h = height == null ? image.height : height;
        context.drawImage(image, x, y, w, h);
    }

    renderImageSource(context: CanvasRenderingContext2D, image: HTMLImageElement, sourceRect: Rectangle, destRect: Rectangle) {        
        context.drawImage(
            image,
            sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height,
            destRect.x, destRect.y, destRect.width, destRect.height);
    }
}