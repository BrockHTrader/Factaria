class Chunk extends GridPosition {
    constructor(x, y, biomeNumber) {
        super(x, y);

        this.biomeNumber = biomeNumber;
        this.entities = [];
    }
}