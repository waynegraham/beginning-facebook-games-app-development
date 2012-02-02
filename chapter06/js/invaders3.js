"use strict";

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var spaceship = {
  x: 100,
  y: 300,
  width: 50,
  height: 50,
  counter: 0
};

var game = {
  state: "start"
};

var keyboard = {};

var lasers = [];
var invaders = [];
var invaderMissiles = [];

var spaceship_image;
var invader_image;
var missle_image;
var laser_image;

var laser_sound;
var missle_sound;
var explosion_sound;
var invader_explosion_sound;
var play_again_sound;

var textOverlay = {
  counter: -1,
  title: "",
  subtitle: ""
};

function updateGameState() {
  if(game.state === "playing" && invaders.length === 0) {
    game.state = "won";
    textOverlay.title = "Turtles Defeated";
    textOverlay.subtitle = "press space bar to play again";
    textOverlay.counter = 0;

    play_again_sound.play();

  }

  if(game.state === "over" && keyboard[32]) {
    game.state = "start";
    spaceship.state = "alive";
    textOverlay.counter = -1;

    play_again_sound.pause();
    play_again_sound.currentTime = 0;

  }

  if(game.state === "won" && keyboard[32]) {
    game.state = "start";
    spaceship.state = "alive";
    textOverlay.counter = -1;

    play_again_sound.pause();
    play_again_sound.currentTime = 0;
  }

  if(textOverlay.counter >= 0 ) {
    textOverlay.counter++;
  }
}

function updateBackground() {
  // do nothing
}

function addInvaderMissle(invader){

  missle_sound.play();

  return {
    x: invader.x,
    y: invader.y,
    width: 10,
    height: 33,
    counter: 0
  };
}

function drawInvaderMissiles() {
  for(var iter in invaderMissiles) {
    var missle = invaderMissiles[iter];

    context.drawImage(
      missle_image,
      missle.x, missle.y, missle.width, missle.height
    );
  }
}

function updateInvaderMissiles() {
  for(var iter in invaderMissiles) {
    var laser = invaderMissiles[iter];
    laser.y += 1;
    laser.counter++;
  }
}

function updateInvaders() {
  // populate invaders array
  if(game.state === "start") {

    invaders = []; // be sure to reset the invaders array when starting a new game

    for(var iter = 0; iter < 10; iter++) {
      invaders.push({
        x: 10 + iter * 50,
        y: 10,
        height: 40,
        width: 40,
        phase: Math.floor(Math.random() * 50),
        counter: 0,
        state: "alive"
      });
    }
    game.state = "playing";
  }

  // invaders float back and forth
  for(var iter2 in invaders) {
    var invader = invaders[iter2];

    if(!invader) {
      continue;
    }

    if(invader && invader.state === "alive") {
      invader.counter++;
      invader.x += Math.sin(invader.counter * Math.PI * 2 / 100) * 3;

      // fire every
      if((invader.counter + invader.phase) % 200 === 0) {
        invaderMissiles.push(addInvaderMissle(invader));
      }
    }

    if(invader && invader.state === "hit") {
      invader.counter++;

      // change state to dead to be cleaned up
      if(invader.counter >= 20) {
        invader.state = "dead";
        invader.counter = 0;
      }
    }

  }

  invaders = invaders.filter(function(event) {
    if (event && event.state !== 'dead') { return true; }
    return false;
  });

}

function drawInvaders() { 
  for(var iter in invaders) {
    var invader = invaders[iter];

    if(invader.state === "alive") {

      context.drawImage(
        invader_image, 
        invader.x, invader.y, invader.width, invader.height
      );
    }

    if(invader.state === "hit") {
      //invader_explosion_sound.play();
    }

    if(invader.state === "dead") {
      context.fillStyle = "black";
      context.fillRect(invader.x, invader.y, invader.width, invader.height);
    }

  }
}

