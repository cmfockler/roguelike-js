"use strict";

class Map {
    constructor(tiles) {
        this._tiles = tiles;
        // cache the width and height based on the length 
        // of the dimensions of the tiles array
        this._width = tiles.length;
        this._height = tiles[0].length;
    }
    get width() { return this._width; }
    get height() { return this._height; }

    getTile(x, y) {
        // Make sure we are inside the bounds. If we aren't, return null tile
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return Game.Tile.nullTile;
        } else {
            return this._tiles[x][y] || Game.Tile.nullTile;
        }
    }
}
