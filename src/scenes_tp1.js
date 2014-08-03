Crafty.scene('Load_tp1', function(){
    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 100, w: Crafty.DOM.window.width })
    .text('Loading ' + App._game.name)
    .textFont({ size: '60px', weight: 'bold' })
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
    .textFont({ size: '60px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.e('HitDisplay')
    .attr({x: 0, y:0, w: Crafty.DOM.window.width, h: Crafty.DOM.window.height});
   
    Crafty.e("2D, Canvas, Mouse, Text")
    .attr({ x: Crafty.DOM.window.width - 100, y: 10 })
    .text('Exit')
    .textFont({ size: '20px', weight: 'bold' })
    .bind('Click', function(){
        Crafty.scene('GameMenu');
    });

    Crafty.e("TargetManager").start();
});