function drawBackground() {
  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function updateLasers() {
  // move the laser
  for(var iter in lasers) {
    var laser = lasers[iter];
    laser.y -= 2;
    laser.counter++;
  }

  // remove lasers that are off the screen
  lasers = lasers.filter(function(laser) {
    return laser.y >= 0;
  });

}

function fireLaser() {

  laser_sound.play();

  lasers.push ({
    x: spaceship.x + 20, //offset 
    y: spaceship.y - 10,
    width: 5,
    height: 30,
    counter: 0
  });
}

function updateSpaceship() {
  if (spaceship.state === 'dead') {
    return;
  }

  // move left
  if(keyboard[37]) {
    spaceship.x -= 10;
    if(spaceship.x < 0) { 
      spaceship.x = 0;
    }
  }

  // move right 
  if(keyboard[39]) {
    spaceship.x += 10;
    var right = canvas.width - spaceship.width;
    if(spaceship.x > right) {
      spaceship.x = right;
    }
  }

  if(keyboard[32]) {
    // only fire one laser
    if(!keyboard.fired) {
      fireLaser();
      keyboard.fired = true;
    } else {
      keyboard.fired = false;
    }
  }

  if(spaceship.state === "hit") {
    spaceship.counter++;
    if(spaceship.counter >= 40) {
      spaceship.counter = 0;
      spaceship.state = "dead";
      game.state = "over";
      textOverlay.title = "Game Over";
      textOverlay.subtitle = "press space to play again";
      textOverlay.counter = 0;
      play_again_sound.play();

    }
  }
}

function drawSpaceship() {
  if(spaceship.state === "dead") {
    return;
  }

  if(spaceship.state === "hit") {
    explosion_sound.play();
    context.fillStyle = "black";
    context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
    return;
  }

  context.drawImage(
    spaceship_image,
    0, 0, 50, 50,
    spaceship.x, spaceship.y, spaceship.width, spaceship.height
  );
}

function drawLasers() {
  context.fillStyle = "white";

  for(var iter in lasers) {
    var laser = lasers[iter];
    var count = Math.floor(laser.counter / 4);
    var xoffset = (count % 4) * 24;

    context.drawImage(
      laser_image,
      //24 + 10, 9, 8, 8,
      laser.x, laser.y, laser.width, laser.height
    );

    //context.fillRect(laser.x, laser.y, laser.width, laser.height);
  }
}

function hit(a, b) {
  var ahit = false;
  // horizontal collisions
  if(b.x + b.width >= a.x && b.x < a.x + a.width) {
    // vertical collision
    if(b.y + b.height >= a.y && b.y < a.y + a.height) {
      ahit = true;
    }
  }

  // a in b
  if(b.x <= a.x && b.x + b.width >= a.x + a.width) {
    if(b.y <= a.y && b.y + b.height >= a.y + a.height) {
      ahit = true;
    }
  }

  // b in a
  if(a.x <= b.x && a.x + a.width >- b.x + b.width) {
    if(a.y <= b.y && a.y + a.height >= b.y + b.height) {
      ahit = true;
    }
  }

  return ahit;
}

function checkHits() {
  for(var iter in lasers) {
    var laser = lasers[iter];
    for(var inv in invaders) {
      var invader = invaders[inv];

      if(hit(laser, invader)) {
        laser.state = "hit";
        invader.state = "hit";
        invader.counter = 0;
        invader_explosion_sound.play();
      }
    }
  }

  // check for enemy hits on the spaceship
  if(spaceship.state === "hit" || spaceship.state === "dead") {
    return;
  }

  for(var iter2 in invaderMissiles) {
    var missle = invaderMissiles[iter2];
    if(hit(missle, spaceship)) {
      missle.state = "hit";
      spaceship.state = "hit";
      spaceship.counter = 0;
    }
  }
}

function addEvent(node, name, func) {
  if(node.addEventListener) {
    node.addEventListener(name, func, false);
  } else if(node.attachEvent) {
    // handle Microsoft browsers too
    node.attachEvent(name, func);
  }
}

function addKeyboardEvents() {
  addEvent(document, "keydown", function(e) {
    keyboard[e.keyCode] = true;
  });

  addEvent(document, "keyup", function(e) {
    keyboard[e.keyCode] = false;
  });

}

function drawTextOverlay() {
  if(textOverlay.counter === -1) {
    return;
  }

  var alpha = textOverlay.counter / 50.0;

  if(alpha > 1 ) {
    alpha = 1;
  }

  context.globalAlpha = alpha;
  context.save();

  if(game.state === "over") {
    context.fillStyle = "white";
    context.font = "Bold 40pt Arial";
    context.fillText(textOverlay.title, 140, 200);
    context.font = "14pt Helvectica";
    context.fillText(textOverlay.subtitle, 190, 250);
  }

  if(game.state === "won") {
    context.fillStyle = "white";
    context.font = "Bold 40pt Arial";
    context.fillText(textOverlay.title, 100, 200);
    context.font = "14pt Helvectica";
    context.fillText(textOverlay.subtitle, 190, 250);
  }

  context.restore();

}

function gameLoop() {

  updateGameState();
  updateBackground();
  updateInvaders();
  updateSpaceship();

  updateLasers();
  updateInvaderMissiles();

  checkHits();

  drawBackground();
  drawSpaceship();
  drawInvaders();

  drawInvaderMissiles();
  drawLasers();
  drawTextOverlay();
}

function playSound(file) {
  var sound = document.createElement("audio");
  sound.setAttribute("src", "sounds/" + file + ".wav");
  sound.play();
}

function loadResources() {
  spaceship_image = new Image();
  spaceship_image.src = 'images/spaceship.png';

  missle_image = new Image();
  missle_image.src = 'images/torpedo.png';

  invader_image = new Image();
  invader_image.src = 'images/invader.png';
  
  laser_image = new Image();
  laser_image.src = 'images/laser.png';

  missle_sound = document.createElement("audio");
  document.body.appendChild(missle_sound);
  missle_sound.setAttribute("src", "sounds/rocket.wav");

  laser_sound = document.createElement("audio");
  document.body.appendChild(laser_sound);
  laser_sound.setAttribute("src", "sounds/laser.wav");

  explosion_sound = document.createElement("audio");
  document.body.appendChild(explosion_sound);
  explosion_sound.setAttribute("src", "sounds/explosion.wav");

  invader_explosion_sound = document.createElement("audio");
  document.body.appendChild(invader_explosion_sound);
  invader_explosion_sound.setAttribute("src", "sounds/invader_explosion.wav");

  play_again_sound = document.createElement("audio");
  document.body.appendChild(play_again_sound);
  play_again_sound.setAttribute("src", "sounds/darkfactory.ogg");

}


addKeyboardEvents();
loadResources();
setInterval(gameLoop, 1000 / 60);


