const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const getTime = typeof performance === 'function' ? performance.now : Date.now;
const FRAME_THRESHOLD = 300;
const FRAME_DURATION = 1000 / 58;
let then = getTime();

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

console.log('Hi there!');

startButton.addEventListener('click', function() {
  const game = new Game(canvas, 2.5, 1.5, 60);
  game.startGame();
});
