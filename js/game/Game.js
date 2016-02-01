define([ "./Scene"], function(Scene) {
    var Game = function(canvas) {
        this.canvas = canvas;
        this.tickBinded =  this.tick.bind(this);
        this.updateSize();

        this.actorList = [];
        this.scene = new Scene(this);
    };

    Game.prototype = {
        addActor: function(actor) {
            this.actorList.push(actor);
        },
        removeActor: function(actor) {
            var index = this.actorList.indexOf(actor);
            if (index === -1) {
                return false;
            }
            this.actorList.splice(index, 1);
            return true;
        },
        eachActor: function(fn, role) {
            var self = this;
            this.actorList.forEach(function(actor) {
                if (role === undefined || role === actor.role) {
                    fn.call(self, actor);
                }
            });
        },
        run: function() {
           // this.addKeys();
            this.tick();
        },
        updateSize: function() {
            this.left = 0;
            this.top = 0;
            this.width = parseInt(window.innerWidth, 10) - 20;
            this.canvas.style.width = this.width + "px";

            this.height = parseInt(window.innerHeight, 10) - 20;
            this.canvas.style.height = this.height + "px";
        },

        tick: function(time) {

            var dt = (time - this.lastTime) || 1;
            this.lastTime = +time;
            this.scene.tick(dt);
            this.eachActor(function(actor) {
                actor.tick(dt);
            });

            requestAnimationFrame(this.tickBinded, this.canvas);

        }/*,

        addKeys: function() {

            document.addEventListener("keydown", function(event) {
                //  console.log(event);
                //left
                if (event.keyCode === 37) {
                    this.plain.goLeft();
                }
                //right
                if (event.keyCode === 39) {
                    this.plain.goRight();
                }
                //up
                if (event.keyCode === 38) {
                    this.plain.goUp();
                }
                //down
                if (event.keyCode === 40) {
                    this.plain.goDown();
                }
                //space
                if (event.keyCode === 32) {
                    this.plain.fire();

                }

                return false;
            }.bind(this));

            document.addEventListener("keyup", function(event) {
                //console.log(event);
                //left
                if (event.keyCode === 37) {
                    this.plain.stopLeft();
                }
                //right
                if (event.keyCode === 39) {
                    this.plain.stopLeft();
                }
                //up
                if (event.keyCode === 38) {
                    this.plain.stopTop();
                }
                //down
                if (event.keyCode === 40) {
                    this.plain.stopTop();
                }
                //space
                if (event.keyCode === 32) {
                    this.plain.stopFire();
                }
                return false;

            }.bind(this))

        }  */
    };

    return Game;
});
