var RenderWorker = (function () {
    function RenderWorker() {
    }
    RenderWorker.prototype.renderText = function (context, text, x, y) {
        // TODO:
        // Manage font family, style, size and color
        context.fillStyle = 'red';
        context.font = '20px Calibri';
        context.fillText(text, x, y);
    };
    return RenderWorker;
}());
//# sourceMappingURL=renderWorker.js.map