const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startButton = document.querySelector('#startButton');
let typedWords = document.querySelector('#typedWords');
let score = document.querySelector('#score');
let timer = document.querySelector('#timer');
let wpmResult = document.querySelector('#wpmResult');
let rightKeystroke = document.querySelector('#rightKeystrokes');
let wrongKeystroke = document.querySelector('#wrongKeystrokes');
let accuracy = document.querySelector('#accuracy');
let totalKeystrokes = document.querySelector('#totalKeystrokes');
const message = document.querySelector('#message');

let difficultyOptions = document.querySelector('#difficultyOptions');

const startView = document.querySelector('#startView');
const gameView = document.querySelector('#gameView');
const endView = document.querySelector('#endView');

let difficulty = document.getElementById('difficultyOptions');
let selectedValue = difficulty.options['selectedIndex'];

let audio = new Audio('Firework - Katy Perry (Lyrics).mp3');

startButton.addEventListener('click', function() {
  difficultOption();
});
