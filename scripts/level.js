const difficultOption = () => {
  let difficulty = document.getElementById('difficultyOptions');
  let selectedValue = difficulty.options['selectedIndex'];

  if (selectedValue === 0) {
    alert('Remember to pick a difficulty!');
  }

  if (selectedValue === 1) {
    // console.log('novice');
    const game = new Game(canvas, 0.5, 1.5, 60, 0, 5, novieArr);
    game.startGame();
  }
  if (selectedValue === 2) {
    // console.log('intermediate');
    const game = new Game(canvas, 1.5, 2.5, 60, 5, 10, intermediateArr);
    game.startGame();
  }
  if (selectedValue === 3) {
    // console.log('expert');
    const game = new Game(canvas, 2.5, 3.5, 60, 10, 10, expertArr);
    game.startGame();
  }
};
