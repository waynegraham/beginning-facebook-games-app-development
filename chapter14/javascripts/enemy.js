var EnemyEntity = me.ObjectEntity.extend({
  init: function(x, y, settings) {
    // define this here instead of tiled
    settings.image = 'wheelie_right';
    settings.spritewidth = 32;

    // call the parent constructor
    this.parent(x, y, settings);

    this.startX = x;
    this.endX = x + settings.width - settings.spritewidth;
    // size of sprite

    // make him start from the right
    this.pos.x = x + settings.width - settings.spritewidth;
    this.walkLeft = true;

    // walking & jumping speed
    this.setVelocity(2, 6);

    // make it collidable
    this.collidable = true;
    // make it a enemy object
    this.type = me.game.ENEMY_OBJECT;

  },

  // call by the engine when colliding with another object
  // obj parameter corresponds to the other object (typically the player) touching this one
  onCollision: function(res, obj) {

    // res.y >0 means touched by something on the bottom
    // which mean at top position for this one
    if (this.alive && (res.y > 0) && obj.falling) {
      this.flicker(45);
    }
  },

  // manage the enemy movement
  update: function() {
    // do nothing if not visible
    if (!this.visible)
      return false;

    if (this.alive) {
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      } else if (!this.walkLeft && this.pos.x >= this.endX) {
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
    } else {
      this.vel.x = 0;
    }

    // check and update movement
    this.updateMovement();

    // update animation if necessary
    if (this.vel.x !== 0 || this.vel.y !== 0) {
      // update objet animation
      this.parent(this);
      return true;
    }
    return false;
  }
});
