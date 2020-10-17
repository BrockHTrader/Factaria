/*
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Movement extends Position {
    constructor(x, y, dx, dy) {
        super(x, y);
        this.dx = dx;
        this.dy = dy;
    }

    Move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

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

class Asset {
    constructor(assetNumber) {
        this.SetValuesByAssetNumber(assetNumber);
    }

    SetValuesByAssetNumber(assetNumber) {
        var size = 32;
        var row = 0;
        var col = 0;

        col = (assetNumber % 10) - 1;
        row = (Math.floor(assetNumber / 10)) - 1;

        if (col < 0)
            col = 0;

        if (row < 0)
            row = 0;

        this.sx = col * size;
        this.sy = row * size;
        this.sWidth = size;
        this.sHeight = size;
    }
}

class Camera extends Movement {
    isHUDOn = true;
    zoom = 0;
    dLeft = false;
    dRight = false;
    dUp = false;
    dDown = false;

    constructor(x, y, speed) {
        super(x, y, 0, 0);
        this.speed = speed;
    }

    ToggleHUD() {
        this.isHUDOn = !this.isHUDOn;
    }

    ClearMovement() {
        this.dx = 0;
        this.dy = 0;
    }

    UpdateDxDy() {
        if (this.dLeft) {
            this.Move(this.speed * -1, 0)

            this.dx = this.speed * -1;
        } else if (this.dx < 0) {
            this.dx = 0;
        }

        if (this.dRight) {
            this.Move(this.speed, 0);

            this.dx = this.speed;
        } else if (this.dx > 0) {
            this.dx = 0;
        }

        if (this.dUp) {
            this.Move(0, this.speed);

            this.dy = this.speed;
        } else if (this.dy > 0) {
            this.dy = 0;
        }

        if (this.dDown) {
            this.Move(0, this.speed * -1);

            this.dy = this.speed * -1;
        } else if (this.dy < 0) {
            this.dy = 0;
        }
    }
}

class Menu {
    constructor(canvasWidth) {
        this.slots = 10;
        this.slotSize = 48;
        this.slotColor = 'rgba(51,51,51,0.65)';
        this.slotBuffer = 5;

        this.padLeft = canvasWidth / 2 - (this.slots * this.slotSize / 2);
        this.selectedSlot = -1;
        this.selectedSlotColor = 'rgba(102,102,102,0.65)'
    }
}

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

class Item {
    constructor(name, amount, asset) {
        this.name = name;
        this.amount = amount;
        this.asset = asset;

        this.slot = -1;
    }
}

class Inventory {
    constructor() {
        this.items = [];
        this.maxCount = 42;
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

class Message {
    //Message MaxLength = 50;
    constructor(message, color, size, timeInSeconds) {
        this.message = message;
        this.color = color;
        this.size = size;
        this.timeInSeconds = timeInSeconds;
        this.startTime = undefined;
    }
}
*/