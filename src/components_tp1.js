Crafty.c('HitDisplay', {
    init: function() {
        this.requires('2D, Canvas, Mouse');

        this.bind('Click', function(e){
            this.hit(e);
        });

    },

    hit: function(e){
        var x = e.clientX;
        var y = e.clientY;

        console.log('Hit on ' + x + ',' + y);

        Crafty.e('2D, Canvas, Color')
        .attr({x: x, y: y, w: 10, h: 10, _globalZ: 100})
        .color('#000000');
    },

});

Crafty.c('BulletHole', {
    init: function() {
        this.requires('Circle');
    },
});

Crafty.c('TargetManager', {
    init: function() {
        // require 2D to make sure object is destroyed when scene ends
        this.requires('2D');
        this.attr({
            _xdiff: 0,
            _ydiff: 0,
            _targetBlue: null,
            _targetGreen: null,
            _targetRed: null,
            _targetYellow: null,
            _hitCounterBlue: null,
            _hitCounterGreen: null,
            _hitCounterRed: null,
            _hitCounterYellow: null,
            _timer: null,
            _remaining: 0,
        });
    },

    start: function(timer) {
        this._timer = timer;
        this.initTargets();
        this.setTargets();
    },

    initTargets: function() {

        this.calculatePosition();

        this._hitCounterBlue = Crafty.e("HitCounter");

        this._targetBlue = Crafty.e('Actor, Mouse, spr_ufo_blue')
        .color("rgba(0,0,0,0)")
        .bind('Click', function(){
            Crafty('TargetManager')._hitCounterBlue.add();
        });
        
        this._hitCounterGreen = Crafty.e("HitCounter");
        
        this._targetGreen = Crafty.e('Actor, Mouse, spr_ufo_green')
        .color("rgba(0,0,0,0)")
        .bind('Click', function(){
            Crafty('TargetManager')._hitCounterGreen.add();
        });
        
        this._hitCounterRed = Crafty.e("HitCounter");
        
        this._targetRed = Crafty.e('Actor, Mouse, spr_ufo_red')
        .color("rgba(0,0,0,0)")
        .bind('Click', function(){
            Crafty('TargetManager')._hitCounterRed.add();
        });
        
        this._hitCounterYellow = Crafty.e("HitCounter");
     
        this._targetYellow = Crafty.e('Actor, Mouse, spr_ufo_yellow')
        .color("rgba(0,0,0,0)")
        .bind('Click', function(){
            Crafty('TargetManager')._hitCounterYellow.add();
        });

    },

    setTargets: function() {

        this._remaining--;

        if(this._remaining <= 0){
            this.calculatePosition();

            this._targetBlue.attr({x: (0 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + this._ydiff });
            this._hitCounterBlue.attr({x: (0 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + this._ydiff + 100, w: 91});

            this._targetGreen.attr({x: (1 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + this._ydiff });
            this._hitCounterGreen.attr({x: (1 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + this._ydiff + 100, w: 91});

            this._targetRed.attr({x: (2 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + this._ydiff });
            this._hitCounterRed.attr({x: (2 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + this._ydiff + 100, w: 91});

            this._targetYellow.attr({x: (3 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2 ) + this._ydiff });
            this._hitCounterYellow.attr({x: (3 * space + space / 2 - 91 / 2) + this._xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + this._ydiff + 100, w: 91});

            this._remaining = this.getTimerValue() / 1000;
        }

        this._timer.updateRemaining(this._remaining);
        this.timeout(this.setTargets, 1000);
    },

    calculatePosition: function() {
        width = Crafty.DOM.window.width;
        space = width / 4;

        // add/subtract a random value to x position
        xdiff = (space / 2 - 91 / 2) * Math.random();
        if(Math.random() - 0.5 < 0)
        {
            xdiff = xdiff - 2 * xdiff;
        }

        height = Crafty.DOM.window.height - 200;
        ydiff = (height / 2 - 91/2) * Math.random();
        if(Math.random() - 0.5 < 0)
        {
            ydiff = ydiff - 2 * ydiff;
        }

        this._xdiff = xdiff;
        this._ydiff = ydiff;
    },

    getTimerValue: function() {
        switch(App._gamemode) {
            case 0:
                return 3000;
            case 1:
                return 10000;
            case 2:
                return 30000;
            default:
                return 3000;
        }
    },
});

Crafty.c("TP1_Timer", {
    init: function() {
        this.requires("2D, Canvas, Text");
        this.attr({ _remaining: 0 });
    },

    updateRemaining: function(value) {
        this._remaining = value;
        this.text(this._remaining);
    },
});
