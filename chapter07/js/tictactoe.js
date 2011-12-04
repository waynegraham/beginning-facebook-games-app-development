var canvas;
var context;
var width, height;
var begin = true;
var xBoard, oBoard;

var game = {
  state: 'start'
};


function checkForWin() {

}

function restart() {
  context.clearRect(0, 0, width, height);
  xBoard = 0;
  oBoard = 0;
}

function markTile(markTile, player) {
  var tile = 1;
  var x = 0;
  var y = 0;

  
  while((markTile & tile) === 0 ) {
    tile = tile << 1;
    x++;
    if(x > 2) {
      x = 0;
      y++;
    }
  }

  if(player === 'X') {
    
    xBoard = xBoard | tile;
    drawX(x, y);
    console.log(xBoard);

  }

}

function drawX(x, y) {
  //console.log("drawX: " + x + ", " + y);
  context.beginPath();

   context.strokeStyle = '#ff0000'; 
   context.lineWidth   = 4;

   var offsetX = (width / 3) * 0.1;
   var offsetY = (height / 3) * 0.1;

   var beginX = x * (width / 3) + offsetX;
   var beginY = y * (height / 3) + offsetY;

   var endX = (x + 1) * (width / 3) - offsetX * 2;
   var endY = (y + 1) * (height / 3) - offsetY * 2;

   context.moveTo(beginX, beginY);
   context.lineTo(endX, endY); 

   context.moveTo(beginX, endY);
   context.lineTo(endX, beginY); 	

   context.stroke();
   context.closePath(); 

}

function drawO() {

}

function isEmpty(xBoard, oBoard, bit) {
  return (((xBoard & bit) === 0) && ((oBoard & bit) === 0));
}

function drawBoard(width, height) {
  var vseg1 = Math.round(width / 3);
  var vseg2 = vseg1 * 2;

  var hseg1 = Math.round(height / 3);
  var hseg2 = hseg1 * 2;

  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 4;

  // vertical lines
  context.moveTo(vseg1, 0);
  context.lineTo(vseg1, height);

  context.moveTo(vseg2, 0);
  context.lineTo(vseg2, height);

  // horizontal lines
  context.moveTo(0, hseg1);
  context.lineTo(width, hseg1);

  context.moveTo(0, hseg2);
  context.lineTo(width, hseg2);

  //draw
  context.stroke();
  context.closePath();

  if(game.state === 'start') {
    var seed = Math.abs(Math.floor(Math.random() * 9 - 0.1));
    markTile(1 << seed, 'O');
    game.state = "playing";
    //console.log(seed);
  } else {
    game.state = "start";
  }

}

function eventHandler(event) {
  var x = Math.floor(event.clientX / (width / 3));
  var y = Math.floor(event.clientY / (height / 3));

  var bit = (1 << x + ( y * 3 ));

  //console.log(x + ', ' + y + ': ' + bit);

  if(isEmpty(xBoard, oBoard, bit)) {
    markTile(bit, 'X');
    
    console.log(bit);
    
  }

}

function init(canvasID) {
  canvas = document.getElementById(canvasID);
  context = canvas.getContext('2d');

  width = canvas.width;
  height = canvas.height;

  canvas.addEventListener('click', eventHandler, false);


  drawBoard(width, height);

}


init('game');


