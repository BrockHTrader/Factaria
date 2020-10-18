var options = {
    SpriteSheet_Path: '/assets/ss.png',
    SpriteSheet_Size: 32,
    SpriteSheet_MaxColumns: 10,
    Message_Size: 32,
    Message_Color: 'white',
    ItemCount_TextSize: 8,
    ItemCount_Color: 'lightblue',
    Action_Cooldown: 1250,
    Chunk_Size: 25,
    Tile_Size: 32
}

var spriteSheet = new Image();
spriteSheet.src = options.SpriteSheet_Path;

var canvas = document.getElementById("canvas");
var chunks = [];
var camera = new Camera(0, 0, 2);
var player = new Entity((canvas.width / 2) - 16, (canvas.height / 2) - 16, 32, 'transparent', 'asset', new Asset(21));
var playerLayer2 = new Entity((canvas.width / 2) - 16, (canvas.height / 2) - 16, 32, 'transparent', 'asset', new Asset(22));
var mouse = new Position(0, 0);
var menu = new Menu(canvas.width);
var assetUtil = new AssetUtilites();
var defaultMessage = new Message("", options.Message_Color, options.Message_Size, 0)
var displayMessage = defaultMessage;
var playerUseCooldown = undefined;
var cooldownTime = options.Action_Cooldown;
var displayInventoryMenu = false;

var inventory = new Inventory(42, 48, 48);
var drawManager = new Draw(canvas, options);

inventory.Setup(canvas.height, canvas.width);

//test area

//test area

window.onload = function () {
    setInterval(Render, 10);

    chunks.push(new Chunk(0, 0));

    SetupControls();
    AddGround();
    AddResources();
}

function AddGround() {
    var currentChunk = FindCurrentChunk(player.x, player.y);
    for (let w = 0; w < canvas.width; w += 32) {
        for (let h = 0; h < canvas.height; h += 32) {
            var randomAssetNumber = GenerateNumberInRange(76, 83);
            chunks[0].entities.push(new Entity(w, h, 32, 'transparent', 'asset', new Asset(randomAssetNumber)));
        }
    }
}

function GenerateNumberInRange(low, high) {
    return Math.floor((Math.random() * (high - low)) + low);
}

function FindCurrentChunk(playerX, playerY) {
    let chunkWidth = options.Chunk_Size * options.Tile_Size;
    let chunkHeight = chunkWidth; //Chunks are squares.
}

function AddResources() {
    let coalResource = CloneObject(MasterItemList[ItemMap['Coal']]);
    coalResource.amount = 10;
    chunks[0].entities.push(assetUtil.Coal(64, 0, new Resource(coalResource)));
}

function Render() {
    drawManager.ClearCanvas();

    camera.UpdateDxDy();
    chunks.forEach(chunk => {
        chunk.entities.forEach(entity => {
            if (entity.markForDelete) {
                return;
            }

            if (entity.entityType == 'gatherable' && entity.resource.item.amount == 0) {
                entity.markForDelete = true;
            }

            drawManager.DrawEntity(entity);
            entity.Move(camera.dx * -1, camera.dy)
        })
    });

    drawManager.DrawEntity(player);
    drawManager.DrawEntity(playerLayer2);
    drawManager.DrawMenu(menu);
    drawManager.DrawInventory(inventory, menu);
    drawManager.DrawHUD(camera);

    if (displayInventoryMenu)
        drawManager.DrawInventoryMenu();

    drawManager.DrawMessage(displayMessage);
}

function GetMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function CloneObject(obj) {
    return { ...obj };
}

function SetupControls() {
    document.addEventListener("keydown", event => {
        //event.preventDefault();

        if (!displayInventoryMenu) {
            if (event.key == "w") {
                camera.dUp = true;
                camera.dDown = false;
            }

            if (event.key == "a") {
                camera.dLeft = true;
                camera.dRight = false;
            }

            if (event.key == "s") {
                camera.dDown = true;
                camera.dUp = false;
            }

            if (event.key == "d") {
                camera.dRight = true;
                camera.dLeft = false;
            }

            if (event.keyCode == 32) { //Spacebar
                KeyDownSpacebarHandler();
            }
        }
    });

    document.addEventListener("keyup", event => {
        //Movement
        if (!displayInventoryMenu) {
            if (event.key == "w") {
                camera.dUp = false;
            }

            if (event.key == "a") {
                camera.dLeft = false;
            }

            if (event.key == "s") {
                camera.dDown = false;
            }

            if (event.key == "d") {
                camera.dRight = false;
            }
        }

        //Toggles
        if (event.key === "h") {
            camera.ToggleHUD();
        }

        if (event.key === "e") {
            displayInventoryMenu = !displayInventoryMenu;

            camera.dUp = false;
            camera.dLeft = false;
            camera.dDown = false;
            camera.dRight = false;
        }
    });

    document.addEventListener("scroll", event => {
        event.preventDefault();
    });

    canvas.addEventListener('mousemove', event => {
        var pos = GetMousePosition(this.canvas, event);

        mouse.x = pos.x;
        mouse.y = pos.y;
    });

    canvas.addEventListener('click', event => {
        if (mouse.y < canvas.height - 40 || (mouse.x < menu.padLeft || mouse.x > (canvas.width - menu.padLeft))) {
            chunks[0].entities.push(new Entity(mouse.x, mouse.y, 8, 'orange', 'circle', undefined));
        } else {
            var slot = Math.floor((mouse.x - menu.padLeft) / menu.slotSize);
            menu.selectedSlot = slot;
        }
    });
}

function KeyDownSpacebarHandler() {
    if (playerUseCooldown != undefined) {
        var dt = new Date().getTime() - playerUseCooldown;

        if (dt < cooldownTime) {
            return;
        }

        playerUseCooldown = undefined;
    }

    let foundEntity = undefined;
    chunks[0].entities.forEach(entity => {
        if (entity.entityType == 'gatherable' && !entity.markForDelete) {
            let dx = entity.x - player.x;
            let dy = entity.y - player.y;

            if (Math.abs(dx) > 32 || Math.abs(dy) > 32) {
                //Can't be touching.
                return;
            }

            foundEntity = entity;
            return;
        }
    });

    if (foundEntity != undefined) {
        inventory.AddItems(foundEntity.Gather());

        if (playerUseCooldown == undefined) {
            playerUseCooldown = new Date().getTime();
        }
    }
}