var height = 400;
var width = 600;
var spriteSize = 64;

Crafty.init(width, height);

Crafty.sprite(spriteSize, 'images/grass_and_water.png', {
    grass1: [0, 0, 1, 1],
    grass2: [1, 0, 1, 1],
    grass3: [2, 0, 1, 1],
    grass4: [3, 0, 1, 1]
  });

iso = Crafty.isometric.size(spriteSize);

for (var y = 0; y < height / spriteSize * 3; y++) {
  for(var x = 0; x < width / spriteSize - 1; x++) {
    var which = Crafty.randRange(1, 4);
    var randomtile = 'grass' + which;

    var tile = Crafty.e('2D, Canvas, ' + randomtile);

    iso.place(x, y, 0, tile);
  }
}
