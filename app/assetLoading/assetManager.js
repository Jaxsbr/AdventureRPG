var AssetManager = (function () {
    function AssetManager() {
    }
    AssetManager.prototype.init = function () {
        this.loadCompleted = false;
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.initAssets();
    };
    AssetManager.prototype.initAssets = function () {
        var _this = this;
        var imageAssets;
        var jsonAssets;
        var request = new XMLHttpRequest();
        request.onload = function (event) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                imageAssets = data.imageAssets;
                jsonAssets = data.jsonAssets;
                _this.initImages(imageAssets);
                _this.initJson(jsonAssets);
            }
        };
        request.open('get', 'app/assets/assetManifest.json', true);
        request.send();
    };
    AssetManager.prototype.initImages = function (imageAssets) {
        var _this = this;
        if (imageAssets) {
            this.totalAssets += imageAssets.length;
        }
        var images = [];
        imageAssets.forEach(function (asset) {
            var image = new ImageAsset(_this, asset.key, asset.src);
            images.push(image);
        });
        images.forEach(function (img) {
            img.init();
        });
    };
    AssetManager.prototype.initJson = function (jsonAssets) {
        var jsonData = [];
        console.log(jsonAssets);
        jsonData.forEach(function (json) {
            //img.init();
        });
    };
    AssetManager.prototype.update = function () {
        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssets) {
            this.loadCompleted = true;
        }
    };
    return AssetManager;
}());
//# sourceMappingURL=assetManager.js.map