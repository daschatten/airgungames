Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Color');
    },

    spawn: function(x, y) {
        this.x = x;
        this.y = y;
    },
});

Crafty.c('GameChooseButton', {
    _game: null,

    init: function(){
        this.requires('Button');
        this.unbind('Click');
        this.bind('Click', function(){
            if(this._game)
            {
                App.setGame(this._game);
            }
            Crafty.scene(this._targetscene);
        });
    },
    
    setGame: function(game){
        this._game = game;
    },
});

Crafty.c('Button', {
    _basecolor: 'grey',
    _hovercolor: 'red',
    _targetscene: null,

    init: function(){
        this.requires('Color, Mouse');

        this.css({ 'border': '1px solid black'});

        this.color(this._basecolor);
        
        this.bind('MouseOver', function() {
            this.color(this._hovercolor);
        });

        this.bind('MouseOut', function(){
            this.color(this._basecolor);
        });

        this.bind('Click', function(){
            Crafty.scene(this._targetscene);
        });
    },

    setTargetscene: function(scene){
        this._targetscene = scene;
    },
});

Crafty.c('Timer', {
    init: function(){
        this.attr({
            seconds: 5,
            remaining: 5,
        });
    },

    setSeconds: function(value){
        this.seconds = value;
        this.remaining = value;
    },

    start: function(){
        this.runTimer();
    },

    runTimer: function(callback){
        this.updateText(this.remaining);

        if(this.remaining <= 0)
        {
            callback();
            this.destroy();
            return;
        }

        this.remaining--;
        this.timeout(this.runTimer, 1000);
    },
});

// Displays a text in Center of screen
Crafty.c('CenterText', {
    init: function(){
        this.requires('2D, DOM, Text');
        this.attr({ 
            x: 0, 
            y: 400, 
            w: Crafty.DOM.window.width,
        });
        this.text('Press a key to continue...');
        this.textFont({ size: '60px', weight: 'bold' })
        this.css({ 'color': 'black', 'text-align': 'center' });
    },

    setText: function(text){
        this.text = text;
    }
});

// Moves entity to given target coordinates
Crafty.c('MoveToStaticTarget', {
    init: function(){
        this.requires('Actor, MoveWithStaticVector');
        this.attr({
            _targetX: 0,
            _targetY: 0,
            _direction: +1,
            });
    },

    // Sets target coordinates
    setTarget: function(x,y){
        this._targetX = x;
        this._targetY = y;

        this.calculateVector();
    },

    // Calculates move vector
    calculateVector: function() {

        var directionx = this._targetX - this.x;
        var directiony = this._targetY - this.y;

        directionmodx = 1;
        directionmody = 1;

        if(directionx < 0)
        {
            directionmodx = -1;
        }

        if(directiony < 0)
        {
            directionmody = -1;
        }

        var xdiff = 0;
        var ydiff = 0;

        if(Math.abs(directionx) > Math.abs(directiony))
        {
            xdiff = this._speed * directionmodx;
            ydiff = Math.abs(directiony / directionx) * this._speed * directionmody;
        }else if(directionx < directiony){
            xdiff = Math.abs(directionx / directiony) * this._speed * directionmodx;
            ydiff = this._speed * directionmody;
        }else{
            xdiff = this._speed * directionmodx;
            ydiff = this._speed * directionmody;
        }

        this.setMoveVector(xdiff, ydiff);
        this.doMove();
    },

});

// Makes an entity to move with a static vector
// _diffx: x value to be added in each cycle
// _diffy: y value to be added in each cycle
// _speed: value to add to _diffx and _diffy in each cycle
Crafty.c('MoveWithStaticVector', {
    init: function() {
        this.requires('Actor');
        this.attr({
            _diffx: 0,
            _diffy: 0,
            _speed: 1,
            _enableRotation: false,
        });
        this.origin('center');
    },

    // Enable rotation
    enableRotation: function(bool)
    {
        // this._enableRotation = bool;
        // strange effects right now!
        this._enableRotation = false;
    },

    // Set speed
    setSpeed: function(value){
        this._speed = value;
    },

    // Set vector to move each cycle
    setMoveVector: function(x, y){
        this._diffx = x;
        this._diffy = y;
    },

    // Start moving
    doMove: function() {
        this.x += this._diffx * this._speed;
        this.y += this._diffy * this._speed;

        if(this._enableRotation)
        {
            this.rotation += 1;
        }

        this.timeout(this.doMove, 40);
    },
});

