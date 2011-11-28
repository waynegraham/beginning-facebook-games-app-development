function Engine() {
  this.state = 1
  
  
}

//Engine.prototype.

var e = {

  game: {
    state: -1
  },

  overlay: {
    counter: 1,
    title: "Alien Space Turtles",
    subtitle: "Attack!"
  },

  fire: {

  },

  update:  function() {

  },

  updatePlayer: function() {

  },

  updatePlayerBullets: function() {

  },

  updateBackground: function () {

  },

  updateEnemies: function() {

  },

  checkCollisions: function() {

  },

  collided: function (a, b) {
    var collision = false;

    // horizontal
    if(b.x + b.width >= a.x && b.x < a.x + a.width) {
      // vertical
      if(b.y + b.height >= a.y && b.y < a.y + a.height) {
        collision = true;
      }
    }

    // a in b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width) {
      if(b.y <= a.y && b.y + b.height >= a.y + a.height) {
        collision = true;
      }
    }

    // b in a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width) {
      if(a.y <= b.y && a.y + a.height >= b.y + b.height) {
        collision = true;
      }
    }

    return collision;

  },

  addEvent: function(node, name ) {

  },

};
