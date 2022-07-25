// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;


// Global Variables (once)
let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";
let slice = document.createElement("audio");
slice.src = "sound/slice.wav";
let fruitImg = document.createElement("img")
fruitImg.src = "img/fruitninja.png"


let mouseIsPressed = false;
let best = 0
let score;
//global variables that need reset
 let state;
  let mouseX;
  let mouseY;
  let bubbles;
  let redBubbles;
  let t;
  let t2;
  let t3;
  let t4;
 reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start"){
    drawStart();
  } else if ( state === "gameon"){
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }
  if (score > best){
    best = score
  }
  // Request Animation Frame
  requestAnimationFrame(draw);
}
