class Object {
  constructor() {
    this.canvas = canvas;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.context = canvas.getContext('2d');
    this.image = new Image();
    this.image.src = 'images/snowflake.jpg';
    this.image.onload = this.context.drawImage(this.image, 500, 500);
    // this.pauseAnimation();
  }

  pauseAnimation = () => {
    // stop the animation
    // pause animation for 10 seconds
    // animation then continues
    // the object is cleared from the canvas
  };
}
