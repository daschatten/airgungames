Crafty.scene('LoadMenu', function(){
    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 100, w: Crafty.DOM.window.width })
    .text('Loading airgungames')
    .textFont({ size: '80px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.load([
        'assets/sprites/blueSheet.png',
    ]);

    Crafty.sprite('assets/sprites/blueSheet.png',
    {
        spr_arrow_left: [339,143, 39, 31],
        spr_arrow_right: [378,143, 39, 31],
    });

    Crafty.scene('Menu');
});




Crafty.scene('Menu', function(){
   
    var _page = 1;
    var _grid  = {
        minborder: 100,
        page: {
            headerspace: 300,
            footerspace: 100,
            lines: 2
        },
        line: {
            items: 3,
            spacing: 100,
            margin: 200,
        }
    };

    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 50, w: Crafty.DOM.window.width })
    .text("Airgun Games")
    .textFont({ size: '80px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    var line_height = Crafty.DOM.window.height - _grid.page.headerspace - _grid.page.footerspace;
    var item_width = (Crafty.DOM.window.width - (_grid.line.items - 1) * _grid.line.spacing - 2 * _grid.line.margin) / _grid.line.items;

    for(i=0; i<_grid.page.lines; i++)
    {
        for(j=0; j<_grid.line.items;j++)
        {
            var pos = i * _grid.line.items + j;

            if(pos in App.gameslist)
            {
                var posx = _grid.line.margin + j * (item_width + _grid.line.spacing);
                var posy = _grid.page.headerspace + i * line_height;
    
                g = App.gameslist[pos];

                button = Crafty.e("HTML, DOM, GameChooseButton")
                .append('<div class="menuitem">' + g.name + '</div>')
                .attr({ x: posx, y: posy, w: item_width, h: 100 })

                button.setTargetscene('Load_' + g.id);
                button.setGame(g);
            }
        }
    }
});

Crafty.scene('GameMenu', function(){
    
    // init player count for choosen game
    App.initPlayers();
    App.initGamemode();

    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 50, w: Crafty.DOM.window.width })
    .text(App._game.name)
    .textFont({ size: '80px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    // Player count setting

    decPlayers = Crafty.e("2D, DOM, Color, Mouse, spr_arrow_left")
    .attr({x: Crafty.DOM.window.width/2, y: 200 + 49 / 2})
    .color('rgba(0,0,0,0)');

    decPlayers.bind('Click', function(){
        App.decPlayers();
        playersCount.update();
    });

    Crafty.e("MenuText")
    .text("# Players")
    .attr({x: Crafty.DOM.window.width/2 - 500, y: 200, w: 500, h: 80});

    playersCount = Crafty.e("PlayerCount")
    .attr({x: Crafty.DOM.window.width/2 + 100, y: 200, w: 500, h: 80});

    incPlayers = Crafty.e("2D, DOM, Color, Mouse, spr_arrow_right")
    .attr({x: Crafty.DOM.window.width/2 + 50, y: 200 + 49 / 2})
    .color('rgba(0,0,0,0)');
    
    incPlayers.bind('Click', function(){
        App.incPlayers();
        playersCount.update();
    });

    // Game mode setting

    Crafty.e("MenuText")
    .text("Game mode")
    .attr({x: Crafty.DOM.window.width/2 - 500, y: 320, w: 500, h: 80});

    gameMode = Crafty.e("GameMode")
    .attr({x: Crafty.DOM.window.width/2 + 100, y: 320, w: 500, h: 80});

    prevGamemode = Crafty.e("2D, DOM, Color, Mouse, spr_arrow_left")
    .attr({x: Crafty.DOM.window.width/2, y: 320 + 49 / 2})
    .color('rgba(0,0,0,0)');

    prevGamemode.bind('Click', function(){
        App.prevGamemode();
        gameMode.update();
    });

    nextGamemode = Crafty.e("2D, DOM, Color, Mouse, spr_arrow_right")
    .attr({x: Crafty.DOM.window.width/2 + 50, y: 320 + 49 / 2})
    .color('rgba(0,0,0,0)');

    nextGamemode.bind('Click', function(){
        App.nextGamemode();
        gameMode.update();
    });


    // Difficulty

    Crafty.e("MenuText")
    .text("Difficulty")
    .attr({x: Crafty.DOM.window.width/2 - 500, y: 440, w: 500, h: 80});

    difficulty = Crafty.e("Difficulty")
    .attr({x: Crafty.DOM.window.width/2 + 100, y: 440, w: 500, h: 80});

    prevDifficuly = Crafty.e("2D, DOM, Color, Mouse, spr_arrow_left")
    .attr({x: Crafty.DOM.window.width/2, y: 440 + 49 / 2})
    .color('rgba(0,0,0,0)');

    prevDifficuly.bind('Click', function(){
        App.prevDifficuly();
        difficulty.update();
    });

    nextDifficulty = Crafty.e("2D, DOM, Color, Mouse, spr_arrow_right")
    .attr({x: Crafty.DOM.window.width/2 + 50, y: 440 + 49 / 2})
    .color('rgba(0,0,0,0)');

    nextDifficulty.bind('Click', function(){
        App.nextDifficulty();
        difficulty.update();
    });

    // Start game

    button = Crafty.e("HTML, DOM, Button")
    .append('<div class="menuitem">Start Game</div>')
    .attr({x: Crafty.DOM.window.width/2 - 500, y: 680, w: 1000, h: 100});
    button.setTargetscene('Game_' + App._game.id);

    // Return

    button = Crafty.e("HTML, DOM, Button")
    .append('<div class="menuitem">Return</div>')
    .attr({x: Crafty.DOM.window.width/2 - 500, y: 800, w: 1000, h: 100});
    button.setTargetscene('Menu');
});

