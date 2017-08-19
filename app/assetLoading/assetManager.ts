class AssetManager {
    images: ImageAsset[];
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
        let jsonAssets: string;
        let request = new XMLHttpRequest();

        request.onload = event => {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                imageAssets = data.imageAssets;
                jsonAssets = data.jsonAssets;

                this.initImages(imageAssets);
                this.initJson(jsonAssets);
            }
        }
        request.open('get', 'app/assets/assetManifest.json', true);
        request.send();
    }

    initImages(imageAssets: any) {
        if (imageAssets) {
            this.totalAssets += imageAssets.length;
        }
        let images: ImageAsset[] = [];

        imageAssets.forEach(asset => {
            let image = new ImageAsset(this, asset.key, asset.src);
            images.push(image);
        });        

        images.forEach(img => {
            img.init();
        });
    }

    initJson(jsonAssets: string) {
        let jsonData: ImageAsset[] = [];

        console.log(jsonAssets);        

        jsonData.forEach(json => {
             //img.init();
        });
    }

    update() {
        if (this.totalAssets !== 0 && this.totalAssets === this.loadedAssets) {
            this.loadCompleted = true;
        }
    }
}