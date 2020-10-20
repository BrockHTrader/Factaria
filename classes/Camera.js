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

    GetRotation() {
        if (this.dUp & this.dRight) {
            return 45;
        }

        if (this.dUp & this.dLeft) {
            return 315;
        }

        if (this.dDown & this.dRight) {
            return 135;
        }

        if (this.dDown & this.dLeft) {
            return 225;
        }

        if (this.dDown) {
            return 180;
        }

        if (this.dRight) {
            return 90;
        }

        if (this.dLeft) {
            return 360 - 90;
        }


    }
}