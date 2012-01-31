var ScoreObject = me.HUD_Item.extend({
  init: function(x, y) {

    this.parent(x, y);
    // create a font
    this.font = new me.BitmapFont('16x16_font', 16);
  },


  draw: function(context, x, y) {
    this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
  }

});
