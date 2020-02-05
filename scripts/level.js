const difficultOption = () => {
  let difficulty = document.getElementById('difficultyOptions');
  let selectedValue = difficulty.options['selectedIndex'];

  if (selectedValue === 0) {
    animateCSS('#startButton', 'jello');
    setTimeout(() => {
      alert('Remember to pick a difficulty!');
    }, 1000);
  }

  if (selectedValue === 1) {
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 0.5, 1.5, 1);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 2) {
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 1.5, 2.5, 2);
      game.startGame();
    }, 2000);
  }
  if (selectedValue === 3) {
    animateCSS('#startButton', 'hinge');
    setTimeout(() => {
      const game = new Game(canvas, 2.5, 3.5, 3);
      game.startGame();
    }, 2000);
  }
};
