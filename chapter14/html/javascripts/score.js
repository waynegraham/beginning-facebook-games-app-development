var ScoreObject = me.HUD_Item.extend({
  init: function(x, y) {

    this.parent(x, y);
    // create a font
    this.font = new me.BitmapFont('16x16_font', 16);
  },

  update: function(value) {
    this.parent(value);

    if (this.value > me.gamestat.getItemValue('highscore')) {
      me.gamestat.setValue('highscore', this.value);
    }

    return true;
  },


  draw: function(context, x, y) {
    this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
  }

});

var HighScoreObject = me.HUD_Item.extend({

  init: function(x, y, val) {
    this.parent(x, y, val);
    this.font = new me.BitmapFont('16x16_font', 16);
    this.font.set('left');
  },

  draw: function(context, x, y) {
    this.font.draw(context, 'HIGH SCORE', this.pos.x + x, this.pos.y + y);
    this.font.draw(context,
                   me.gamestat.getItemValue('highscore'),
                   this.pos.x + x,
                   this.pos.y + y + 16
                  );

  }
});
