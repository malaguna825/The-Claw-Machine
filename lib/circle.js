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
    this.angle = 0;
    this.inplay = true;
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


export default Circle;
