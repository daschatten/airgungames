Crafty.scene('Load_pd1', function(){
    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 100, w: Crafty.DOM.window.width })
    .text('Loading ' + App._game.name)
    .textFont({ size: '60px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.load([
        'assets/sprites/spaceshooter.png',
        'assets/sprites/planet_1.png',
        'assets/sounds/Bomb-SoundBible.com-891110113.wav',
        'assets/sounds/Bomb-SoundBible.com-891110113.mp3',
        'assets/sounds/Bomb-SoundBible.com-891110113.ogg',
    ]);

    Crafty.sprite('assets/sprites/spaceshooter.png',
    {
        spr_meteorBrown_big_1: [224,664, 101, 84],
        spr_meteorBrown_tiny_1: [346,814, 18, 18],
    });

    Crafty.sprite('assets/sprites/planet_1.png',
    {
        spr_planet_1: [0,0, 117, 117],
    });

    Crafty.audio.add({
        explosion: [
            'assets/sounds/Bomb-SoundBible.com-891110113.wav',
            'assets/sounds/Bomb-SoundBible.com-891110113.mp3',
            'assets/sounds/Bomb-SoundBible.com-891110113.ogg',
        ]
        });

    Crafty.scene('GameMenu');
});



Crafty.scene('Game_pd1', function(){
    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 10, w: Crafty.DOM.window.width })
    .text(App._game.name)
    .textFont({ size: '60px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    var counter = Crafty.e('Counter');
    counter.attr({ x: 0, y: 100, w: Crafty.DOM.window.width });
    counter.textFont({ size: '40px' });
    counter.setLives(2);
    counter.css({ 'color': 'black', 'text-align': 'center' });

    var planet = Crafty.e('Planet_1');
    var posx = (Crafty.DOM.window.width / 2) - (117 / 2);
    var posy = (Crafty.DOM.window.height / 2) - (117 / 2);
    planet.spawn(posx, posy);

    var manager = Crafty.e('WaveManager');
    manager.attr({ x: 0, y: 200, w: Crafty.DOM.window.width });
    manager.textFont({ size: '40px' });
    manager.css({ 'color': 'black', 'text-align': 'center' });
    manager.nextWave();

//    Crafty.pause();
});



