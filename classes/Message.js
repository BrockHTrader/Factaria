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