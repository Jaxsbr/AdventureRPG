class ImageAsset implements AssetInterface {
    assetManager: AssetManager;
    public image: HTMLImageElement;
    public key: string;
    src: string;

    constructor(assetManager: AssetManager, key: string, src: string) {
        this.assetManager = assetManager;
        this.key = key;
        this.src = src;
    }

    init() {
        this.image = new Image();
        this.image.onload = () => {
            this.assetManager.loadedAssets++;
        }
        this.image.src = this.src;
    }
}