Crafty.init(400, 300);

var assets = [
  '../images/sara_from_opengameart.png',
  '../sounds/DST-Alters.mp3'
];

Crafty.scene("loading", function() {
  Crafty.load(assets, function() {
      Crafty.scene("main");
    }, function (event) {
      console.log(event);
    }  
  );

  Crafty.background("#000");
  Crafty.e("2D, DOM, Text").attr({w: 100, h: 20, x: 150, y: 120})
    .text("Loading...").css( {"text-align": "center", "color": "#fff"});
});

Crafty.scene("loading");

Crafty.scene("main", function() {
  Crafty.audio.add("background", assets[1]);
  Crafty.audio.play('background');

  Crafty.e("2D, Canvas, Audio");
});

//var sara = Crafty.e("2D, Canvas, SpriteAnimation, sara, animation")
 //       .attr({x: 0, y: 0, w: 128, h: 128}) // Set the position
 //       .animate("anim", 5, 0, 11);

//console.log(Crafty.debug());

