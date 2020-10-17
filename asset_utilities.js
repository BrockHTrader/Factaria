class AssetUtilites {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    Coal(x, y, resource) {
        return this.BuildGatherableAsset(x, y, 31, resource);
    }

    Iron(x, y, resource) {
        return this.BuildGatherableAsset(x, y, 33, resource);
    }

    Tin(x, y, resource) {
        return this.BuildGatherableAsset(x, y, 32, resource);
    }

    BuildGatherableAsset(x, y, assetNumber, resource) {
        var size = 32;
        var row = 0;
        var col = 0;

        col = (assetNumber % 10) - 1;
        row = (Math.floor(assetNumber / 10)) - 1;

        if (col < 0)
            col = 0;

        if (row < 0)
            row = 0;

        let entity = new GatherableEntity(x, y, size, 'transparent', 'asset', new Asset(assetNumber), resource);

        return entity;
    }
}