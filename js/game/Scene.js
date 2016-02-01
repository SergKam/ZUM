define(["./Zum", "./Road", "../bower_components/async/dist/async"], function(Zum, Road, async) {

    var Scene = function(game) {
        this.game = game;
        this.hello();
    };

    Scene.prototype = {
        tick: function() {

        },

        wait: function(timeout, cb) {
            this.lastTimeout = setTimeout(cb.bind(this), timeout);
        },

        clear: function() {
            var actors = this.game.actorList.slice();
            actors.forEach(function(actor) {
                actor.destroy();
            })
        },

        hello: function() {

            this.game.canvas.className = "grass";

            var zum = new Zum(this.game, {
                left: -300,
                top: 300,
                deltaLeft: 100
            });

            this.game.addActor(new Road(this.game, {
                top: 300
            }));
            this.game.addActor(zum);

            var self = this;

            async.waterfall([
                function(next) {
                    self.wait(5000, next)
                },
                function(next) {
                    zum.deltaLeft = 0;
                    zum.animation = false;
                    zum.ask("Хочешь покататься? Тогда нажми на стрелку", function() {
                        zum.deltaLeft = 200;
                        zum.animation = true;
                        self.wait(5000, next);
                    });
                },
                function(next) {
                    self.clear();
                    self.crossroad1();
                }
            ]);

        },

        crossroad1: function() {
            this.game.addActor(new Road(this.game, {
                top: 300
            }));

            var zum = new Zum(this.game, {
                top: 300,
                deltaLeft: 100
            });

            this.game.addActor(zum);

            this.wait(15000, this.clear);
        }
    };

    return Scene;
});
