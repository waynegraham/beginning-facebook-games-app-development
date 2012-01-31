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
}
];

var jsApp = {

  onload: function() {

    // init the video
    if (!me.video.init('jsapp', 640, 480, false, 1.0)) {
      alert("Sorry but your browser does not support html 5 canvas.");
      return;
    }

    // initialize the "audio"
    me.audio.init("mp3,ogg");

    // set all resources to be loaded
    me.loader.onload = this.loaded.bind(this);

    // set all resources to be loaded
    me.loader.preload(g_resources);

    // load everything & display a loading screen
    me.state.change(me.state.LOADING);
  },

  // callback when everything is loaded

  loaded: function() {
    // set the "Play/Ingame" Screen Object
    me.state.set(me.state.PLAY, new PlayScreen());

    // add the player to the entity pool
    me.entityPool.add('mainPlayer', PlayerEntity);

    // bind to the keyboard
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.X, "jump", true);

    // debugging
    me.debug.renderHitBox = true;

    // start the game
    me.state.change(me.state.PLAY);
  }

};// jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

  onResetEvent: function() {
    // stuff to reset on state change
    me.levelDirector.loadLevel("area01");
  },

  // action to perform when game is finished (state change)
  onDestroyEvent: function() {
  }

});

window.onReady(function() {
  jsApp.onload();
});
