class Bomb {

  constructor() {
    this.xx = 8
    this.pic = new Image()
    this.pic.src = './images/bomb.png'
  }

  draw(canvas, ctx) {
    ctx.drawImage(this.pic,this.xx,809,canvas.width/13, canvas.height/10);
  }


}
