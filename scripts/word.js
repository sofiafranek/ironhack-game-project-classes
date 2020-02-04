class Word {
  constructor(game, posX, posY, speedX, speedY, value) {
    this.game = game;
    this.x = posX;
    this.y = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.value = value;
  }

  moveWord() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
