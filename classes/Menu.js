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