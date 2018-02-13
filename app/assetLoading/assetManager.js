var AssetManager = (function () {
    function AssetManager() {
        this.images = [];
        this.maps = [];
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
        var mapAssets;
        var request = new XMLHttpRequest();
        request.onload = function (event) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                imageAssets = data.imageAssets;
                mapAssets = data.mapAssets;
                _this.initImages(imageAssets);
                _this.initMaps(mapAssets);
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
        imageAssets.forEach(function (asset) {
            var image = new ImageAsset(_this, asset.key, asset.src);
            _this.images.push(image);
        });
        this.images.forEach(function (img) {
            img.init();
        });
    };
    AssetManager.prototype.initMaps = function (mapAssets) {
        var _this = this;
        if (mapAssets) {
            this.totalAssets += mapAssets.length;
        }
        mapAssets.forEach(function (asset) {
            var map = new MapAsset(_this, asset.key, asset.src);
            _this.maps.push(map);
        });
        this.maps.forEach(function (map) {
            map.init();
        });
    };
    AssetManager.prototype.update = function () {
        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssets) {
            this.loadCompleted = true;
        }
    };
    AssetManager.prototype.getImage = function (key) {
        // TODO:
        // Test this for performance
        // Possible replace with dictionary/hash mechanism
        var image;
        this.images.forEach(function (img) {
            if (img.key === key) {
                image = img.image;
            }
        });
        return image;
    };
    AssetManager.prototype.getMap = function (key) {
        // TODO:
        // Test this for performance
        // Possible replace with dictionary/hash mechanism        
        var map;
        this.maps.forEach(function (mp) {
            if (mp.key === key) {
                map = mp;
            }
        });
        return map;
    };
    return AssetManager;
}());
//# sourceMappingURL=assetManager.js.map