var image;
var canvas;
var context;


function drawTiles() {
  context.drawImage(image, 0, 0);
}

function setImage(imagePath) {
  image = new Image();
  image.src = imagePath;
  image.addEventListener('load', drawTiles, false);
}

function init(canvasId, imagePath) {
  canvas = document.getElementById(canvasId);
  context = canvas.getContext('2d');

  setImage(imagePath);
}

init('game', 'images/island.jpg');
