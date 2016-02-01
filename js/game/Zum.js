define(["./Actor", "./utils"], function(Actor, utils) {

    var Zum = function(game) {
        Actor.apply(this, arguments);

    };

    Zum.prototype = new Actor();

    utils.mix(Zum.prototype, {
        className: 'zum_right',
        animation: true,
        animationTime: 0,

        tick: function(dt) {
            Actor.prototype.tick.apply(this, arguments);
            if (!this.animation) {
                return;
            }
            this.animationTime += dt;
            if (this.animationTime > 100) {
                this.animationTime = 0;
            }
            this.className = 'zum_right' + (this.animationTime > 50 ? ' a1' : '');

        },

        ask: function(message, cb) {
            var panel = document.createElement('div');
            panel.className = "popup";
            panel.innerHTML = message;
            panel.addEventListener("click", function(e) {
                console.log(e);
                if(cb(e)) {
                    panel.parentNode.removeChild(panel);
                }
            });
            this.game.canvas.appendChild(panel);
        }

    })
    ;

    return Zum;
})
;
