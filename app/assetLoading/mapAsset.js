var MapAsset = (function () {
    function MapAsset(assetManager, key, src) {
        this.assetManager = assetManager;
        this.key = key;
        this.src = src;
    }
    MapAsset.prototype.init = function () {
        var _this = this;
        var request = new XMLHttpRequest();
        request.onload = function (event) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                _this.jsonRaw = data;
                _this.assetManager.loadedAssets++;
            }
        };
        request.open('get', this.src, true);
        request.send();
    };
    return MapAsset;
}());
//# sourceMappingURL=mapAsset.js.map