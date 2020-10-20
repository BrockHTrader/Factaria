class Slot extends GridPosition {
    constructor(x, y) {
        super(x, y);
    }

    AddItem(item, amount) {
        this.item = item;
    }

    RemoveItem() {
        this.item = undefined;
    }
}