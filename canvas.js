var canvas = document.querySelector('canvas');
canvas.width = 1460;
canvas.height = 900;
canvas.fillStyle  = "yellow";

var ctx = canvas.getContext('2d');
var grd = ctx.createLinearGradient(0, 0, 200, 0);


var paddleHeight = 50;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;

var x = paddleX;
var y = paddleHeight-paddleHeight;
var dx = 2;
var dy= -2;
var ballRadius = 20;


var rightPressed = false;
var leftPressed = false;
var downPressed = false;

var brickRowCount = 2;
var brickColumnCount = 25;
var brickWidth = 30;
var brickHeight = 20;
var brickPadding = 40;
var brickOffsetTop = 809;
var brickOffsetLeft = 40;
var score = 0;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// for(var i = 0; i < 30; i++){
//
//   var x = Math.random() * canvas.width;
//   var y = Math.random() * canvas.height/20;
//
//   ctx.beginPath();
//
//   ctx.arc(x,y, 30, 0, Math.PI * 2, false);
//   ctx.fillStyle = "red";
//   ctx.fill();
//   ctx.closePath();
// }


function drawBricks() {
  // for(var i = 0; i < 30; i++){
  //
  //   var x = Math.random() * canvas.width;
  //   var y = Math.random() * canvas.height/20;
  //
  //   ctx.beginPath();
  //
  //   ctx.arc(x,y, 30, 0, Math.PI * 2, false);
  //   ctx.fillStyle = "#0095DD";
  //   ctx.fill();
  //   ctx.closePath();
  // }
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.arc(brickX, brickY, 30, 0, Math.PI * 2, false);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX,paddleHeight-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


function animate(){
  requestAnimationFrame(animate);
  ctx.beginPath();
  ctx.rect(paddleX,paddleHeight-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}





function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius,0,Math.PI*2,false);
  ctx.fillStyle ='pink';
  ctx.fill();
  ctx.closePath();
}


function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBall();
  drawBricks();
  drawPaddle();
  collisionDetection();
  drawScore();
  // x += dx;
  // y += dy;
  // if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
  //   dx = -dx;
  // }
  // if(y + dy < ballRadius) {
  //   dy = -dy;
  // } else if (y +dy > canvas.height-ballRadius) {
  //     if(x > paddleX && x < paddleX + paddleWidth) {
  //       dy = -dy;
  //     }
  //     else {
  //       alert("GAME OVER!");
  //       document.location.reload();
  //     }
  // }
  y += dy;
  if(y+dy< 0){
    dy = -dy;
  }


  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  else if (downPressed && y> 0) {
    paddleX -= 7;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
  if(e.keyCode ==39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
  else if(e.keyCode == 32) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if (e.keyCode == 37) {
    leftPressed =false;
  }
  else if(e.keyCode == 32) {
    downPressed = false;
  }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount * brickColumnCount) {
                      alert("YOU WIN, CONGRATULATIONS!");
                      document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore(){
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText("Score:" + score,8,20)
}


setInterval(draw,12);
