class Controller {
    _displayInventoryMenu = false;

    constructor(element, camera) {
        this.element = element;
        this.camera = camera;
    }

    Setup() {
        this.element.addEventListener("keydown", event => {
            if (!this.displayInventoryMenu) {
                if (event.key == "w") {
                    this.camera.dUp = true;
                }

                if (event.key == "a") {
                    this.camera.dLeft = true;
                }

                if (event.key == "s") {
                    this.camera.dDown = true;
                }

                if (event.key == "d") {
                    this.camera.dRight = true;
                }
            }
        });

        this.element.addEventListener("keyup", event => {
            //Movement
            if (!this.displayInventoryMenu) {
                if (event.key == "w") {
                    this.camera.dUp = false;
                }

                if (event.key == "a") {
                    this.camera.dLeft = false;
                }

                if (event.key == "s") {
                    this.camera.dDown = false;
                }

                if (event.key == "d") {
                    this.camera.dRight = false;
                }
            }

            //Toggles
            if (event.key === "h") {
                this.camera.ToggleHUD();
            }

            if (event.key === "e") {
                this.displayInventoryMenu = !this.displayInventoryMenu;

                this.camera.dUp = false;
                this.camera.dLeft = false;
                this.camera.dDown = false;
                this.camera.dRight = false;
            }
        });

        this.element.addEventListener("scroll", event => {
            event.preventDefault();
        });
    }
}