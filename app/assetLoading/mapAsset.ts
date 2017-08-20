class MapAsset implements AssetInterface {
    assetManager: AssetManager;
    public jsonRaw: any;
    public key: string;
    src: string;

    constructor(assetManager: AssetManager, key: string, src: string) {
        this.assetManager = assetManager;
        this.key = key;
        this.src = src;
    }

    init() {
        let request = new XMLHttpRequest();        
        request.onload = event => {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                this.jsonRaw = data;
                this.assetManager.loadedAssets++;
            }
        }
        request.open('get', this.src, true);
        request.send();
    }
}