// FUNCTIONS

// Draw Start Screen
function drawStart() {
    drawMain();
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
  
    ctx.font = "25px Consolas";
    ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
    ctx.fillText("RELEASE TO GO DOWN", 415, 480);
  }
  
  // Draw Game Elements
  function runGame() {
    
    //LOGIC
    moveHeli();
    moveWalls();
    //DRAW
    drawGame();
    checkCrash();
  }
  function moveHeli(){
    //accel up if mous is presses

    if (mouseIsPressed){
        heli.speed += -2;
    }
    // Apple Gravity (acecl)
    heli.speed += heli.accel;

    // max speed
    if (heli.speed > 6){
        heli.speed = 6;
    } else if (heli.speed < -6){
        heli.speed = -6;
    }
    // move heli by speed
    heli.y += heli.speed;
  }
function moveWalls() {
    wall1.x += wall1.speed
    if (wall1.x + wall1.w <0){
        wall1.x = wall3.x + 500;
        wall1.y = Math.random() * 300 + 100;
    }
    wall2.x += wall1.speed
    if (wall2.x + wall2.w <0){
        wall2.x = wall1.x + 500;
        wall2.y = Math.random() * 300 + 100;
    }
    wall3.x += wall1.speed
    if (wall3.x + wall3.w <0){
        wall3.x = wall2.x + 500;
        wall3.y = Math.random() * 300 + 100;
    }
    wall1.speed += wall1.accel;
    if (wall1.speed < -10){
        wall1.speed = -10;
    }
}

function checkCrash(){
    //hit top or bottom
    if (heli.y < 50){
        GameOver();
    } else if (heli.y + heli.h > cnv.height - 50){
        GameOver();
    }

    // hit walls
    if (heli.x < wall1.x + wall1.w &&
        heli.x + heli.w > wall1.x &&
        heli.y < wall1.y + wall1.h &&
        heli.h + heli.y > wall1.y) {
        // collision detected
        GameOver();
    } else if (heli.x < wall2.x + wall2.w &&
        heli.x + heli.w > wall2.x &&
        heli.y < wall2.y + wall2.h &&
        heli.h + heli.y > wall2.y) {
        // collision detected
        GameOver();
    } else if (heli.x < wall3.x + wall3.w &&
        heli.x + heli.w > wall3.x &&
        heli.y < wall3.y + wall3.h &&
        heli.h + heli.y > wall3.y) {
        // collision detected
        GameOver();
    } 
}
function GameOver(){
    explosion.play();
    state = "gameover"

    setTimeout(reset, 2000);
}


  function drawGame() {
    drawMain();
  
    // Draw Walls
    drawWalls();
  }
  
  // Draw Game Over Screen
  function drawGameOver() {
    drawMain();
  
    // Draw Walls
    
    drawWalls();
  
    // Circle around Helicopter
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
    ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);

}
 //HELPER FUNCTIONS
 function reset(){
     state = "start";
    heli = {
        x: 200,
        y: 250,
        w: 80,
        h: 40,
        speed: 0,
        accel: 0.75
    }
    wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
    speed: -3,
    accel: -0.005
    }
    wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
    }
    wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100
    }
    distance = 0
 }
 function drawWalls(){
    ctx.fillStyle = "green";
    ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
    ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}
function drawMain(){
    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Green Bars
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
  
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("HELICOPTER GAME", 25, 35);
    ctx.fillText("DISTANCE: " + String(distance), 25, cnv.height - 15);
    ctx.fillText("BEST: " + String(best), cnv.width - 250, cnv.height - 15);
    // Helicopter
    ctx.drawImage(heliImg, heli.x, heli.y);
}
