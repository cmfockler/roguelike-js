"use strict";

Game.Screen = {};

// Define our initial start screen
Game.Screen.startScreen = {
    enter: function () { console.log("Entered start screen."); },
    exit: function () { console.log("Exited start screen."); },
    render: function (display) {
        // Render our prompt to the screen
        display.drawText(1, 1, "%c{yellow}Javascript Roguelike");
        display.drawText(1, 2, "Press [Enter] to start!");
    },
    handleInput: function (inputType, inputData) {
        // When [Enter] is pressed, go to the play screen
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                Game.switchScreen(Game.Screen.playScreen);
            }
        }
    }
}

// Define our playing screen
Game.Screen.playScreen = {
    _map: null,
    _centerX: 0,
    _centerY: 0,

    enter: function () {
        console.log("Entered play screen.");
        var tileArray = [];
        var mapWidth = 500;
        var mapHeight = 500;
        for (var x = 0; x < mapWidth; x++) {
            // Create the nested array for the y values
            tileArray.push([]);
            // Add all the tiles
            for (var y = 0; y < mapHeight; y++) {
                tileArray[x].push(Game.Tiles.nullTile);
            }
        }
        // Setup the map generator
        var generator = new ROT.Map.Cellular(mapWidth, mapHeight);
        generator.randomize(0.5);

        // Smoothen the map and then update tileArray
        generator.create();
        generator.create();
        generator.create(function (x, y, v) {
            if (v === 1) {
                tileArray[x][y] = Game.Tiles.floorTile;
            } else {
                tileArray[x][y] = Game.Tiles.wallTile;
            }
        });
        // Create our map from the tiles
        this._map = new Map(tileArray);
    },

    exit: function () { console.log("Exited play screen."); },

    render: function (display) {
        // display.drawText(3,5, "%c{red}%b{white}This game is so much fun!");
        // display.drawText(4,6, "Press [Enter] to win, or [Esc] to lose!");

        var screenWidth = Game.getScreenWidth();
        var screenHeight = Game.getScreenHeight();
        // Make sure the x-axis doesn't go to the left of the left bound
        var topLeftX = Math.max(0, this._centerX - (screenWidth / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftX = Math.min(topLeftX, this._map.width - screenWidth);
        // Make sure the y-axis doesn't above the top bound
        var topLeftY = Math.max(0, this._centerY - (screenHeight / 2));
        // Make sure we still have enough space to fit an entire game screen
        topLeftY = Math.min(topLeftY, this._map.height - screenHeight);

        // Iterate through all map cells
        for (let x = topLeftX; x < topLeftX + screenWidth; x++) {
            for (let y = topLeftY; y < topLeftY + screenHeight; y++) {
                // Fetch the glyph for the tile and render it to the screen
                var tile = this._map.getTile(x, y);
                display.draw(x - topLeftX, y - topLeftY, tile.char, tile.foreground, tile.background);
            }
        }

        // Render the player
        display.draw(this._centerX - topLeftX, this._centerY - topLeftY,
            '@', 'white', 'black');
    },
    handleInput: function (inputType, inputData) {
        if (inputType === 'keydown') {
            // If enter is pressed, go to the win screen
            // If escape is pressed, go to lose screen
            if (inputData.keyCode === ROT.KEYS.VK_RETURN) {
                Game.switchScreen(Game.Screen.winScreen);
            } else if (inputData.keyCode === ROT.KEYS.VK_ESCAPE) {
                Game.switchScreen(Game.Screen.loseScreen);
            }

            // Player Movement
            if (inputData.keyCode === ROT.KEYS.VK_LEFT) {
                this.movePlayer(-1, 0);
            } else if (inputData.keyCode === ROT.KEYS.VK_RIGHT) {
                this.movePlayer(1, 0);
            } else if (inputData.keyCode === ROT.KEYS.VK_UP) {
                this.movePlayer(0, -1);
            } else if (inputData.keyCode === ROT.KEYS.VK_DOWN) {
                this.movePlayer(0, 1);
            }

        }
    },
    movePlayer: function (dX, dY) {
        // Positive dX means movement right
        // negative means movement left
        // 0 means none
        this._centerX = Math.max(0, Math.min(this._map.width - 1, this._centerX + dX)
        );
        // Positive dY means movement down
        // negative means movement up
        // 0 means none
        this._centerY = Math.max(0, Math.min(this._map.height - 1, this._centerY + dY)
        );
    }
}

// Define our winning screen
Game.Screen.winScreen = {
    enter: function () { console.log("Entered win screen."); },
    exit: function () { console.log("Exited win screen."); },
    render: function (display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }
    },
    handleInput: function (inputType, inputData) {
        // Nothing to do here      
    }
}

// Define our winning screen
Game.Screen.loseScreen = {
    enter: function () { console.log("Entered lose screen."); },
    exit: function () { console.log("Exited lose screen."); },
    render: function (display) {
        // Render our prompt to the screen
        for (var i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You lose! :(");
        }
    },
    handleInput: function (inputType, inputData) {
        // Nothing to do here      
    }
}