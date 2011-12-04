var canvas;
var context;
var width;
var height;

var xBoard = 0;
var oBoard = 0;
var begin = true;

function drawBoard() {

  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 4;

  var vLine1 = Math.round(width / 3);
  var vLine2 = Math.round(vLine1 * 2);

  var hLine1 = Math.round(height / 3);
  var hLine2 = Math.round(hLine1 * 2);

  context.moveTo(vLine1, 0);
  context.lineTo(vLine1, height);

  context.moveTo(vLine2, 0);
  context.lineTo(vLine2, height);

  context.moveTo(0, hLine1);
  context.lineTo(width, hLine1);

  context.moveTo(0, hLine2);
  context.lineTo(width, hLine2);

  context.stroke();
  context.closePath();

}

function isEmpty(xBoard, oBoard, bit) {
  return (((xBoard & bit) === 0) && ((oBoard & bit) === 0));
}

function drawX(x, y) {
  context.beginPath();

  context.strokeStyle = '#ff0000';
  context.lineWidth = 4;

  var offsetX = (width / 3) * 0.1;
  var offsetY = (height / 3) * 0.1;

  var beginX = x * (width / 3) + offsetX;
  var beginY = y * (height / 3) + offsetY;

  var endX = (x + 1) * (width / 3) - offsetX;
  var endY = (y + 1) * (height / 3) - offsetY;

  context.moveTo(beginX, beginY);
  context.lineTo(endX, endY); 

  context.moveTo(beginX, endY);
  context.lineTo(endX, beginY);

  context.stroke();
  context.closePath();
}

function markBit(bitMask, player) {
  var bit = 1;
  var x = 0;
  var y = 0;

  while((bitMask & bit) === 0) {
    bit = bit << 1;
    x++;
    if(x > 2) {
      x = 0;
      y++;
    }
  }

  xBoard = xBoard | bit;
  drawX(x,y);
}

function clickHandler(event) {

  var x = Math.floor((event.clientX - canvas.offsetLeft) / (width/ 3));
  var y = Math.floor((event.clientY - canvas.offsetTop) / (height/ 3));

  var bit = (1 << x + (y * 3));

  if (isEmpty(xBoard, oBoard, bit)) {

    markBit(bit, 'X');

  } else {
    alert ('That grid is already taken');
  }
}

function init(canvasID) {

  canvas = document.getElementById(canvasID);
  context = canvas.getContext('2d');

  width = canvas.width;
  height = canvas.height;


  canvas.addEventListener('click', clickHandler); 

  drawBoard();
}




