const image = new Image();
const imageURL = 'images/snowflake.png';
image.src = imageURL;

// const newWord = new Word(this, x, y, (dX / norm) * speed, (dY / norm) * speed, randomWordIndex);

class Object {
  constructor(game, speedX, speedY, speed) {
    this.game = game;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.speed = speed;
    this.speedX = speedX;
    this.speedY = speedY;
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
