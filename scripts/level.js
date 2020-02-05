const difficultOption = () => {
  let difficulty = document.getElementById('difficultyOptions');
  let selectedValue = difficulty.options['selectedIndex'];

  if (selectedValue === 0) {
    animateCSS('#startButton', 'jello');
    setTimeout(() => {
      message.style.display = 'block';
      // alert('Remember to pick a difficulty!');
    }, 500);
  }

  if (selectedValue === 1) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 0.5, 1.5, 1);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 2) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 1.5, 2.5, 2);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 3) {
    message.style.display = 'none';
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 2.5, 3.5, 3);
      game.startGame();
    }, 2000);
  }
};
