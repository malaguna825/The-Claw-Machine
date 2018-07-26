var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
c.lineWidth = 2;
c.strokeStyle = "black";
c.strokeRect(20,200,window.innerWidth-40,window.innerHeight-250);



c.fillStyle =  'rgba(255,0,0,0.5)'
c.fillRect(480, 100, 100, 100);
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
  var y = window.innerHeight-82
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
