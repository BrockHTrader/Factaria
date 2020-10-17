class Slot extends Position {
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