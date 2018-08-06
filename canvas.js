var canvas = document.querySelector('canvas');
canvas.width = 1440;
canvas.height = 880;

var ctx = canvas.getContext('2d');


var paddleHeight = 50;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;

var x = paddleX;
var y = 24;
var dy= 0;
var ballRadius = 25;

var mx = 635;
var my = 16;

var rightPressed = false;
var leftPressed = false;
var downPressed = false;

var brickRowCount = 1;
var brickColumnCount = 22;
var brickWidth = 30;
var brickHeight = 20;
var brickPadding = 44;
var brickOffsetTop = 823;
var brickOffsetLeft = 122;
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

// function explosion(){
//   var pic2 = new Image();
//   pic2.src = "./images/explosion.png";
//   ctx.drawImage(pic2, 200,400,canvas.width/2, canvas.height/13);
// }



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
    ctx.drawImage(this.pic,this.xx,723,canvas.width/13, canvas.height/9);
  }

  moveBomb(canvas){
    if(this.xx > canvas.width){
      this.xx = 8;
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
  constructor(x, y, vx,vy, src,w,h){
    this.x = x;
    this.y = y;
    this.vx=vx;
    this.vy=vy;
    this.pic4 = new Image()
    this.pic4.src = src;
    this.w = w;
    this.h = h;
  }


  draw(ctx){
  ctx.drawImage(this.pic4,this.x,this.y,this.w, this.h)
  }

  moveCircle(canvas){
    if(this.x + this.vx > canvas.width-this.w || this.x + this.vx < this.w) {
      this.vx = -this.vx;
    }
    if(this.y + this.vy > canvas.height-this.h || this.y + this.vy < canvas.height-125) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
  }
}

const circle1 = new Circle(Math.random()*innerWidth/2, 800, 2, 1,'./images/ball15.png',55,55)
const circle2 = new Circle(Math.random()*innerWidth/2, 850, 1, 2, './images/ball6.png',34,34)
const circle3 = new Circle(Math.random()*innerWidth/2, 810, 1, 1, './images/ball20.png',60,60)



function draw(){
  ctx.clearRect(0,0,canvas.width, canvas.height);
  drawLine();
  drawBricks();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawPinkLine();
  // explosion();
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

  } else if(my+dy>canvas.height-145){
    dy = -2
  }


  if(rightPressed && paddleX < canvas.width-paddleWidth && y <=45) {
    paddleX += 7;
    x += 7
  }
  else if (leftPressed && paddleX > 150 && y<=45) {
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
        var pic3 = new Image();
        pic3.src = "./images/ball4.png";
        ctx.drawImage(pic3, brickX,brickY,56,56);
      }
    }
  }
}

function collisionDetection() {


  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x - ballRadius && x < b.x + ballRadius && y+100 > b.y - ballRadius && y+ 100 < b.y + ballRadius) {
          b.status = 2;
          dy = -dy;
          score++;
        }
      }else if (b.status == 2 ){
        var pic3 = new Image();
        pic3.src = "./images/ball4.png";
        ctx.drawImage(pic3, x-25,y+140,56,56);
        b.y -=2;
        if(b.y <= 125){
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
