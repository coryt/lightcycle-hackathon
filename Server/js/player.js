function Player(options) {
    if (!(this instanceof Player)) {
        return new Player(options);
    }

    return this.init(options);
}

Player.prototype = {
    id: '',
    name: '',
    color: '',

    init: function (options) {
        var empty = '';
        this.id = options.id || empty;
        this.name = options.name || empty;
        this.color = options.color || empty;
    }
}