const difficultOption = () => {
  let difficulty = document.getElementById('difficultyOptions');
  let selectedValue = difficulty.options['selectedIndex'];

  if (selectedValue === 0) {
    animateCSS('#startButton', 'jello');
    setTimeout(() => {
      message.style.display = 'block';
    }, 500);
  }

  if (selectedValue === 1) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 0.5, 1.5, 1, 60, 300);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 2) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 1.5, 2.5, 2, 60, 300);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 3) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 2.5, 3.5, 3, 60, 200);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 4) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 6, 6, 4, 30, 700);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 5) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 4, 4.5, 5, 30, 800);
      game.startGame();
    }, 2000);
  }
};
