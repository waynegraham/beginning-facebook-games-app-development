var canvas;
var context;
var width;
var height;

var xBoard = 0;
var oBoard = 0;
var begin = true;

var score = {
  win: 0,
  lost: 0,
  tie: 0
};

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

//new
function drawO(x, y) {
  context.beginPath();

  context.strokStyle = '#0000ff';
  context.lineWidth = 10;

  var offsetX = (width / 3) * 0.1;
  var offsetY = (height / 3) * 0.1;

  var beginX = x * (width / 3) + offsetX;
  var beginY = y * (height / 3) + offsetY;

  var endX = (x + 1) * (width / 3) - offsetX * 2;
  var endY = (y + 1) * (height / 3) - offsetY * 2;

  context.arc(
    beginX + ((endX - beginX) / 2),
    beginY + ((endY - beginY) / 2),
    (endX - beginX) / 2 ,
    0,
    Math.PI * 2,
    true
  );

  context.stroke();
  context.closePath();

}

function restart() {
  console.log(score);
  context.clearRect (0, 0, width , height);
  xBoard = 0;
  oBoard = 0;
  drawBoard();
}

function checkTie() {
  var tie = false;

  if((xBoard | oBoard) === 0x1FF) {
    alert('We tied...');
    score.tie++;
    restart();
    tie = true;
  }
  return tie;
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

  if(player === 'O') {
    oBoard = oBoard | bit;
    drawO(x, y);
  } else {
    xBoard = xBoard | bit;
    drawX(x, y);
  }
}


function checkWinner(board) {
  var winState = false;

    if (
      ((board | 0x1C0) === board) ||
      ((board | 0x38 ) === board) ||
      ((board | 0x7) === board) ||
      ((board | 0x124) === board) ||
      ((board | 0x92) === board) ||
      ((board | 0x49) === board) ||
      ((board | 0x111) === board) || 
      ((board | 0x54) === board)){
      winState = true;
  }

  return winState;
}

//new
function calculateRatio(oBoard, xBoard, player, bit, ratio) {
  var best;

  if(player === 'O') {
    oBoard = oBoard | bit;
  } else {
    xBoard = xBoard | bit;
  }

  if(checkWinner(oBoard)) {
    ratio *= 1.1;
    best = ratio;
  } else if (checkWinner(xBoard)) {
    ratio *= 0.7;
    best = ratio;
  } else {
    best = 0;
    ratio *= 0.6;

    for(var iter = 0; iter < 9; iter++) {
      if(isEmpty(xBoard, oBoard, 1 << iter)) {
        var newPlayer = player === 'O' ? 'X' : 'O';
        var newRatio = calculateRatio(oBoard, xBoard, newPlayer, 1 << iter, ratio);

        if(best === 0 || best < newRatio) {
          best = newRatio;
        }
      }
    }
  }

  return best;
}


//new
function simulate(oBoard, xBoard) {

  var ratio = 0;

  var bit = 0;
  var checkbit;

  for (var i= 0; i < 9; i++) {

    checkBit = 1 << i;

    if (isEmpty(xBoard, oBoard, checkBit)) {

      if (checkWinner(oBoard | checkBit)) {
        bit = checkBit;
        break;
      } else if (checkWinner(xBoard | checkBit)) {
        bit = checkBit;
      } 
    }
  }

  if (bit === 0) {
    for (var j = 0; j < 9; j++) {
      checkBit = 1 << j;

      if (isEmpty(xBoard, oBoard, checkBit)) {
        var result = calculateRatio(oBoard, xBoard, 'X', 0, 1);
        if (ratio === 0 || ratio < result) {
          ratio = result;
          bit = checkBit;
        }
      }
    }
  }	
  return bit;
}

function play(){
  var bestPlay = simulate(oBoard, xBoard);
  markBit(bestPlay, 'O');
}

function clickHandler(event) {

  var x = Math.floor((event.clientX - canvas.offsetLeft) / (width/ 3));
  var y = Math.floor((event.clientY - canvas.offsetTop) / (height/ 3));

  var bit = (1 << x + (y * 3));

  if (isEmpty(xBoard, oBoard, bit)) {

    markBit(bit, 'X');

    if (!checkTie())  {
      if (checkWinner(xBoard)) {

        alert('You Win!!');

        score.win++;

        restart();

      } else {

        play();
        if (!checkTie()) {

          if (checkWinner(oBoard)) {
            alert('You Lost!!');
            score.lost++;
            restart();
          }
        }
      }
    }
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