Crafty.scene('Lost', function(){
    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 100, w: Crafty.DOM.window.width })
    .text(App._game.name)
    .textFont({ size: '80px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 200, w: Crafty.DOM.window.width })
    .text("You lost!")
    .textFont({ size: '60px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    button = Crafty.e("HTML, DOM, Button")
    .append('<div class="menuitem">Restart Game</div>')
    .attr({x: Crafty.DOM.window.width/2 - 200, y: 400, w: 400, h: 100});
    button.setTargetscene('Game_' + App._game.id);

    button = Crafty.e("HTML, DOM, Button")
    .append('<div class="menuitem">Return</div>')
    .attr({x: Crafty.DOM.window.width/2 - 200, y: 600, w: 400, h: 100});
    button.setTargetscene('GameMenu');

});

Crafty.scene('Win', function(){

    seconds = Math.round(timediff / 10, 2);
    seconds = seconds / 100;

    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 100, w: Crafty.DOM.window.width })
    .text(App._game.name)
    .textFont({ size: '80px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 200, w: Crafty.DOM.window.width })
    .text("Victory!")
    .textFont({ size: '60px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    Crafty.e("2D, DOM, Text")
    .attr({ x: 0, y: 300, w: Crafty.DOM.window.width })
    .text('Time: ' + seconds + 's')
    .textFont({ size: '60px', weight: 'bold' })
    .css({ 'color': 'black', 'text-align': 'center' });

    button = Crafty.e("HTML, DOM, Button")
    .append('<div class="menuitem">Restart Game</div>')
    .attr({x: Crafty.DOM.window.width/2 - 200, y: 500, w: 400, h: 100});
    button.setTargetscene('Game_' + App._game.id);

    button = Crafty.e("HTML, DOM, Button")
    .append('<div class="menuitem">Return</div>')
    .attr({x: Crafty.DOM.window.width/2 - 200, y: 700, w: 400, h: 100});
    button.setTargetscene('GameMenu');

});
