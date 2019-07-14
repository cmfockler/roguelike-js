
//?!  Why not contain a glyph?
class Tile extends Glyph {
    constructor(properties) {
        // Call the Glyph constructor with our properties
        super(properties);

        // Set up the properties. We use false by default.
        this._isWalkable = properties['isWalkable'] || false;
        this._isDiggable = properties['isDiggable'] || false;
    }

    get isWalkable() { return this._isWalkable; }
    get isDiggable() { return this._isDiggable; }
}

Game.Tiles = {};
Game.Tiles.nullTile = new Tile({});
Game.Tiles.floorTile = new Tile({
    character: '.',
    isWalkable: true
});
Game.Tiles.wallTile = new Tile({
    character: '#',
    foreground: 'goldenrod',
    isDiggable: true
});
