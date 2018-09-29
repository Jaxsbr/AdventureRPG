var RenderWorker = (function () {
    function RenderWorker() {
    }
    RenderWorker.prototype.clear = function (context, area) {
        if (area === void 0) { area = null; }
        if (!area) {
            // Clear all
        }
        else {
            context.clearRect(area.x, area.y, area.width, area.height);
        }
    };
    RenderWorker.prototype.renderText = function (context, text, x, y) {
        // TODO:
        // Manage font family, style, size and color
        context.fillStyle = 'red';
        context.font = '20px Calibri';
        context.fillText(text, x, y);
    };
    RenderWorker.prototype.renderRect = function (context, rect, color, fill) {
        if (fill) {
            context.fillStyle = color;
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
        else {
            context.beginPath();
            context.strokeStyle = color;
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
    };
    RenderWorker.prototype.renderImageRect = function (context, image, bounds) {
        this.renderImage(context, image, bounds.x, bounds.y, bounds.width, bounds.height);
    };
    RenderWorker.prototype.renderImage = function (context, image, x, y, width, height) {
        if (width === void 0) { width = null; }
        if (height === void 0) { height = null; }
        var w = width == null ? image.width : width;
        var h = height == null ? image.height : height;
        context.drawImage(image, x, y, w, h);
    };
    RenderWorker.prototype.renderImageSource = function (context, image, sourceRect, destRect) {
        context.drawImage(image, sourceRect.x, sourceRect.y, Math.round(sourceRect.width), Math.round(sourceRect.height), destRect.x, destRect.y, destRect.width, destRect.height);
    };
    return RenderWorker;
}());
//# sourceMappingURL=renderWorker.js.map