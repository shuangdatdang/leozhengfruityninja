// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;


// Global Variables (once)
let mouseIsPressed = false;
let best = 0
let score;
//global variables that need reset
 let state;
  let mouseX;
  let mouseY;
  let bubbles;
 reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start"){
    drawStart();
  } else if ( state === "gameon"){
    runGame();
    score += 1
  } else if (state === "gameover") {
    drawGameOver();
  }
  if (score > best){
    best = score
  }
  // Request Animation Frame
  requestAnimationFrame(draw);
}
