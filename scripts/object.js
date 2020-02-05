class Object extends Word {
  constructor(game, posX, posY, speedX, speedY) {
    super(game, posX, posY, speedX, speedY);
    const snowflake = {
      snowflakeWidth: 200,
      snowflakeHeight: 200,
      snowflake: new Image()
    };
    snowflake.src = 'images/snowflake.jpg';
  }

  drawSnowflake = () => {
    this.context.drawImage(snowflake.src, posX, poY);
  };

  pauseAnimation = () => {
    // stop the animation
    // pause animation for 10 seconds
    // animation then continues
    // the object is cleared from the canvas
  };
}

// this.image = new Image();
// console.log(this.image);
// this.image.src = 'images/snowflake.jpg';
// console.log(this.image.src);
// this.image.onload = this.context.drawImage(this.image, 500, 500);
