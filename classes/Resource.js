class Resource {
    constructor(item) {
        this.item = item;
        this.speed = 1;
    }

    Gather(amount) {
        if (this.item.amount < amount) {
            let newItem = new Item(this.item.name, this.item.amount, this.item.asset);
            this.item.amount = 0;
            return newItem;
        }

        this.item.amount -= amount;
        return new Item(this.item.name, amount, this.item.asset);
    }
}