// Modifies alpha value of an entity over time
// _step:       value to modify alpha with
// _random:     wether to add a random component to _step
// _start:      alpha value to start with
// _end:        alpha value which ends alpha blend
// _destroy:    wether entity will be destroyed after reaching _end
// _timeout:    time in ms between cycles
Crafty.c('AlphaBlend', {
    init: function(){
        this.attr({
            _step: 0.02,
            _random: true,
            _start: 1,
            _end: 0,
            _destroy: true,
            _timeout: 40,
        });

        this.alpha = this._start;

        this.doRun();
    },

    // Sets amount of value the alpha will be modified
    // @value: 0 <= value <= 1
    setStep: function(value){
        this._step = value;
    },

    // Wether a random component should be added to step
    // It would be calculated: step * random + step
    // @value: Boolean
    setRendom: function(value){
        this._random = value;
    },

    // Set start value for alpha
    // @value: 0 <= value <= 1
    setStart: function(value){
        this._start = value;
    },

    // Set end value for alpha
    // @value: 0 <= value <= 1
    setEnd: function(value){
        this._end = value;
    },

    // Wether object should be destroyed once
    // alphe reached end value
    // @value: Boolean
    setDestroy: function(value){
        this._destroy = value;
    },

    // Sets timeout in ms to wait for next cycle
    // @value: Integer
    setTimeout: function(value){
        this._timeout = value;
    },

    // Starts alpha blend
    doRun: function() {
        var rand = 0;

        if(this._random)
        {
            rand = this._step * Math.random();
        }

        if(this._start > this._end)
        {
            var newalpha = this.alpha - (this._step + rand);
        }else{
            var newalpha = this.alpha + (this._step + rand);
        }

        if ((this._start > this._end && newalpha <= this._end) || (this._start < this._end && newalpha >= this._end))
        {
            if(this._destroy)
            {
                this.destroy();
            }
             
            return;
        }

        this.alpha = newalpha;

        this.timeout(this.doRun, this._timeout);

    },
});

Crafty.c('Explodable', {
    init: function(){
        this.attr({
            _audio: 'explosion',
            _explode_spr: null,
            _event: 'Click',
            _parts: {
                count: 4,
                random: true,
                randomparts: 4,
                entity: 'Meteor_Brown_Tiny_1',
                speed: 4,
            },
        });
    },

    explode: function(){
        Crafty.audio.play(this.audio);
        this.unbind(this.eventhandler);
        this.destroy();
        Crafty('WaveManager').removeSpawn();
        if(!this.explode_spr)
        {
            console.log('Child needs to define "explode_spr" as attr');
            return;
        }

        var rand = 0;

        if(this._parts.random)
        {
            rand += Math.round(Math.random() * this._parts.randomparts);

        }

        var partcount = this._parts.count + rand;

        for(i=0;i<partcount;i++)
        {
            var speed = this._speed + Math.random() * this._parts.speed;

            diffx = ((Math.random() * 2) - 1);
            diffy = ((Math.random() * 2) - 1);

            var part = Crafty.e(this._parts.entity);
            part.spawn(this.x, this.y);
            part.setSpeed(speed);
            part.setMoveVector(diffx, diffy);
            part.doMove();
        }

    },
});

Crafty.c("Circle", {
    init: function(){
        this.requires('2D, Canvas, Color');
        this.attr({
            _radius: 10,
            _w: 5,
            _h: 5,
        });

        this.color = 'black';

        return this;
    },
        
    setRadius: function(value){
        this._radius = value;
        this._w = this._radius * 2;
        this._h = this._radius * 2;

        return this;
    },

    drawMe: function() {
       console.log('Draw');

        canvas = Crafty.canvas;
      context = Crafty.canvas.context;
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 70;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'black';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();
/*
       var ctx = Crafty.canvas.context;
       ctx.save();
       ctx.fillStyle = this.color;
       ctx.beginPath();
       ctx.arc(
           this.x + this._radius,
           this.y + this._radius,
           this._radius,
           0,
           Math.PI * 2
       );
       ctx.closePath();
       ctx.fill();
*/
    }
});

Crafty.c('MenuText', {
    init: function(){
        this.requires("2D, DOM, Text");
        this.textFont({ size: '60px', weight: 'bold' });
        this.css('text-align', 'left');
    },
});

Crafty.c('PlayerCount', {
    init: function(){
        this.requires("2D, DOM, Text")
        this.update();
        this.textFont({ size: '60px', weight: 'bold' });
        this.css('text-align', 'center');
    },

    update: function()
    {
        this.text(App._players);
    }
});

Crafty.c('GameMode', {
    init: function(){
        this.requires("2D, DOM, Text")
        this.update();
        this.textFont({ size: '60px', weight: 'bold' });
        this.css('text-align', 'center');
    },

    update: function()
    {
        this.text(App.getGamemodeName());
    }
});

Crafty.c('Difficulty', {
    init: function(){
        this.requires("2D, DOM, Text")
        this.update();
        this.textFont({ size: '60px', weight: 'bold' });
        this.css('text-align', 'center');
    },

    update: function()
    {
        this.text(App.getDifficultyName());
    }
});

Crafty.c('HitCounter', {
    init: function(){
        this.requires("2D, DOM, Text")
        this.textFont({ size: '60px', weight: 'bold' });
        this.css('text-align', 'center');
        this.attr({ hits: 0 });
        this.text('0');
    },

    add: function()
    {
        this.hits++;
        this.text(this.hits);
    }
});
