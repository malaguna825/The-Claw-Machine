import Bomb from "./lib/bomb";
import Circle from "./lib/circle";
import $ from "jquery";



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


document.addEventListener('keydown',(e)=>startGame(e));

let started = false;

function startGame(e) {

  if (e.key === "Enter" && started === false){
    started = true;
    draw()
  }
}

function drawStart(){
  console.log("hello")
}

drawStart();

// var modal = document.getElementById('simpleModal');
// var modalBtn = document.getElementById('modalBtn');
// var closeBtn = document.getElementsByClassName('closeBtn')[0];
//
//
//
// modalBtn.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);
//
//
// function openModal(){
//   modal.style.display = 'block';
// }
//
// function closeModal(){
//   modal.style.display = 'none';
// }
