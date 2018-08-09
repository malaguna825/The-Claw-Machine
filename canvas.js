import Bomb from "./lib/bomb";
import Circle from "./lib/circle";
import $ from "jquery";

let countdownStarted = false;
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

  for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
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
  circle1.inplay = true;
  circle2.inplay = true;
  circle3.inplay = true;
  timeLeft = 45;
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

////////////

let timeLeft;

let timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
    timesUp();
  } else {
    timeLeft--;
  }
}

function draw(){
  if (countdownStarted === false) {
    timerId;
    countdownStarted = true;
  }

  if (!doAnimation) {
    timesUp();
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
    if(circle1.inplay){
      circle1.draw(ctx);
      circle1.moveCircle(canvas);
    }

    if(circle2.inplay){
      circle2.draw(ctx);
      circle2.moveCircle(canvas);
    }

    if(circle3.inplay){
      circle3.draw(ctx);
      circle3.moveCircle(canvas);
    }
    collisionDetection();

    drawMagnet();

    y += dy;
    rectHeight -= 8;
    if(y+dy< 0){
      dy = 0;

    } else if(my+dy>canvas.height-155){
      dy = -4
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

let ball = new Audio();
ball.src = "./images/ball.mp3"

let ball2 = new Audio();
ball2.src = "./images/ball2.mp3"

function collisionDetection() {

  if(x > circle1.x && x < circle1.x + 60 && y + 67 > circle1.y - 50  && y + 100 < circle1.y + 50 && dy > 0) {
    dy = -dy;
    score += 15;
    circle1.inplay = false;
    ball2.play();
  } else if(x > circle2.x && x < circle2.x + 39 && y + 46 > circle2.y - 50  && y + 100 < circle2.y + 50 && dy > 0) {
    dy = -dy;
    circle2.inplay = false;
    ball2.play();
    score += 6;
  } else if(x > circle3.x && x < circle3.x + 65 && y + 72 > circle3.y - 50  && y + 100 < circle3.y + 50 && dy > 0) {
    dy = -dy;
    circle3.inplay = false;
    ball2.play();
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
          ball.play();
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
  ctx.beginPath();
  ctx.rect(14, 320, 121,120);
  ctx.fillStyle ='grey';
  ctx.fill();
  ctx.closePath();
  ctx.font = 'bold 23px Arial';
  ctx.fillStyle = "white";
  ctx.fillText("Score:" + score,29,360);
  ctx.font = 'bold 23px Arial';
  ctx.fillText(timeLeft + " s", 29, 415);
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
    }, 45000)
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
  ctx.strokeText('Press Enter to Start',340, canvas.height/2);
}

function timesUp(){
  countdownStarted = false;
  ctx.beginPath();
  ctx.rect(-3, -3, 1460, 892);
  ctx.fillStyle = '#FFB6C1';
  ctx.fill();
  ctx.lineWidth = 7;
  ctx.strokeStyle = 'white';
  ctx.font = '98px serif';
  ctx.lineWidth = 3;
  ctx.strokeText('Time\'s Up!',500, canvas.height/3);
  ctx.font = "34px Comic Sans MS";
  ctx.lineWidth = 2;
  ctx.strokeText("<Press Enter To Play Again>",508,402)


  ctx.font = 'bold 35px Arial';
  ctx.fillStyle = "white";
  ctx.fillText("Score:" + score,652,545);
}

document.addEventListener('keydown', e => playSound(e));

let arrowButton = new Audio();
arrowButton.src = "./images/arrowButton.mp3"
let spaceKey = new Audio();
spaceKey.src = "./images/spaceKey.mp3"
function playSound(e) {
  if (e.keyCode == 37){
    arrowButton.play()
  } else if (e.keyCode == 39){
    arrowButton.play()
  }else if (e.keyCode == 32){
    spaceKey.play()
  }
}

drawStart();
