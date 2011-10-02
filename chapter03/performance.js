var fps = 0;
var now;
var lastUpdate = (new Date) * 1 - 1;

var fpsFilter = 50;

function calculateFPS() {
  var thisFrameFPS = 1000 / ((now = new Date) - lastUpdate);
  fps += (thisFrameFPS - fps) / fpsFilter;
  lastUpdate = now;

  setTimeout(calculateFPS, 1);
}

var fpsOut = document.getElementById('fps');


