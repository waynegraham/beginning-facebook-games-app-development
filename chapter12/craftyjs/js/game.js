window.onload = (function() {
  var WIDTH = 800, HEIGHT = 640;
  
  Crafty.init(HEIGHT, WIDTH);
  //Crafty.canvas.init();

  Crafty.scene("loading", function () {
    //load takes an array of assets and a callback when complete
    Crafty.load(["sprite.png"], function () {
      Crafty.scene("main"); //when everything is loaded, run the main scene
    });
    //black background with some loading text
    Crafty.background("#000");
    Crafty.e("2D, DOM, Text").attr({ w: 100, h: 20, x: 150, y: 120 })
    .text("Loading")
    .css({ "text-align": "center" });
  });   //automatically play the loading scene


  Crafty.scene("main", function() {
    generateWorld();
  });

  Crafty.scene("loading");
});
