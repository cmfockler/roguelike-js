"use strict";

class Glyph {
    _char = '';
    _foreground = '';
    _background = '';

    constructor(properties) {
        // Instantiate properties to default if they weren't passed
        properties = properties || {};

        this._char = properties['character'] || ' ';
        this._foreground = properties['foreground'] || 'white';
        this._background = properties['background'] || 'black';
    }

    get char() { return this._char; }
    get foreground() { return this._foreground; }
    get background() { return this._background; }
}
