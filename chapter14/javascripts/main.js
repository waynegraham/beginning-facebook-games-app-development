// game resources
var g_resources = [{
  name: "area01_level_tiles",
  type: "image",
  src: "data/gfxlib-fuzed/Backgrounds/lev01_checkers/area01_tileset/area01_level_tiles.png"
}, {
  name: "area01",
  type: "tmx",
  src: "data/area01.tmx"
}, {
  name: "gripe_run_right",
  type: "image",
  src: "data/gfxlib-fuzed/Sprites/gripe.run_right.png"
}, {
  name: "area01_bkg0",
  type: "image",
  src: "data/gfxlib-fuzed/Backgrounds/lev01_checkers/area01_parallax/area01_bkg0.png"
}, {
  name: "area01_bkg1",
  type: "image",
  src: "data/gfxlib-fuzed/Backgrounds/lev01_checkers/area01_parallax/area01_bkg1.png"
}, {
  name: "spinning_coin_gold",
  type: "image",
  src: "data/gfxlib-fuzed/Sprites/spinning_coin_gold.png"
}, {
  name: "wheelie_right",
  type: "image",
  src: "data/gfxlib-fuzed/sprites/wheelie_right.png"
}, {
  name: '16x16_font',
  type: 'image',
  src: 'data/gfxlib-fuzed/sprites/16x16_font.png'
}, {
  name: 'DST-GameOn',
  type: 'audio',
  src: 'data/audio/',
  channel: 1
}, {
  name: 'Bounce',
  type: 'audio',
  src: 'data/audio/',
  channel: 1
}, {
  name: 'coin1',
  type: 'audio',
  src: 'data/audio/',
  channel: 1
}, {
  name: 'Mario_Jumping',
  type: 'audio',
  src: 'data/audio/',
  channel: 1
}, {
  name: 'title_screen',
  type: 'image',
  src: 'data/gfxlib-fuzed/GUI/title_screen.jpg'
}
];

var jsApp = {

  onload: function() {

    // init the video
    if (!me.video.init('jsapp', 640, 480, false, 1.0)) {
      alert('Sorry but your browser does not support html 5 canvas.');
      return;
    }

    // initialize the "audio"
    me.audio.init('mp3,ogg');

    // set all resources to be loaded
    me.loader.onload = this.loaded.bind(this);

    // set all resources to be loaded
    me.loader.preload(g_resources);

    // load everything & display a loading screen
    me.state.change(me.state.LOADING);
  },

  // callback when everything is loaded

  loaded: function() {
    me.state.set(me.state.MENU, new TitleScreen());

    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.PLAY, new PlayScreen());

    // add the player to the entity pool
    me.entityPool.add('mainPlayer', PlayerEntity);
    me.entityPool.add('CoinEntity', CoinEntity);
    me.entityPool.add('EnemyEntity', EnemyEntity);


    // bind to the keyboard
    me.input.bindKey(me.input.KEY.LEFT, 'left');
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindKey(me.input.KEY.X, 'jump', true);

    // debugging
    //me.debug.renderHitBox = true;

    // start the game
    me.state.change(me.state.MENU);
  }

};// jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

  onResetEvent: function() {
    // stuff to reset on state change
    me.levelDirector.loadLevel('area01');

    me.game.addHUD(0, 430, 640, 60);
    me.game.HUD.addItem("score", new ScoreObject(620, 10));

    me.game.sort();

    me.audio.playTrack('DST-GameOn');
  },

  // action to perform when game is finished (state change)
  onDestroyEvent: function() {
    me.game.disableHUD();

    // stop the music
    me.audio.stopTrack();
  }

});

window.onReady(function() {
  jsApp.onload();
});
