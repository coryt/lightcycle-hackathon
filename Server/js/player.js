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
    position: '',
    direction: '',
    status: '',

    init: function (options) {
        var empty = '';
        this.id = options.id || empty;
        this.name = options.name || empty;
        this.color = options.color || empty;
        this.position = options.position || empty;
        this.direction = options.direction || empty;
        this.status = options.status || 'Idle';
    }
}