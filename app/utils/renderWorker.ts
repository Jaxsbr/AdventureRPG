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
}