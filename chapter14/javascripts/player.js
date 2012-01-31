// player entity
var PlayerEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    // call ObjectEntity constructor
    this.parent(x, y, settings);

    // set walking and jumping speed
    this.setVelocity(3, 15);

    // update the hitbox
    this.updateColRect(4, 20, -1, 0);

    // set display to follow player's position on x and y axis
    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
  },

  // update player position
  update: function() {
    if (me.input.isKeyPressed('left')) {
      this.doWalk(true);
    } else if (me.input.isKeyPressed('right')) {
      this.doWalk(false);
    } else {
      this.vel.x = 0;
    }

    if (me.input.isKeyPressed('jump')) {
      if (this.doJump()) {
        me.audio.play('Mario_Jumping');
      }
    }

    // check and update player movement
    this.updateMovement();

    // check for a collision
    var res = me.game.collide(this);

    if (res) {
      // collide with an enemy
      if (res.obj.type == me.game.ENEMY_OBJECT) {
        // check if enemy was jumped on
        if ((res.y > 0) && ! this.jumping) {
          // bounce
          me.audio.play('Bounce');
          this.forceJump();
        } else {
          // flicker when touched
          this.flicker(45);
        }
      }
    }

    // update animation if necessary
    if (this.vel.x !== 0 || this.vel.y !== 0) {
      // update object animation
      this.parent(this);
      return true;
    }

    return false;

  }
});
