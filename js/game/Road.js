define(["./Actor","./utils"], function(Actor, utils) {

    var Road = function(game) {
        Actor.apply(this, arguments);
    };

    Road.prototype = new Actor();
    utils.mix(Road.prototype, {
        className: 'road',
        width: 3000,
        height: 300,
        deltaLeft: 0,
        deltaTop: 0

    });
    return Road;
});
