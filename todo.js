
class Circle {
  constructor(x, y, radius, color, vx,vy){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = vx;
    this.vy = vy;

  }


  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  moveCircle1(canvas){
    if(this.x + this.vx > canvas.width-this.radius || this.x + this.vx < this.radius) {
        vx = -vx;
    }

}
  moveCircle2(canvas){
    if(this.y + this.vy > canvas.height- this.radius || this.y + this.vy < this.radius) {
        vy = -vy;

      }

    }
  }





  class Circle {
    constructor(x, y, radius, color, vx,vy){
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }


    draw(ctx){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    moveCircle1(canvas){
      if(this.x > canvas.width){
        this.x =8;
      } else {
        this.x += 5;
      }
    }

    moveCircle2(canvas){
      if(this.x< -10){
        this.x =canvas.width;
      } else {
        this.x -= 4;
      }
    }
  }




  moveCircle(canvas){
    if(this.x + this.vx > canvas.width-this.radius || this.x + this.vx < this.radius) {
        this.vx = -this.vx;
    }
    if(this.y + this.vy > canvas.height-this.radius || this.y + this.vy < this.radius) {
        this.vy = -this.vy;
    }

    this.x += this.vx;
    this.y += this.vy;
  }
