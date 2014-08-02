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


