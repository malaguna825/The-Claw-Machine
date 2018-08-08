

class Bomb {

  constructor() {
    this.xx = 8
    this.y =723
    this.pic = new Image()
    this.pic.src = './images/bomb.png'
  }

  draw(canvas, ctx) {
    ctx.drawImage(this.pic,this.xx,this.y,canvas.width/13, canvas.height/9);
  }

  moveBomb(canvas){
    if(this.xx > canvas.width){
      this.xx = 8;
    } else {
      this.xx += 8;
    }
  }

  moveBomb2(canvas){
    if(this.xx < -10){
      this.xx =canvas.width;
    } else {
      this.xx -= 4;
    }
  }

  moveBomb3(canvas){
    if(this.xx > canvas.width){
      this.xx = 8;
    } else {
      this.xx += 2;
    }
  }
}

export default Bomb;
