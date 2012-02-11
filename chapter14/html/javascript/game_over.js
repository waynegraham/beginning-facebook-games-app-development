/*
 * Game over screen
*/
GameOverScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);

    this.font = null;
    this.background = null;
    this.saveScore = false;
  },

  onResetEvent: function(levelId) {

    this.saveScore = false;

    if (this.background === null) {
      this.background = me.loader.getImage('game_over');

      // font to use
      this.font = new me.BitmapFont('16x16_font', 16);
      this.font.set('left');

      me.state.transition('fade', '#ffffff', 250);

    }

    // enable keyboard
    me.input.bindKey(me.input.KEY.ENTER, 'enter', true);

  },

  update: function() {
    if (!this.saveScore) {
      try {
        // post to Facebook
        $.ajax({
          type: 'POST',
          data: me.gamestat.getItemValue('highscore'),
          url: 'score.php'
        });
        console.log('post to facebook');
        console.log(me.gamestat.getItemValue('highscore'));
      } catch (error) {}

      this.saveScore = true;

    }

    if (me.input.isKeyPressed('enter')) {
      me.state.change(me.state.PLAY);
      console.log('enter pressed');
    }

    return true;
  },

  draw: function(context) {
    context.drawImage(this.background, 0, 0);

    this.font.draw(context, 'GAME OVER!', 260, 240);
    this.font.draw(context, 'PRESS ENTER TO PLAY AGAIN', 140, 292);

  },

  onDestroyEvent: function() {
    me.game.disableHUD();

    me.input.unbindKey(me.input.KEY.ENTER);
  }

});

