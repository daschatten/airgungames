App = {
    // Define all games we have
    gameslist: [
        { 
            name: 'Target practice', 
            id: 'tp1', 
            players: { 
                min: 4, 
                max: 4, 
                }, 
            modes: ['Default'],
            difficulties: ['Default'],
        },
        { 
            name: 'Planet Defense', 
            id: 'pd1', 
            players: { 
                min: 1, 
                max: 4
                }, 
            modes: ['Default'],
            difficulties: ['Easy', 'Medium', 'Hard'],
        },
    ],

    // Current selected game
    _game: null,

    // Selected game mode
    _gamemode: null,

    // player count for current game
    // may be lower or higher then last manual selection
    // if game doesn't support selected player count
    _players: 2,

    // last selected player count
    // may differ from player count current game supports
    // this is used to restore player count if another game 
    // is selected
    _selectedPlayers: 2,

    // Difficulty level
    _difficulty: 0,

    // Game background
    background: '#FFFFFF',

    start: function()
    {

        Crafty.init(Crafty.DOM.window.width,Crafty.DOM.window.height);
        Crafty.background(App.background);

        Crafty.e('Settings');

        // Simply start the "Game" scene to get things going
        Crafty.scene('LoadMenu');
    },

    setGame: function(game)
    {
        this._game = game;
    },

    getGameMinPlayers: function()
    {
        if(this._game == null)
        {
            return 1;
        }else{
            return this._game.players.min;
        }
    },

    getGameMaxPlayers: function()
    {
        if(this._game == null)
        {
            return 4;
        }else{
            return this._game.players.max;
        }
    },

    incPlayers: function()
    {
        if(this._game == null)
        {
            return;
        }

        if(this._players < this.getGameMaxPlayers())
        {
            // _selectedPlayers may differ from _players if game doesn't
            // support player count. Here we equal these values because
            // it is a manual selection.
            this._selectedPlayers = this._players;

            this._selectedPlayers++;
            this._players++;
        }
    },
    
    decPlayers: function()
    {
        if(this._game == null)
        {
            return;
        }

        if(this._players > this.getGameMinPlayers())
        {
            // _selectedPlayers may differ from _players if game doesn't
            // support player count. Here we equal these values because
            // it is a manual selection.
            this._selectedPlayers = this._players;

            this._selectedPlayers--;
            this._players--;
        }
    },

    // This method is called when a game menu is loaded.
    // It checks if selected player count is supported by game.
    // If not we choose a supported player count next to the choosen value.
    initPlayers: function()
    {
        if(this._selectedPlayers < this.getGameMinPlayers())
        {
            this._players = this.getGameMinPlayers();
        }else if(this._selectedPlayers > this.getGameMaxPlayers()){
            this._players = this.getGameMaxPlayers();
        }else{
            this._players = this._selectedPlayers;
        }

        return this._players;
    },

    // Gamemode

    initGamemode: function()
    {
        this._gamemode = 0;
    },

    prevGamemode: function()
    {
        if(this._gamemode == 0)
        {
            return;
        }

        this._gamemode--;
    },

    nextGamemode: function()
    {
        if(this._gamemode == this._game.modes.length - 1)
        {
            return;
        }

        this._gamemode++;
    },

    getGamemodeName: function()
    {
        return this._game.modes[this._gamemode];
    },

    // Difficulty

    initDifficulty: function()
    {
        this._difficulty = 0;
    },

    prevDifficuly: function()
    {
        if(this._difficulty == 0)
        {
            return;
        }

        this._difficulty--;
    },

    nextDifficulty: function()
    {
        if(this._difficulty == this._game.difficulties.length - 1)
        {
            return;
        }

        this._difficulty++;
    },

    getDifficultyName: function()
    {
        return this._game.difficulties[this._difficulty];
    },

}

$text_css = { 'font-size': '10em', 'font-family': 'Helvetica', 'color': 'white', 'text-align': 'center' }
