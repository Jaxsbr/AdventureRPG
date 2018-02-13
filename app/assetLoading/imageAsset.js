var ImageAsset = (function () {
    function ImageAsset(assetManager, key, src) {
        this.assetManager = assetManager;
        this.key = key;
        this.src = src;
    }
    ImageAsset.prototype.init = function () {
        var _this = this;
        this.image = new Image();
        this.image.onload = function () {
            _this.assetManager.loadedAssets++;
        };
        this.image.src = this.src;
    };
    return ImageAsset;
}());
//# sourceMappingURL=imageAsset.js.map