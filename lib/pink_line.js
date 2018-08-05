class PinkLine() {

  contructor() {
    this.paddleX = 680;
    this.rectWidth = 6;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(this.paddleX, 50, this.rectWidth,60);
    ctx.fillStyle ='pink';
    ctx.fill();
    ctx.closePath();
  }
}
