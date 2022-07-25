// FUNCTIONS

// Draw Start Screen
function drawStart() {
    drawMain();
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
  
    ctx.font = "25px Consolas";
    ctx.fillText("Swipe Balls Before They Fall", 100, 450);
    ctx.fillText("Watch Out For Red Balls", 415, 480);
  }
  
  // Draw Game Elements
  function runGame() {
    ctx.clearRect(0,0,cnv.width,cnv.height)
    //LOGIC

      for (let i = 0; i < bubbles.length; i++){
          moveBubble(bubbles[i]);
          drawBubble(bubbles[i]);
          bubbleClicked(bubbles[i]);
          if (bubbles[i].y + bubbles[i].r  >= cnv.height - 50){
              bubbles[i].y = cnv.height -bubbles[i].r - 50
              bubbles[i].speed = bubbles[i].speed * -0.98
          }
          if (bubbles[i].y < -200){
              bubbles[i].y = -199
              bubbles[i].speed = bubbles[i].speed * -1
          }
          if (bubbles[i].x - bubbles[i].r < 0){
              bubbles[i].x = bubbles[i].r
              bubbles[i].speedX = bubbles[i].speedX * -1
          } else if(bubbles[i].x + bubbles[i].r > cnv.width){
              bubbles[i].x = cnv.width -bubbles[i].r
              bubbles[i].speedX = bubbles[i].speedX * - 1
          }
      }
    //DRAW
    drawGame();
    checkCrash();
  }

//game over code
function checkCrash(){
    //hit top or bottom
    //if (heli.y < 50){
    //    GameOver();

}

    // hit walls
//}
/////////Game over code
function GameOver(){
    state = "gameover"
    setTimeout(reset, 2000);
}


  function drawGame() {
    drawMain();
    // Draw Walls
  }
  
  // Draw Game Over Screen
  function drawGameOver() {
    drawMain();
  
    // Draw Walls
  
    // Circle around Helicopter
   // ctx.strokeStyle = "red";
   // ctx.lineWidth = 5;
   // ctx.beginPath();
    //ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
   // ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);

}
 //HELPER FUNCTIONS
 function reset(){
     ctx.clearRect(0,0,cnv.width,cnv.height)
     state = "start";
     bubbles = []
     for (let n = 1; n < 15; n++){
         bubbles.push(newRandomBubble());
     }
     score = 0
 }
//////////////////////////////////////////////////helper functions
function drawMain(){
    // Background
    // Green Bars
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
  
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("FRUITY NINJAS", 25, 35);
    ctx.fillText("SCORE: " + String(score), 25, cnv.height - 15);
    ctx.fillText("BEST: " + String(best), cnv.width - 250, cnv.height - 15);
}


///FUNCtions FROM THE BUBBLE CODE
function fill(color){
    ctx.fillStyle = color;
}
function stroke(color){
    ctx.strokeStyle = color;
}
function circle(x,y,r,mode){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (mode == "fill"){
        ctx.fill();
    }
    else if (mode == "stroke"){
        ctx.stroke();
    }
}
function dist(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
function drawBubble(aBubble){
    stroke(aBubble.color);
    circle(aBubble.x,aBubble.y,aBubble.r,"stroke");
}
function moveBubble(aBubble){
    aBubble.speed += aBubble.accel;
    if(aBubble.speed < -7){
        aBubble.speed = -7
    }
    aBubble.y += aBubble.speed;
    aBubble.x += aBubble.speedX;
}
function randomRGB() {
    let r = randomInt(0,256);
    let g = randomInt(0, 256);
    let b = randomInt(0, 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function randomInt(low,high){
    return Math.floor(Math.random() * (high -low) + low);
}
function newRandomBubble(){
    return{
        x: randomInt(0, cnv.width),
        y:randomInt(0, cnv.height * 3/4),
        r:randomInt(22,50),
        color: randomRGB(),
        speed: 0,
        accel: 0.05,
        speedX: randomInt(-1, 2)
    };
}
document.addEventListener("mousemove", mousemoveHandler);
function mousemoveHandler(event){
    mouseX = event.clientX - cnv.offsetLeft;
    mouseY = event.clientY -cnv.offsetTop;
}
function bubbleClicked(aBubble) {
    if (dist(mouseX, mouseY, aBubble.x, aBubble.y) < aBubble.r && mouseIsPressed) {
        aBubble.speed += -1
        aBubble.y += aBubble.speed
        aBubble.speedX = randomInt(-1,2)
    }
}
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
    mouseIsPressed = true;
    if (state == "start") {
        state = "gameon"
    }
}
function mouseupHandler() {
    mouseIsPressed = false;
}
