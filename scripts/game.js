class Game {
  constructor(canvas, highestSpeed, lowestSpeed, level, gameLength, gameSpeed) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.counterTimer = gameLength;
    this.time = gameLength;
    this.wpm = 0;
    this.totalCorrectCharacters = 0;
    this.totalWrongCharacters = 0;
    this.sum = 0;
    this.newSum = 0;
    this.totalKeyStrokes = 0;
    this.accuracy = 0;
    this.words = [];
    this.word = {
      font: '20px Lato',
      color: 'black',
      size: 32,
      highestSpeed: highestSpeed,
      lowestSpeed: lowestSpeed
    };
    this.label = {
      font: '22px Lato',
      color: 'black',
      margin: 30,
      left: 20,
      right: canvas.width - 120
    };
    this.center = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    this.string = '';
    this.arrStrings = [];
    this.wrongKeystrokes = [];
    this.score = 0;
    this.checkWordMatch();
    this.keyDownHandler();
    this.gameSpeed = gameSpeed;
    this.gameTime = 0;
    this.isRunning = true;
    this.array;
    this.level = level;
    this.novieArr = [];
    this.intermediateArr = [];
    this.expertArr = [];
    this.bonusArr = [];
    this.bonusBonusArr = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '!',
      '@',
      '£',
      '%',
      '&',
      '(',
      ')'
    ];
    this.createWordLength();
  }

  startGame() {
    startView.style.display = 'none';
    gameView.style.display = 'block';
    audio.play();
    this.timerInit();
    this.loop();
    this.boom = false;
  }

  startingTheTimer = () => {
    // this.counterTimer = gameLength;
    const timer = setInterval(() => {
      this.counterTimer -= 1;
      this.time = this.counterTimer;
      if (this.counterTimer === 5) {
        animateCSS('#timer', 'pulse');
      }
      if (this.counterTimer === 4) {
        animateCSS('#timer', 'pulse');
      }
      if (this.counterTimer === 3) {
        animateCSS('#timer', 'pulse');
      }
      if (this.counterTimer === 2) {
        animateCSS('#timer', 'pulse');
      }
      if (this.counterTimer === 1) {
        animateCSS('#timer', 'pulse');
      }
      if (this.counterTimer === 0) {
        clearInterval(timer);
        this.endResults();
        this.isRunning = !this.isRunning;
      }
    }, 1000);
  };

  timerInit = () => {
    this.startingTheTimer();
  };

  // dividing arrayOfWords into seperate arrays
  createWordLength = () => {
    for (const element in arrayOfWords) {
      let strLength = arrayOfWords[element].length;

      if (strLength <= 5 && strLength > 2) {
        let noviceWords = arrayOfWords[element];
        this.novieArr.push(noviceWords);
      }
      if (strLength > 5 && strLength <= 10) {
        let intermediateWords = arrayOfWords[element];
        this.intermediateArr.push(intermediateWords);
      }
      if (strLength > 6) {
        let expertWords = arrayOfWords[element];
        this.expertArr.push(expertWords);
      }
      if (strLength === 1) {
        let bonusWords = arrayOfWords[element];
        this.bonusArr.push(bonusWords);
      }
    }
  };

  // creation of words that will be drawn on the canvas
  createWords = () => {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;

    // choosing which array to use depending on level selection
    switch (this.level) {
      case 1:
        this.array = this.novieArr;
        break;
      case 2:
        this.array = this.intermediateArr;
        break;
      case 3:
        this.array = this.expertArr;
        break;
      case 4:
        this.array = this.bonusArr;
        break;
      case 5:
        this.array = this.bonusBonusArr;
        break;
    }

    const randomIndex = Math.floor(Math.random() * this.array.length);
    let randomWordIndex = this.array[randomIndex];

    // removes duplicate indexes
    if (randomIndex > -1 && !this.bonusArr) {
      this.array.splice(randomIndex, 1);
    }

    const dX = this.center.x - x;
    const dY = this.center.y - y;
    const norm = Math.sqrt(dX ** 2 + dY ** 2);
    const speed = this.generateRandomNumber(this.word.lowestSpeed, this.word.highestSpeed);
    const newWord = new Word(this, x, y, (dX / norm) * speed, (dY / norm) * speed, randomWordIndex);
    this.words = [...this.words, newWord];
  };

  // removing the word and incrementing the score
  type = i => {
    this.words.splice(i, 1);
    this.score++;
  };

  backSpace = () => {
    this.string = this.string
      .split('')
      .splice(0, this.string.length - 1)
      .join('');
  };

  keyDownHandler() {
    window.addEventListener('keydown', e => {
      if (this.isRunning && e.keyCode >= 48 && e.keyCode <= 90) {
        this.string += e.key;
      }
      if (e.keyCode === 8) {
        this.backSpace();
      }
    });
  }

  checkWordMatch() {
    window.addEventListener('keydown', e => {
      let foundWord = 0;

      if (e.keyCode === 32 || e.keyCode === 13) {
        for (let i = this.words.length - 1; i >= 0; i--) {
          foundWord = this.words[i].value.localeCompare(this.string);
          if (foundWord === 0) {
            this.arrStrings.push(this.string);
            for (let i = 0; i < this.words.length; i++) {
              if (this.words[i].value === this.string) {
                this.particles = new Particle(this, this.words[i].x, this.words[i].y);
                this.particles.createParticles();
                this.boom = true;
                this.type(i);
                break;
              }
            }
            this.string = '';
            break;
          }
        }
        if (foundWord > 0 || foundWord < 0) {
          this.wrongKeystrokes.push(this.string);
          animateCSS('#typedWords', 'shake');
          setTimeout(() => {
            this.string = '';
          }, 300);
        }
      }
    });
  }

  // working out the statistics for the end of the game
  totalCharacters = () => {
    for (let i = 0, length = this.arrStrings.length; i < length; i++) {
      this.sum += this.arrStrings[i];
      this.totalCorrectCharacters = this.sum.length;
      this.wpm = Math.floor(this.sum.length / 5);
    }

    for (let i = 0, length = this.wrongKeystrokes.length; i < length; i++) {
      this.newSum += this.wrongKeystrokes[i];
      this.totalWrongCharacters = this.newSum.length;
    }

    this.totalKeyStrokes = this.totalCorrectCharacters + this.totalWrongCharacters;
    this.accuracy = Math.floor((this.totalCorrectCharacters / this.totalKeyStrokes) * 100);
  };

  // all results to be printed to the HTML
  endResults = () => {
    this.totalCharacters();
    if (this.level === 4 || this.level === 5) {
      accuracy.innerHTML = `Accuracy: ${this.accuracy}%`;
      totalKeystrokes.innerHTML = `Total Keystrokes: ${this.totalKeyStrokes}`;
      rightKeystroke.innerHTML = `${this.totalCorrectCharacters}`;
      wrongKeystroke.innerHTML = `${this.totalWrongCharacters}`;
    } else {
      wpmResult.innerHTML = `Word Per Minute: ${this.wpm}`;
      accuracy.innerHTML = `Accuracy: ${this.accuracy}%`;
      totalKeystrokes.innerHTML = `Total Keystrokes: ${this.totalKeyStrokes}`;
      rightKeystroke.innerHTML = `${this.totalCorrectCharacters}`;
      wrongKeystroke.innerHTML = `${this.totalWrongCharacters}`;
    }
    gameView.style.display = 'none';
    endView.style.display = 'block';
  };

  generateRandomNumber = (min, max) => {
    return min + Math.random() * (max - min);
  };

  loop = timestamp => {
    const ctx = this.context;
    for (let w of this.words) {
      w.moveWord();
    }
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.font = this.word.font;
    ctx.fillStyle = this.word.color;
    for (let w of this.words) {
      ctx.fillText(w.value, w.x, w.y);
    }
    if (this.gameTime < timestamp - this.gameSpeed) {
      this.gameTime = timestamp;
      this.createWords();
    }

    if (this.particles) {
      this.particles.processParticles();
      this.particles.paintParticles();
    }

    typedWords.innerHTML = `${this.string}`;
    score.innerHTML = `Score: ${this.score}`;
    timer.innerHTML = `${this.time}`;

    if (this.isRunning) {
      window.requestAnimationFrame(this.loop);
    }
  };
}

const animateCSS = (element, animationName, callback) => {
  const node = document.querySelector(element);
  node.classList.add('animated', animationName);

  function handleAnimationEnd() {
    node.classList.remove('animated', animationName);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback();
  }

  node.addEventListener('animationend', handleAnimationEnd);
};
