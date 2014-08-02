Crafty.scene('Load_tp1', function(){
    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 100, w: Crafty.DOM.window.width })
    .text('Loading ' + App._game.name)
    .textFont({ size: '80px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.load([
        'assets/sprites/spaceshooter.png',
    ]);

    Crafty.sprite('assets/sprites/spaceshooter.png',
    {
        spr_ufo_blue: [444,91, 91, 91],
        spr_ufo_green: [434,234, 91, 91],
        spr_ufo_red: [444,0, 91, 91],
        spr_ufo_yellow: [505,898, 91, 91],
    });


    Crafty.scene('GameMenu');
});



Crafty.scene('Game_tp1', function(){
    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 10, w: Crafty.DOM.window.width })
    .text(App._game.name)
    .textFont({ size: '80px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.e('HitDisplay')
    .attr({x: 0, y:0, w: Crafty.DOM.window.width, h: Crafty.DOM.window.height});

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

    Crafty.e('Actor, Mouse, spr_ufo_blue')
    .attr({x: (0 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + ydiff })
    .color("rgba(0,0,0,0)")
    .bind('Click', function(){
        hitcounterBlue.add();
    });

    hitcounterBlue = Crafty.e("HitCounter")
    .attr({x: (0 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + ydiff + 100, w: 91});
    
    Crafty.e('Actor, Mouse, spr_ufo_green')
    .attr({x: (1 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + ydiff })
    .color("rgba(0,0,0,0)")
    .bind('Click', function(){
        hitcounterGreen.add();
    });
    
    hitcounterGreen = Crafty.e("HitCounter")
    .attr({x: (1 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + ydiff + 100, w: 91});
    
    Crafty.e('Actor, Mouse, spr_ufo_red')
    .attr({x: (2 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + ydiff })
    .color("rgba(0,0,0,0)")
    .bind('Click', function(){
        hitcounterRed.add();
    });
    
    hitcounterRed = Crafty.e("HitCounter")
    .attr({x: (2 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + ydiff + 100, w: 91});
    
    Crafty.e('Actor, Mouse, spr_ufo_yellow')
    .attr({x: (3 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2 ) + ydiff })
    .color("rgba(0,0,0,0)")
    .bind('Click', function(){
        hitcounterYellow.add();
    });

    hitcounterYellow = Crafty.e("HitCounter")
    .attr({x: (3 * space + space / 2 - 91 / 2) + xdiff, y: (Crafty.DOM.window.height / 2 - 91 / 2) + ydiff + 100, w: 91});
    
    Crafty.e("2D, Canvas, Mouse, Text")
    .attr({ x: Crafty.DOM.window.width - 100, y: 10 })
    .text('Exit')
    .textFont({ size: '40px', weight: 'bold' })
    .bind('Click', function(){
        Crafty.scene('GameMenu');
    });
});


