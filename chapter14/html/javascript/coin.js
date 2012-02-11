var CoinEntity = me.CollectableEntity.extend({

  init: function(x, y, settings) {
    settings.image = 'spinning_coin_gold';
    settings.spritewidth = 16;

    this.parent(x, y, settings);
  },

  // called by the engine when an object is destroyed
  onDestroyEvent: function() {
    // do something when collected
    me.audio.play('coin1');

    me.game.HUD.updateItemValue('score', 250);
  }
});
