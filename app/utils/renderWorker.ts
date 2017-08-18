class RenderWorker {
    renderText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {

        // TODO:
        // Manage font family, style, size and color
        context.fillStyle = 'red';
        context.font = '20px Calibri';

        context.fillText(text, x, y);
    }
}