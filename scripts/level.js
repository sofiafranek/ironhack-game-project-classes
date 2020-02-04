const levelDecider = () => {
  let difficulty = document.getElementById('difficultyOptions');
  let selectedValue = difficulty.options[difficulty.selectedValue].value;
  if (selectedValue === 'novice') {
    console.log('novice');
    // const game = new Game(canvas, 0.5, 1.5, 60);
  }
  if (selectedValue === 'intermediate') {
    console.log('intermediate');
    // const game = new Game(canvas, 1.5, 2.5, 60);
  }
  if (selectedValue === 'expert') {
    console.log('expert');
    // const game = new Game(canvas, 2.5, 3.5, 60);
  }
};
