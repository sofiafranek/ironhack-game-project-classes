const image = new Image();
const imageURL = 'images/snowflake.png';
image.src = imageURL;

class Object {
  constructor() {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.drawObject();
  }

  drawObject = () => {
    this.context.drawImage(image, this.x, this.y, 50, 50);
  };

  useObject = () => {
    // when the user inputs 'FREEZE' pause animation function will run
    // this.pauseAnimation();
  };

  pauseAnimation = () => {
    // stop the animation
    // pause animation for 10 seconds
    // animation then continues
    // the object is cleared from the canvas
  };
}
