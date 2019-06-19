"use strict";

var Game = {
    _display: null,   //ROT.Display
    _displayWidth: 80,
    _displayHeight: 24,

    _currentScreen: null,  //Game.Screen
    _screenWidth: 80,
    _screenHeight: 24,

    getDisplay: function () { return this._display; },
    getDisplayWidth: function () { return this._displayWidth; },
    getDisplayHeight: function () { return this._displayHeight; },

    getCurrentScreen: function () { return this._currentScreen; },
    getScreenWidth: function () { return this._screenWidth; },
    getScreenHeight: function () { return this._screenHeight; },


    init: function () {
        this._display = new ROT.Display({ width: this._displayWidth, height: this._displayHeight });
        this._display.drawText(2, 2, "INITIALIZING");

        // Create a helper function for binding to an event
        // and making it send it to the screen
        var game = this; // So that we don't lose "this"
        var bindEventToScreen = function (event) {
            window.addEventListener(event, function (e) {
                // When an event is received, send it to the screen if there is one
                if (game._currentScreen !== null) {
                    game._currentScreen.handleInput(event, e);

                    // Render the screen
                    game._currentScreen.render(game._display);
                }
            });
        }
        // Bind keyboard input events
        bindEventToScreen('keydown');
        //bindEventToScreen('keyup');
        //bindEventToScreen('keypress');


    },

    switchScreen: function (screen) {
        // If we had a screen before, notify it that we exited
        if (this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        // Clear the display
        this.getDisplay().clear();
        // Update our current screen, notify it we entered
        // and then render it
        this._currentScreen = screen;
        if (this._currentScreen !== null) {
            this._currentScreen.enter();
            this._currentScreen.render(this._display);
        }
    }
}


window.onload = function () {
    // Initialize the game
    Game.init();
    // Add the container to our HTML page
    document.body.appendChild(Game.getDisplay().getContainer());

    Game.switchScreen(Game.Screen.startScreen);
}


// var o = {
//     width: 11,
//     height: 5
// }
// var d = new ROT.Display(o);
// document.body.appendChild(d.getContainer());

// for (var i = 0; i < o.width; i++) {
//     for (var j = 0; j < o.height; j++) {
//         if (!i || !j || i + 1 == o.width || j + 1 == o.height) {
//             d.draw(i, j, "#", "gray");
//         } else {
//             d.draw(i, j, ".", "#666");
//         }
//     }
// }
// d.draw(o.width >> 1, o.height >> 1, "@", "goldenrod");

// //--------------------------------------------------------------------------

// var display = new ROT.Display({ width: 80, height: 20 });
// var container = display.getContainer();
// // Add the container to our HTML page
// document.body.appendChild(container);

// var foreground, background, colors;
// for (var i = 0; i < 15; i++) {
//     // Calculate the foreground color, getting progressively darker
//     // and the background color, getting progressively lighter.
//     foreground = ROT.Color.toRGB([255 - (i * 20),
//     255 - (i * 20),
//     255 - (i * 20)]);
//     background = ROT.Color.toRGB([i * 20, i * 20, i * 20]);
//     // Create the color format specifier.
//     colors = "%c{" + foreground + "}%b{" + background + "}";
//     // Draw the text two columns in and at the row specified
//     // by i
//     display.drawText(2, i, colors + "Hello, world!");
// }