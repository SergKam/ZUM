define(["./utils"], function(utils) {
    var Actor = function(game, options) {
        this.game = game;
        this.el = document.createElement("div");
        if (game) {
            this.game.canvas.appendChild(this.el);
        }
        utils.mix(this, options || {});
    };

    Actor.prototype = {
        className: "",
        role: 0,
        left: 0,
        top: 0,
        deltaLeft: 0,
        deltaTop: 0,
        destroy: function() {
            this.el.parentNode.removeChild(this.el);
            this.game.removeActor(this);
        },
        setClass: function(cls) {
            this.el.className = cls;
        },

        tick: function(dt) {
            this.left += this.deltaLeft * (dt / 1000);
            this.top += this.deltaTop * (dt / 1000);
            this.el.className = this.className;
            this.el.style.left = Math.round(this.left) + 'px';
            this.el.style.top = Math.round(this.top) + 'px';
            if (typeof this.width === "number") {
                this.el.style.width = Math.round(this.width) + 'px';
            }
            if (typeof this.height === "number") {
                this.el.style.height = Math.round(this.height) + 'px';
            }
        },
        isOverlapped: function(target) {
            if (this.top > target.top + target.height) {
                return false;
            }
            if (this.top + this.height < target.top) {
                return false;
            }
            if (this.left > target.left + target.width) {
                return false;
            }
            if (this.left + this.width < target.left) {
                return false;
            }

            return true;
        }
    };

    return Actor;
});
