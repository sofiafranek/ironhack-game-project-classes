class Game {
  constructor(canvas, highestSpeed, lowestSpeed, level) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.counterTimer = 10;
    this.time = 10;
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
      size: 30,
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
    this.gameSpeed = 400;
    this.gameTime = 0;
    this.isRunning = true;
    this.array;
    this.level = level;
    this.novieArr = [];
    this.intermediateArr = [];
    this.expertArr = [];
    this.createWordLength();
  }

  startGame() {
    startView.style.display = 'none';
    gameView.style.display = 'block';
    this.timerInit();
    this.loop();
    this.boom = false;
  }

  startingTheTimer = () => {
    this.counterTimer = 10;
    const timer = setInterval(() => {
      this.counterTimer -= 1;
      this.time = this.counterTimer;
      if (this.counterTimer === 0) {
        clearInterval(timer);
        this.counterTimer = 10;
        this.endResults();
        this.isRunning = !this.isRunning;
      } else if (this.counterTimer === 58) {
        this.createObjects();
      }
    }, 1000);
  };

  timerInit = () => {
    this.startingTheTimer();
  };

  createObjects = () => {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    const dX = this.center.x - x;
    const dY = this.center.y - y;
    const norm = Math.sqrt(dX ** 2 + dY ** 2);
    const speed = this.generateRandomNumber(this.word.lowestSpeed, this.word.highestSpeed);
    const object = new Object(this, (dX / norm) * speed, (dY / norm) * speed, speed);
    console.log(object);
    this.snow = object;
  };

  // dividing arrayOfWords into seperate arrays
  createWordLength = () => {
    for (const element in arrayOfWords) {
      let strLength = arrayOfWords[element].length;

      if (strLength <= 5) {
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
    }
  };

  // creation of words that will be drawn on the canvas
  createWords = () => {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;

    const randomIndex = Math.floor(Math.random() * this.words.length);

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
    }

    // removes duplicate indexes
    if (randomIndex > -1) {
      this.array.splice(randomIndex, 1);
    }

    const randomWordIndex = this.array[randomIndex];

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
      if (this.isRunning && e.keyCode >= 65 && e.keyCode <= 90) {
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
        if (foundWord === -1 || foundWord === 1) {
          this.wrongKeystrokes.push(this.string);
          animateCSS('#typedWords', 'shake');
          setTimeout(() => {
            this.string = '';
          }, 500);
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
    wpmResult.innerHTML = `Word Per Minute: ${this.wpm}`;
    accuracy.innerHTML = `Accuracy: ${this.accuracy}%`;
    totalKeystrokes.innerHTML = `Total Keystrokes: ${this.totalKeyStrokes}`;
    rightKeystroke.innerHTML = `${this.totalCorrectCharacters}`;
    wrongKeystroke.innerHTML = `${this.totalWrongCharacters}`;
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
    if (this.snow) {
      this.snow.drawObject();
    }
    ctx.font = this.word.font;
    ctx.fillStyle = this.word.color;
    for (let w of this.words) {
      ctx.fillText(w.value, w.x, w.y);
    }
    if (this.gameTime < timestamp - this.gameSpeed) {
      this.gameTime = timestamp;
      this.createWords();
    }

    // if (this.counterTimer === 58) {
    //   this.createObjects();
    // }

    if (this.particles) {
      this.particles.processParticles();
      this.particles.paintParticles();
    }
    ctx.font = this.label.font;
    ctx.fillStyle = this.label.color;
    ctx.fillText('Score: ' + this.score, this.label.left, this.label.margin);
    typedWords.innerHTML = `${this.string}`;
    ctx.fillText('Timer: ' + this.time, this.label.right, this.label.margin);

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
