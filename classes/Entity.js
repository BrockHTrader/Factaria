class Entity extends Movement {
    constructor(x, y, size, color, type, asset) {
        super(x, y, 0, 0);
        this.size = size;
        this.color = color;
        this.type = type;
        this.asset = asset;
        this.entityType = 'normal';
        this.markForDelete = false;
    }
}