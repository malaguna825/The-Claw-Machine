var canvas = document.querySelector('canvas');
canvas.width = 1460;
canvas.height = 900;

var ctx = canvas.getContext('2d');


var paddleHeight = 50;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;

var x = paddleX;
var y = 24;
var dy= 0;
var ballRadius = 25;

var mx = 635;
var my = 15;

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



function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX-47,0, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


var rectHeight = 0;
var rectWidth = 6;

function drawLine(){
  ctx.beginPath();
  ctx.rect(x, y+80, rectWidth,rectHeight);
  ctx.fillStyle ='pink';
  ctx.fill();
  ctx.closePath();
}


function drawMagnet(){
  var pic1 = new Image();
  pic1.src = "./images/magnet.png";
  ctx.drawImage(pic1, paddleX-34,my+90,canvas.width/20, canvas.height/13);
  my += dy;
  if(my+dy< 0){
    dy = 0;
  }
}

function drawPinkLine(){
  ctx.beginPath();
  ctx.rect(paddleX, 50, rectWidth,60);
  ctx.fillStyle ='pink';
  ctx.fill();
  ctx.closePath();
}


class Bomb {

  constructor() {
    this.xx = 8
    this.pic = new Image()
    this.pic.src = './images/bomb.png'
  }

  draw(canvas, ctx) {
    ctx.drawImage(this.pic,this.xx,809,canvas.width/13, canvas.height/10);
  }

  moveBomb(canvas){
    if(this.xx > canvas.width){
      this.xx =8;
    } else {
      this.xx += 2;
    }
  }

  moveBomb2(canvas){
    if(this.xx < -10){
      this.xx =canvas.width;
    } else {
      this.xx -= 4;
    }
  }
}

const bomb1 = new Bomb();
const bomb2 = new Bomb();

class Circle {
  constructor(x, y, radius, color, vx,vy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.vx=vx
    this.vy=vy
  }


  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  moveCircle(canvas){
    if(this.x + this.vx > canvas.width-this.radius || this.x + this.vx < this.radius) {
        this.vx = -this.vx;
    }
    if(this.y + this.vy > canvas.height-this.radius || this.y + this.vy < canvas.height-150) {

        this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;
  }


}

const circle1 = new Circle(Math.random()*innerWidth/2, 800, 20, "red",2,1)
const circle2 = new Circle(Math.random()*innerWidth/2, 850, 30, "blue",1,3)
const circle3 = new Circle(Math.random()*innerWidth/2, 750, 15, "blue",2,1)



function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawLine();
  drawBricks();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawPinkLine();
  bomb1.draw(canvas, ctx);
  bomb1.moveBomb(canvas);

  bomb2.draw(canvas, ctx);
  bomb2.moveBomb2(canvas);

  circle1.draw(ctx);
  circle1.moveCircle(canvas);

  circle2.draw(ctx);
  circle2.moveCircle(canvas);

  circle3.draw(ctx);
  circle3.moveCircle(canvas);

  drawMagnet();


  y += dy;
  rectHeight -= 8;
  if(y+dy< 0){
    dy = 0;
  }


  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
    x += 7
  }
  else if (leftPressed && paddleX > 150) {
    paddleX -= 7;
    x -= 7
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
  else if(e.keyCode == 32 && y <= 24) {
    dy = 2;
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
        ctx.arc(brickX, brickY, ballRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
              if(x > b.x - ballRadius && x < b.x + ballRadius && y+110 > b.y - ballRadius && y+110 < b.y + ballRadius) {
                b.status = 2;
                dy = -dy;

                score++;
              }

            }else if (b.status == 2 ){
              ctx.beginPath();
              ctx.arc(x, y+160, ballRadius, 0, Math.PI * 1.9);
              ctx.fillStyle = "#0095DD";
              ctx.fill();
              ctx.closePath();
              b.y -=2;
              if(b.y <= 100){
                b.status = 0;
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
