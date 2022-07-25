// FUNCTIONS

// Draw Start Screen
function drawStart() {
    drawMain();
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
    ctx.drawImage(fruitImg, 50, 150);
    ctx.font = "25px Consolas";
    ctx.fillText("Swipe Balls Before They Fall", 100, 450);
    ctx.fillText("Watch Out For Red Balls", 415, 480);
  }
  
  // Draw Game Elements
  function runGame() {
    ctx.clearRect(0,0,cnv.width,cnv.height)
    //LOGIC
      t += 1
      t2 += 1
      t3 += 1
      t4 += 1
      for (let i = 0; i < redBubbles.length; i++){
          moveBubble(redBubbles[i]);
          drawBubble(redBubbles[i]);
          ifStatements(redBubbles[i])

      }
      for (let i = 0; i < bubbles.length; i++){
          moveBubble(bubbles[i]);
          drawBubble(bubbles[i]);
          ifStatements(bubbles[i]);
          if (dist(mouseX, mouseY, bubbles[i].x, bubbles[i].y) < bubbles[i].r && mouseIsPressed) {
              bubbles.splice([i],1)
              score += 100
              slice.currentTime = 3;
              slice.play();
          }
      }
    //DRAW
      if (t === 600 && t2 < 1500 && t3 < 3000){
          let l = randomInt(0,5);
          if (l === 0){
              bubbles.push(newRandomBubble());
          }
          else if (l === 1){
              bubbles.push(newRandomBubble());
          }
          else if (l === 2){
              bubbles.push(newRandomBubble());
          }
          else if (l === 3){
              bubbles.push(newRandomBubble());
          }
          else if (l === 4){
              redBubbles.push(newRandomRed())
          }
          t = 0;
      }
      if (t2 === 1500 && t3 < 3000 && t4 <6000){
          let k = randomInt(0,5);
          if (k === 0){
              bubbles.push(newRandomBubble());
          }
          else if (k === 1){
              bubbles.push(newRandomBubble());
          }
          else if (k === 2){
              redBubbles.push(newRandomRed())
          }
          else if (k === 3){
              bubbles.push(newRandomBubble());
              redBubbles.push(newRandomRed())

          }
          else if (k === 4){
              bubbles.push(newRandomBubble());
          }
          t2 += -350;
      }
      if (t3 === 3000 && t4 < 6000){
          let f = randomInt(0,5);
          if (f === 0){
              bubbles.push(newRandomBubble());
          }
          else if (f === 1){
              bubbles.push(newRandomBubble());
          }
          else if (f === 2){
              redBubbles.push(newRandomRed())
          }
          else if (f === 3){
              bubbles.push(newRandomBubble());
              redBubbles.push(newRandomRed())

          }
          else if (f === 4){
              bubbles.push(newRandomBubble());
          }
          t3 += -400;
      }
      if (t4 === 6000){
          let q = randomInt(0,6);
          if (q === 0){
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
          }
          else if (q === 1){
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
          }
          else if (q === 2){
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
          }
          else if (q === 3){
              bubbles.push(newRandomBubble());
              redBubbles.push(newRandomRed())

          }
          else if (q === 4){
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
          }
          else if (q === 5){
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
              bubbles.push(newRandomBubble());
          }
          t4 += -350;
      }
    drawGame();
    checkCrash();
  }
  function ifStatements(aBubble){
      if (aBubble.y < -200){
          aBubble.y = -199
          aBubble.speed = aBubble.speed * -1
      }
          if (aBubble.x - aBubble.r < 0) {
              aBubble.x = aBubble.r
              aBubble.speedX = aBubble.speedX * -1
          } else if (aBubble.x + aBubble.r > cnv.width) {
              aBubble.x = cnv.width - aBubble.r
              aBubble.speedX = aBubble.speedX * -1
          }
  }
//game over code
function checkCrash(){
    //hit top or bottom
    for(let i = 0; i < bubbles.length; i ++) {
        if (bubbles[i].y > cnv.height + bubbles[i].r +50 && bubbles[i].speed > 0) {
            GameOver();
        }else if (bubbles[i].x + bubbles[i].r < 0) {
            GameOver();
        } else if (bubbles[i].x - bubbles[i].r > cnv.width) {
            GameOver()
        }
    }
    for(let i = 0; i < redBubbles.length; i ++) {
        if (dist(mouseX, mouseY, redBubbles[i].x, redBubbles[i].y) < redBubbles[i].r && mouseIsPressed) {
            GameOver();
            explosion.play();
            //explosion sound
        }
    }
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
     bubbles.push(newRandomBubble());
     redBubbles = []
     score = 0
     t = 0
     t2 = 0
     t3 = 0
     t4 = 0
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
    fill(aBubble.color);
    circle(aBubble.x,aBubble.y,aBubble.r,"fill");
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
    let r = randomInt(0,50);
    let g = randomInt(50, 256);
    let b = randomInt(50, 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function randomInt(low,high){
    return Math.floor(Math.random() * (high -low) + low);
}
let m = 0
function newRandomBubble(){
    return{
        x: randomInt(0, cnv.width),
        y:randomInt(cnv.height + 50, cnv.height + 200 ),
        r:randomInt(40,50),
        color: randomRGB(),
        speed: -3.75,
        accel: 0.015,
        speedX: randomInt(-1,2)
    };
}
function newRandomRed(){
    return{
        x: randomInt(0, cnv.width),
        y:randomInt(cnv.height + 50, cnv.height + 200 ),
        r:randomInt(30,40),
        color: "red",
        speed: -5,
        accel: 0.025,
        speedX: randomInt(-1, 2)
    };
}
document.addEventListener("mousemove", mousemoveHandler);
function mousemoveHandler(event){
    mouseX = event.clientX - cnv.offsetLeft;
    mouseY = event.clientY -cnv.offsetTop;
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
