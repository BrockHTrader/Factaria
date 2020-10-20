class Draw {
    constructor(canvas, options) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');;
        this.options = options;
    }

    DrawSprite(x, y, spriteNumber, rotation) {
        let size = this.options.SpriteSheet_Size;
        let row = 0;
        let col = 0;

        col = (spriteNumber % this.options.SpriteSheet_MaxColumns) - 1;
        row = (Math.floor(spriteNumber / this.options.SpriteSheet_MaxColumns)) - 1;

        if (col < 0)
            col = 0;

        if (row < 0)
            row = 0;

        let sx = col * size;
        let sy = row * size;

        if (typeof (rotation) === typeof (undefined)
            || rotation === 0) {
            this.context.beginPath();
            this.context.drawImage(spriteSheet, sx, sy, size, size, x, y, size, size);
            this.context.fill();
            this.context.closePath();
        } else {
            this.context.beginPath();
            this.context.translate(x + size / 2, y + size / 2);
            this.context.rotate(rotation * Math.PI / 180);
            this.context.drawImage(spriteSheet, sx, sy, size, size, size / 2 - size, size / 2 - size, size, size);
            this.context.rotate(-rotation * Math.PI / 180);
            this.context.translate(-x - size / 2, -y - size / 2);
            this.context.closePath();
        }
    }

    DrawSquare(x, y, height, width, outlineColor, backgroundColor) {
        this.context.beginPath();
        this.context.fillStyle = backgroundColor;
        this.context.strokeStyle = outlineColor;
        this.context.rect(x, y, height, width);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
    }

    DrawText(message, x, y, color, font) {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(message, x, y);
    }

    DrawInventoryMenu(inventory, menu) {
        let invMenuSlots = inventory.maxCount - menu.slots;
        let rows = Math.ceil(invMenuSlots / this.options.SpriteSheet_MaxColumns);
        let cols = invMenuSlots / rows;
        let menuHeight = rows * (menu.slotSize + menu.slotBuffer) + menu.slotBuffer;
        let leftBound = menu.padLeft;
        let topBound = canvas.height - menu.slotSize - menuHeight - menu.slotBuffer;
        let menuWidth = canvas.width - leftBound * 2;

        //Draw Background
        this.DrawSquare(leftBound, topBound, menuWidth, menuHeight, 'black', 'gray');

        //Draw Inventory Slots on Menu Background
        for (let c = 0; c < rows; c++) {
            for (let i = 0; i < cols; i++) {
                let x = leftBound + i * menu.slotSize + (menuWidth - cols * menu.slotSize) / 2;
                let y = topBound + menuHeight - (c + 1) * (menu.slotSize + 5);
                let height = menu.slotSize;
                let width = menu.slotSize;

                this.DrawSquare(x, y, width, height, 'black', menu.slotColor);
            }
        }
    }

    DrawInventory(inventory, menu) {
        inventory.items.forEach(item => {
            if (item.slot > menu.slots - 1)
                item.slot = -1;

            if (item.slot !== -1) {
                let x = menu.padLeft + menu.slotSize * item.slot + (menu.slotSize - this.options.SpriteSheet_Size) / 2;
                let y = this.canvas.height - menu.slotSize + (menu.slotSize - this.options.SpriteSheet_Size) / 2;
                let textY = this.canvas.height - this.options.ItemCount_TextSize / 2;

                this.DrawSprite(x, y, item.asset.assetNumber);
                this.DrawText(item.amount, x, textY, this.options.ItemCount_Color, this.options.ItemCount_TextSize + "px Arial");
            }
        });
    }

    DrawMenu(menu) {
        for (let i = 0; i < menu.slots; i++) {
            let x = menu.padLeft + i * menu.slotSize;
            let y = canvas.height - menu.slotSize;
            let height = menu.slotSize;
            let width = menu.slotSize;

            this.DrawSquare(x, y, height, width, 'black', menu.slotColor);
        }

        if (menu.selectedSlot != -1) {
            let x = menu.padLeft + menu.selectedSlot * menu.slotSize;
            let y = canvas.height - menu.slotSize;
            let height = menu.slotSize;
            let width = menu.slotSize;

            this.DrawSquare(x, y, height, width, 'lightblue', 'transparent');
        }
    }

    DrawMessage() {
        var message = displayMessage;

        if (message.message == "") {
            return;
        }

        let x = (this.canvas.width / 2) - (this.context.measureText(message.message).width / 2);
        let y = 100;

        this.DrawText(message.message, x, y, message.color, message.size + "px Arial");

        if (message.startTime == undefined) {
            message.startTime = new Date().getTime();
        } else {
            let totalSec = (new Date().getTime() - message.startTime) / 1000;

            if (totalSec > message.timeInSeconds) {
                displayMessage = defaultMessage;
            }
        }
    }

    DrawEntity(entity, cameraX, cameraY, rotation) {
        this.context.beginPath();
        switch (entity.type) {
            case 'circle':
                this.context.arc(entity.x, entity.y, entity.size, 0, Math.PI * 2);
                break;
            case 'square':
                this.context.rect(entity.x, entity.y, entity.size, entity.size);
                break;
            case 'asset':
                if (rotation !== undefined) {
                    console.log(rotation);
                }
                this.DrawSprite(entity.x - cameraX, entity.y + cameraY, entity.asset.assetNumber, rotation);
                return;
        }
        this.context.fillStyle = entity.color;
        this.context.fill();
        this.context.closePath();
    }

    DrawHUD(camera) {
        if (camera.isHUDOn) {
            let message = "x: " + camera.x + " y: " + camera.y + " | mx: " + parseInt(mouse.x) + " my: " + parseInt(mouse.y);
            let x = 8;
            let y = 16;
            let color = 'white';
            let font = '16px Arial';

            this.DrawText(message, x, y, color, font);
        }
    }

    ClearCanvas() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}