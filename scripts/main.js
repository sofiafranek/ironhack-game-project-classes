const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startButton = document.querySelector('#startButton');
let typedWords = document.querySelector('#typedWords');
let wpmResult = document.querySelector('#wpmResult');
let rightKeystroke = document.querySelector('#rightKeystrokes');
let wrongKeystroke = document.querySelector('#wrongKeystrokes');
let accuracy = document.querySelector('#accuracy');
let totalKeystrokes = document.querySelector('#totalKeystrokes');

let difficultyOptions = document.querySelector('#difficultyOptions');

const startView = document.querySelector('#startView');
const gameView = document.querySelector('#gameView');
const endView = document.querySelector('#endView');

// window.onload = function(e) {
//   console.log('hello');
//   this.game.createWordLength();
// };

startButton.addEventListener('click', function() {
  difficultOption();
});
