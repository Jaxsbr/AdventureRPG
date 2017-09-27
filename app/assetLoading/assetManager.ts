class AssetManager {
    images: ImageAsset[] = [];
    maps: MapAsset[] = [];
    totalAssets: number;
    loadedAssets: number;
    public loadCompleted: boolean;

    init(): void {
        this.loadCompleted = false;
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.initAssets();
    }

    initAssets() {
        let imageAssets: string;
        let mapAssets: string;
        let request = new XMLHttpRequest();

        request.onload = event => {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                imageAssets = data.imageAssets;
                mapAssets = data.mapAssets;

                this.initImages(imageAssets);
                this.initMaps(mapAssets);
            }
        }
        request.open('get', 'app/assets/assetManifest.json', true);
        request.send();
    }

    initImages(imageAssets: any) {
        if (imageAssets) {
            this.totalAssets += imageAssets.length;
        }
        
        imageAssets.forEach(asset => {
            let image = new ImageAsset(this, asset.key, asset.src);
            this.images.push(image);
        });        

        this.images.forEach(img => {
            img.init();
        });
    }

    initMaps(mapAssets: any) {
        if (mapAssets) {
            this.totalAssets += mapAssets.length;
        }        

        mapAssets.forEach(asset => {
            let map = new MapAsset(this, asset.key, asset.src);
            this.maps.push(map);
        });      

        this.maps.forEach(map => {
             map.init();
        });
    }

    update() {
        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssets) {
            this.loadCompleted = true;
        }
    }

    getImage(key: string): HTMLImageElement {
        // TODO:
        // Test this for performance
        // Possible replace with dictionary/hash mechanism

        let image;
        this.images.forEach(img => {
            if (img.key === key) {
                image = img.image;
            }
        });     
        return image;   
    }

    getMap(key: string): MapAsset {
        // TODO:
        // Test this for performance
        // Possible replace with dictionary/hash mechanism        
        
        let map;
        this.maps.forEach(mp => {
            if (mp.key === key) {
                map = mp;
            }
        });
        return map;
    }
}