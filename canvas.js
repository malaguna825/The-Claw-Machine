var canvas = document.querySelector('canvas');
canvas.width = 1460;
canvas.height = 900;
canvas.fillStyle  = "yellow";

var c = canvas.getContext('2d');
var grd = c.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "yellow");
grd.addColorStop(1, "white");

// Fill with gradient
c.fillStyle = grd;
c.fillRect(10, 10, 1460, 900);
c.fillStyle =  'rgba(255,0,0,0.5)'
c.fillRect(780, 200, 100, 100);
// c.fillStyle =  'rgba(0,0,255,0.5)'
// c.fillRect(200, 200, 100, 100);
// c.fillStyle =  'rgba(0,255,0,0.5)'
// c.fillRect(300, 400, 100, 100);
// c.fillRect(400, 300, 100, 100);
//
// console.log(canvas);

// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400, 300);

c.strokeStyle = "white";

// c.stroke()

for(var i = 0; i < 20; i++){

  var x = Math.random() * window.innerWidth;
  var y = window.innerHeight-60;
  c.beginPath();

  c.arc(x,y, 30, 0, Math.PI * 2, false);
  c.fillStyle = "#0095DD";
  c.fill();
  // c.fillStyle = "blue"
  c.stroke();
}
// function Circle(x,y){
//   this.x = x;
//   this.y = y;
//
//   this.draw = function(){
//     c.beginPath();
//     c.arc(x,y, radius, 0, Math.PI * 2, false);
//     c.strokeStyle= 'red';
//     c.stroke();
//
//     this.update = function() {
//
//     }
//   }
// }

// var circle = new Circle(200,200);
//
// var x= Math.random() * innerWidth;
// var y= Math.random() * innerHeight;
// var dx=(Math.random()-0.5)*12;
// var dy=(Math.random()-0.5)*12;
// var radius = 30;
// function animate() {
//   requestAnimationFrame(animate);
//   c.clearRect(0,0,innerWidth,innerHeight)
//   circle.draw();
//   if(x + radius > innerWidth || x - radius < 0){
//     dx= -dx;
//   }
//   if(y + radius > innerHeight || y - radius < 0){
//     dy= -dy;
//   }
//
//   x += dx;
//   y += dy;
//
//   c.beginPath();
//   c.arc(x,y, radius, 0, Math.PI * 2, false);
//   c.strokeStyle= 'red';
//   c.stroke();
//
// }
//
// animate()
// function roundRect(x, y, w, h, radius)
// {
//   var r = x + w;
//   var b = y + h;
//   c.beginPath();
//   c.strokeStyle="black";
//   c.lineWidth="2";
//   c.moveTo(x+radius, y);
//   c.lineTo(r-radius, y);
//   c.quadraticCurveTo(r, y, r, y+radius);
//   c.lineTo(r, y+h-radius);
//   c.quadraticCurveTo(r, b, r-radius, b);
//   c.lineTo(x+radius, b);
//   c.quadraticCurveTo(x, b, x, b-radius);
//   c.lineTo(x, y+radius);
//   c.quadraticCurveTo(x, y, x+radius, y);
//   c.stroke();
// }
// roundRect(20,170, window.innerWidth-40, window.innerHeight-200, 20);

window.addEventListener('mousemove',function(){
  console.log('asdfasdf')
})

// var rightPressed = false;
// var leftPressed = false;
//
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
//
// function keyDownHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = true;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = true;
//     }
// }
// function keyUpHandler(e) {
//     if(e.keyCode == 39) {
//         rightPressed = false;
//     }
//     else if(e.keyCode == 37) {
//         leftPressed = false;
//     }
// }

c.beginPath();
c.rect(20,40,50,50);
c.fillStyle='lightblue';
c.fill();
c.closePath();

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy= -2;
var ballRadius = 10;




function drawBall(){
  c.beginPath();
  c.arc(x,y, ballRadius,0,Math.PI*2,false);
  c.fillStyle ='pink';
  c.fill();
  c.closePath();
}

function draw(){
  c.clearRect(0,0,canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;
  if(x + dx > canvas.width || x + dx < 0) {
    dx = -dx;
  }
  if(y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
  }
}

setInterval(draw,10);
