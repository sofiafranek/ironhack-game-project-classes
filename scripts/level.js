const difficultOption = () => {
  let difficulty = document.getElementById('difficultyOptions');
  let selectedValue = difficulty.options['selectedIndex'];

  if (selectedValue === 0) {
    alert('Remember to pick a difficulty!');
  }

  if (selectedValue === 1) {
    const game = new Game(canvas, 0.5, 1.5, 60, 1);
    game.startGame();
  }
  if (selectedValue === 2) {
    const game = new Game(canvas, 1.5, 2.5, 60, 2);
    game.startGame();
  }
  if (selectedValue === 3) {
    const game = new Game(canvas, 2.5, 3.5, 60, 3);
    game.startGame();
  }
};
