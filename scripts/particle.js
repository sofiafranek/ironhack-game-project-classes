class Particle {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.decrease = 0.05;
    this.highestAlpha = 0.8;
    this.highestRadius = 5;
    this.highestSpeedX = 5;
    this.highestSpeedY = 5;
    this.lowestAlpha = 0.4;
    this.lowestRadius = 2;
    this.lowestSpeedX = -5;
    this.lowestSpeedY = -5;
    this.total = 100;
    this.acc = 0;
    this.animation;
    this.gameLoop;
    this.acc = 0;
    this.particles = [];
    this.drawBoom = true;
  }

  paintParticles = () => {
    for (const p of this.particles) {
      this.paintCircle(p.x, p.y, p.radius, p.color);
    }
  };

  processParticles = () => {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.radius -= this.decrease;
      if (
        p.radius <= 0 ||
        p.x < 0 ||
        p.x > this.game.canvas.width ||
        p.y < 0 ||
        p.y > this.game.canvas.height
      ) {
        this.particles.splice(i, 1);
      }
    }
    this.paintParticles();
  };

  paintCircle = (x, y, radius, color) => {
    const ctx = this.game.context;
    ctx.fillStyle = color;
    ctx.beginPath();
    this.drawCircle(x, y, radius);
    ctx.fill();
  };

  drawCircle = (x, y, radius) => {
    const ctx = this.game.context;
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
  };

  createParticles = (x, y) => {
    for (let i = 0; i < this.total; i++) {
      const c = this.generateRandomRgbColor();
      const alpha = this.generateRandomNumber(this.lowestAlpha, this.highestAlpha);
      const x = this.x;
      const y = this.y;
      this.particles.push({
        x,
        y,
        radius: this.generateRandomNumber(this.lowestRadius, this.highestRadius),
        color: `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`,
        speedX: this.generateRandomNumber(this.lowestSpeedX, this.highestSpeedX),
        speedY: this.generateRandomNumber(this.lowestSpeedY, this.highestSpeedY)
      });
    }
  };

  getDistance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  generateRandomNumber = (min, max) => {
    return min + Math.random() * (max - min);
  };

  generateRandomInteger = range => {
    return Math.floor(Math.random() * range);
  };

  generateRandomRgbColor = () => {
    return [
      this.generateRandomInteger(255),
      this.generateRandomInteger(255),
      this.generateRandomInteger(255)
    ];
  };
}
