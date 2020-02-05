class Object {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.context = canvas.getContext('2d');
    this.image = new Image();
    this.image.src = 'images/snowflake.jpg';
    this.image.onload = this.context.drawImage(this.image, 500, 500);
  }
}
