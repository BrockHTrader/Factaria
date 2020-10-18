class Inventory {
    constructor(maxCount, slotHeight, slotWidth) {
        this.maxCount = maxCount;
        this.slotHeight = slotHeight;
        this.slotWidth = slotWidth;
        this.items = [];

        this.slots = [];
    }

    Setup(canvasHeight, canvasWidth) {
        this.slotsPerRow = 10;
        this.slotBuffer = 5;

        let startingX = canvasWidth / 2 + this.slotsPerRow * this.slotWidth / 2;

        for (let i = 0; i < this.maxCount; i++) {
            var row = parseInt(i / 10);

            this.slots = new Slot(startingX + i * this.slotWidth, canvasHeight - (this.slotHeight * (i + 1) + i * this.slotBuffer));
        }
    }

    AddItems(item) {
        if (this.items.length === this.maxCount) {
            return new Message("Your inventory is full.", 'red', 32, 4);
        }

        let foundItem = undefined;
        this.items.forEach(i => {
            if (i.name == item.name) {
                foundItem = i;
            }
        });

        if (foundItem != undefined) {
            foundItem.amount += item.amount;
        } else {
            let itemCount = this.items.length;
            item.slot = itemCount;

            this.items.push(item);
        }

        return new Message(item.name + "(" + item.amount + ") has been added to your inventory.", 'white', 32, 4);
    }

    RemoveItem(item) {
        var index = this.items.findIndex(item);

        this.items.splice(index, 1);
    }
}