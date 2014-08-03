Crafty.c('Meteor', {
    init: function() {
        this.requires('MoveToStaticTarget, Color, Collision, Mouse, Explodable');

        this.onHit('Planet', this.planetHit);
        this.bind('Click', function(){
            this.explode();
        });

    },

    planetHit: function(data){
        Crafty('Counter').hit();
        this.explode();
    },

    autoSpawn: function(){
        var rand = Math.random();

        if(rand < 0.5)
        {
            this.spawn(-1 * this.w, Math.random() * Crafty.DOM.window.height);
        }else{
            this.spawn(Crafty.DOM.window.width, Math.random() * Crafty.DOM.window.height);
        }
       
        this.setTarget(Crafty('Planet').x, Crafty('Planet').y);
    }
});

Crafty.c('Meteor_Brown_Big_1', {
    init: function() {
        this.requires('Meteor, spr_meteorBrown_big_1');
        this.color('rgba(0,0,0,0)');
        this.attr({
            explode_spr: 'spr_meteorBrown_tiny_1',
        });
    },
});

Crafty.c('Meteor_Brown_Tiny_1', {
    init: function() {
        this.requires('MoveWithStaticVector, AlphaBlend, spr_meteorBrown_tiny_1');
        this.color('rgba(0,0,0,0)');
    },
});

Crafty.c('Planet', {
    init: function(){
        this.requires('Actor, Collision');
    }
});

Crafty.c('Planet_1', {
    init: function() {
        this.requires('Planet, spr_planet_1');
        this.color('rgba(0,0,0,0)');
    },

});

Crafty.c('Counter', {
    init: function(){
        this.requires('2D, DOM, Text');
        this.attr({
            lives: 0,
            maxlives: 0,
        });
    },

    setLives: function(count){
        this.lives = count;
        this.maxlives = count;
        this.updateText();
    },

    hit: function(){
        this.lives -= 1;
        this.updateText();

        console.log('Hit!: Remaining lives: ' + this.lives);
    },

    updateText: function(){
        var percent = Math.round(this.lives * 100 / this.maxlives);
        this.text('Planet integrity: ' + percent + '%');
    },
});

Crafty.c('WaveManager', {
    init: function(){
        this.requires('2D, DOM, Text');
        this.attr({
            wavecount: 5,
            wavespawns: 10,
            concurrentspawns: 2,
            spawned: 0,
            destroyed: 0,
            currentwave: 0,
            starttime: 0,
        });
        var d = new Date();
        this.starttime = d.getTime();
        this.initValues();
    },

    initValues: function(){
        switch(App._difficulty){
            case 0:
                this.wavespawns = 3 * App._players;
                console.log('Difficulty level set to 1, wavepsawns: ' + this.wavespawns);
                break;
            case 1:
                this.wavespawns = 5 * App._players;
                console.log('Difficulty level set to 2, wavepsawns: ' + this.wavespawns);
                break;
            case 2:
                this.wavespawns = 7 * App._players;
                console.log('Difficulty level set to 3, wavepsawns: ' + this.wavespawns);
                break;
        }

        this.concurrentspawns = App._players;
    },

    start: function(){
        this.spawned = 0;
        this.destroyed = 0;

        console.log('Starting... ');
        console.log('concurrent spawns: ' + this.concurrentspawns);
        console.log('Spawns: ' + this.spawned);

        this.updateText();

        for(i=0;i<this.concurrentspawns;i++)
        {
            this.addSpawn();
        }
    },

    nextWave: function(){
        this.currentwave++;

        this.bind('KeyDown', this.startWave);

        Crafty.e('CenterText').setText('Press a key to start next wave...');        

        console.log('Waiting to start wave...');
    },

    startWave: function(){
        this.unbind('KeyDown', this.startWave);
        Crafty('CenterText').destroy();        
        console.log('Starting wave ' + this.currentwave + '/' + this.wavecount);
        this.start();
    },

    addSpawn: function(){
        var npc = Crafty.e('Meteor_Brown_Big_1');
        npc.autoSpawn();
        npc.setDrunken(true);
        npc.doMove();
        this.spawned++;
    },

    removeSpawn: function(){
        this.destroyed++;

        // if checkGameCondition returns false
        // we must not spawn another meteor.
        if(!this.checkGameCondition())
        {   
            return;
        }

        if(this.spawned < this.wavespawns)
        {
            this.addSpawn();
        }
    },

    // returns false if game or wave ends
    checkGameCondition: function()
    {
        if(Crafty('Counter').lives <= 0 )
        {
            Crafty.scene('Lost');
            return false;
        }

        if(this.destroyed == this.wavespawns)
        {
            if(this.currentwave == this.wavecount)
            {
                d = new Date();
                timediff = d.getTime() - this.starttime;
                Crafty.scene('Win', {timediff: timediff});
                return false;
            }else{
                this.nextWave();
                return false;
            }
        }

        return true;
    },
    
    updateText: function(){
        this.text('Wave ' + Crafty('WaveManager').currentwave + '/' + Crafty('WaveManager').wavecount);
    },
});
