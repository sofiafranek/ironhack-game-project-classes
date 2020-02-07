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
let novice = document.getElementById('#novice');

const startView = document.querySelector('#startView');
const gameView = document.querySelector('#gameView');
const endView = document.querySelector('#endView');

const noviceInstruct = document.getElementById('noviceInstruct');
const intermediateInstruct = document.getElementById('intermediateInstruct');
const expertInstruct = document.getElementById('expertInstruct');
const bonusInstruct = document.getElementById('bonusInstruct');
const bonusbonusInstruct = document.getElementById('bonusbonusInstruct');
const superbonusInstruct = document.getElementById('superbonusInstruct');

let difficulty = document.querySelector('select');
let selectedValue = difficulty.options['selectedIndex'];

let audio = new Audio('Firework - Katy Perry (Lyrics).mp3');

const difficultlyChange = chosen => {
  if (chosen === 'novice') {
    noviceInstruct.style.display = 'block';
    message.style.display = 'none';
    console.log('novice');
  } else {
    noviceInstruct.style.display = 'none';
  }

  if (chosen === 'intermediate') {
    intermediateInstruct.style.display = 'block';
    message.style.display = 'none';
    console.log('intermediate');
  } else {
    intermediateInstruct.style.display = 'none';
  }

  if (chosen === 'expert') {
    expertInstruct.style.display = 'block';
    message.style.display = 'none';
    console.log('expert');
  } else {
    expertInstruct.style.display = 'none';
  }

  if (chosen === 'bonus') {
    bonusInstruct.style.display = 'block';
    message.style.display = 'none';
    console.log('bonus');
  } else {
    bonusInstruct.style.display = 'none';
  }

  if (chosen === 'bonus bonus') {
    bonusbonusInstruct.style.display = 'block';
    message.style.display = 'none';
    console.log('bonus bonus');
  } else {
    bonusbonusInstruct.style.display = 'none';
  }

  if (chosen === 'super bonus') {
    superbonusInstruct.style.display = 'block';
    message.style.display = 'none';
    console.log('super bonus');
  } else {
    superbonusInstruct.style.display = 'none';
  }
};

startButton.addEventListener('click', function() {
  difficultOption();
});
