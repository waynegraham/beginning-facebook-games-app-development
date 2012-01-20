var image;
var canvas;
var context;

var gameSize;
var gridSize;
var tileSize;

var solved = false;

var boardParts = {};
var emptyLoc = {
  x: 0,
  y: 0
};

var clickLoc = {
  x: 0,
  y: 0
};

function distance(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = gridSize - 1;
    boardParts[fromLoc.x][fromLoc.y].y = gridSize - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < gridSize; ++i) {
    for (var j = 0; j < gridSize; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}


function setBoard() {
  boardParts = new Array(gridSize);

  for (var i = 0; i < gridSize; ++i) {

    boardParts[i] = new Array(gridSize);

    for (var j = 0; j < 1; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (gridSize - 1) - i;
      boardParts[i][j].y = (gridSize - 1) - j;
    }

  }
  emptyLoc.x = boardParts[gridSize - 1][gridSize - 1].x;
  emptyLoc.y = boardParts[gridSize - 1][gridSize - 1].y;

  solved = false;
}

function drawTiles() {
  context.drawImage(image, 0, 0);
}

function setImage(imagePath) {
  image = new Image();
  image.src = imagePath;
  image.addEventListener('load', drawTiles, false);
}

function init(canvasId, imagePath, gridCount) {
  canvas = document.getElementById(canvasId);
  context = canvas.getContext('2d');

  setImage(imagePath);

  gameSize = canvas.width;
  gridSize = gridCount;
  tileSize = gameSize / gridSize;

  setBoard();

}

init('game', 'images/island.jpg', 3);

