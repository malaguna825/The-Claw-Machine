import Bomb from "./lib/bomb";
import Circle from "./lib/circle";
import $ from "jquery";


let canvas = document.querySelector('canvas');
canvas.width = 1440;
canvas.height = 880;

let ctx = canvas.getContext('2d');


let paddleHeight = 50;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth)/2;

let x = paddleX;
let y = 24;
let dy= 0;
let ballRadius = 25;

let mx = 635;
let my = 16;

let rightPressed = false;
let leftPressed = false;
let downPressed = false;

let brickRowCount = 1;
let brickColumnCount = 22;
let brickWidth = 30;
let brickHeight = 20;
let brickPadding = 44;
let brickOffsetTop = 823;
let brickOffsetLeft = 122;
let score = 0;

function reset(){

  for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

 paddleHeight = 50;
 paddleWidth = 100;
 paddleX = (canvas.width-paddleWidth)/2;

 x = paddleX;
 y = 24;
 dy= 0;
 ballRadius = 25;

 mx = 635;
 my = 16;

 rightPressed = false;
 leftPressed = false;
 downPressed = false;

 brickRowCount = 1;
 brickColumnCount = 22;
 brickWidth = 30;
 brickHeight = 20;
 brickPadding = 44;
 brickOffsetTop = 823;
 brickOffsetLeft = 122;
 score = 0;
}


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


const bomb1 = new Bomb();
const bomb2 = new Bomb();
const bomb3 = new Bomb();


const circle1 = new Circle(Math.random()*innerWidth/2, 800, 2, 1,'./images/ball15.png',55,55)
const circle2 = new Circle(Math.random()*innerWidth/2, 850, 1, 2, './images/ball6.png',34,34)
const circle3 = new Circle(Math.random()*innerWidth/2, 810, 1, 1, './images/ball20.png',60,60)



function draw(){
  if (!doAnimation) {
    timesUp(); // draws the timesUp onto canvas
  started = false
  } else {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawLine();
    drawBricks();
    drawPaddle();
    drawScore();
    drawPinkLine();
    requestAnimationFrame(draw);

    bomb1.draw(canvas, ctx);
    bomb1.moveBomb(canvas);

    bomb2.draw(canvas, ctx);
    bomb2.moveBomb2(canvas);

    bomb3.draw(canvas, ctx);
    bomb3.moveBomb3(canvas);

    circle1.draw(ctx);
    circle1.moveCircle(canvas);

    circle2.draw(ctx);
    circle2.moveCircle(canvas);

    circle3.draw(ctx);
    circle3.moveCircle(canvas);
    collisionDetection();

    drawMagnet();

    y += dy;
    rectHeight -= 8;
    if(y+dy< 0){
      dy = 0;

    } else if(my+dy>canvas.height-155){
      dy = -4
    }


    if(rightPressed && paddleX < canvas.width-paddleWidth ) {//&& y <=45) {
      paddleX += 7;
      x += 7
    }
    else if (leftPressed && paddleX > 150 ) {//&& y<=45) {
      paddleX -= 7;
      x -= 7
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
  e.preventDefault();

  if(e.keyCode ==39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
  else if(e.keyCode == 32 && y <= 24) {
    dy = 3;
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
  // debugger
  if(x > circle1.x && x < circle1.x + 60 && y + 67 > circle1.y - 50  && y + 100 < circle1.y + 50 && dy > 0) {
    debugger
  dy = -dy;
  score += 15;

} else if(x > circle2.x && x < circle2.x + 39 && y + 46 > circle2.y - 50  && y + 100 < circle2.y + 50 && dy > 0) {
  debugger
  dy = -dy;

  score += 6;
} else if(x > circle3.x && x < circle3.x + 65 && y + 72 > circle3.y - 50  && y + 100 < circle3.y + 50 && dy > 0) {
  debugger
  dy = -dy;

  score += 20;
}

  if(x-20 > bomb1.xx - 20 && x-20 < bomb1.xx + 20 && y + 20 > bomb1.y - 90  && y + 20 < bomb1.y + 90 && dy > 0) {

    alert("GAME OVER");
    started = false
    document.location.reload();
  } else if (x-20 > bomb2.xx - 20 && x-20 < bomb2.xx + 20 && y + 20 > bomb2.y - 90  && y + 20 < bomb2.y + 90 && dy > 0) {

    alert("GAME OVER");
    started = false;
    document.location.reload();

  } else if (x-20 > bomb3.xx - 20 && x-20 < bomb3.xx + 20 && y + 20 > bomb3.y - 90  && y + 20 < bomb3.y + 90 && dy > 0) {

    alert("GAME OVER");
    started = false;
    document.location.reload();

  }

  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x-20 > b.x - ballRadius && x-20 < b.x + ballRadius && y+90 > b.y - ballRadius && y+ 90 < b.y + ballRadius) {
          b.status = 2;
          dy = -dy;
          score += 4;
        }
      }else if (b.status == 2 ){
        var pic3 = new Image();
        pic3.src = "./images/ball4.png";
        ctx.drawImage(pic3, x-25,y+140,56,56);
        b.y -=2;
        if(b.y <= 340){
          b.status = 0;
        }
      }
    }
  }
}


function drawScore(){
  ctx.font = 'bold 38px Arial';
  ctx.fillStyle = "rgb(10, 101, 228)";
  ctx.fillText("Score:" + score,20,60)
}


document.addEventListener('keydown', e => startGame(e));

let started = false;
let doAnimation;
function startGame(e) {

  if (e.key === "Enter" && started === false){
    reset();
    started = true;
    doAnimation = true;
    draw();
    setTimeout(function() {
      doAnimation = false;
    }, 6000)
  }
}


function drawStart(){
  ctx.beginPath();
    ctx.rect(-3, -3, 1460, 892);
    ctx.fillStyle = '#FFB6C1';
    ctx.fill();
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'white';
  ctx.font = '98px serif';
  ctx.lineWidth = 3;
  ctx.strokeText('Press Enter to Start',canvas.width/4, canvas.height/2);
}

function timesUp(){
  ctx.beginPath();
  ctx.rect(-3, -3, 1460, 892);
  ctx.fillStyle = '#FFB6C1';
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = 'white';
  ctx.font = '98px serif';
  ctx.lineWidth = 3;
  ctx.strokeText('Time\'s Up!',500, canvas.height/2);
  ctx.font = "30px Comic Sans MS";
  ctx.lineWidth = 2;
  ctx.strokeText("<Press Enter To Play Again>",515,530)
}

drawStart();
