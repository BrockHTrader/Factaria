class GatherableEntity extends Entity {
    constructor(x, y, size, color, type, asset, resource) {
        super(x, y, size, color, type, asset)
        this.entityType = 'gatherable';
        this.resource = resource;
    }

    Gather() {
        if (this.resource.item.amount == 0) {
            return undefined;
        }

        return this.resource.Gather(1);
    }
}