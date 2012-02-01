var TitleScreen = me.ScreenObject.extend({

  init: function() {
    this.parent(true);

        // title screen image
        this.title = null;

        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;

        this.scroller = 'AN EXAMPLE FACEBOOK GAME USING THE MELONJS GAME ENGINE      ';
        this.scrollerpos = 600;
  },

  onResetEvent: function() {
    if (this.title === null) {
      this.title = me.loader.getImage('title_screen');

      // font to use
      this.font = new me.BitmapFont('16x16_font', 16);
      this.font.set('left');

      // set the scroller
      this.scrollerfont = new me.BitmapFont('16x16_font', 16);
      this.scrollerfont.set('left');
    }

    // reset default value
    this.scrollerpos = 640;

    // tween to animate the arror
    this.scrollertween = new me.Tween(this).to({
      scrollerpos: -2200
    }, 10000).onComplete(this.scrollover.bind(this)).start();

    // enable keyboard
    me.input.bindKey(me.input.KEY.ENTER, 'enter', true);

    // play something
    me.audio.play('coin1');
  },

  scrollover: function() {
    // reset to default value
    this.scrollerpos = 640;
    this.scrollertween.to({
      scrollerpos: -2200
    }, 10000).onComplete(this.scrollover.bind(this)).start();
  },

  update: function() {
    if (me.input.isKeyPressed('enter')) {
      me.state.change(me.state.PLAY);
    }
    return true;
  },

  draw: function(context) {
    context.drawImage(this.title, 0, 0);

    this.font.draw(context, 'PRESS ENTER TO PLAY', 180, 240);
    this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
  },

  onDestroyEvent: function() {
    me.input.unbindKey(me.input.KEY.ENTER);
    me.audio.play('coin1');

    // just in case
    this.scrollertween.stop();
  }
});
