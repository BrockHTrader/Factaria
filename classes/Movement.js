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