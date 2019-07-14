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
