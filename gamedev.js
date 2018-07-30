var canvas = document.querySelector('canvas');
canvas.width = 1460;
canvas.height = 900;
canvas.fillStyle  = "yellow";

var ctx = canvas.getContext('2d');
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "yellow");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 1460, 900);
ctx.fillStyle =  'rgba(255,0,0,0.5)'
ctx.fillRect(780, 200, 100, 100);


ctx.strokeStyle = "white";

// ctx.stroke()

for(var i = 0; i < 20; i++){

  var x = Math.random() * window.innerWidth;
  var y = window.innerHeight-60;
  ctx.beginPath();

  ctx.arc(x,y, 30, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.stroke();
}


ctx.beginPath();
ctx.rect(20,40,50,50);
ctx.fillStyle='lightblue';
ctx.fill();
ctx.closePath();

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy= -2;
var ballRadius = 20;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


function drawBall(){
  ctx.beginPath();
  ctx.arc(x,y, ballRadius,0,Math.PI*2,false);
  ctx.fillStyle ='pink';
  ctx.fill();
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  x += dx;
  y += dy;
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if (y +dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      }
      else {
        alert("GAME OVER!");
        document.location.reload();
      }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
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
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if (e.keyCode == 37) {
    leftPressed =false;
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
