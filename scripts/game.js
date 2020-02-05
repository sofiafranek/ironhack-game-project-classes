class Game {
  constructor(canvas, highestSpeed, lowestSpeed, maxTime, level) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.counterTimer = 0;
    this.time = 0;
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
      highestSpeed: highestSpeed, //1.6,
      lowestSpeed: lowestSpeed, //0.6,
      probability: 0.03
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
    this.maxTime = maxTime;
    this.allIndex = [];
    // this.createWordLength();
    // this.array = array;
    this.level = level;
  }

  startGame() {
    startView.style.display = 'none';
    gameView.style.display = 'block';
    this.timerInit();
    this.loop();
    this.boom = false;
  }

  startingTheTimer = () => {
    this.counterTimer = 0;
    const timer = setInterval(() => {
      this.counterTimer += 1;
      this.time = this.counterTimer;
      if (this.counterTimer === this.maxTime) {
        clearInterval(timer);
        this.counterTimer = 0;
        this.endResults();
        this.isRunning = !this.isRunning;
      }
    }, 1000);
  };

  timerInit = () => {
    this.startingTheTimer();
  };

  // createWordLength = () => {
  //   for (const element in arrayOfWords) {
  //     let strLength = arrayOfWords[element].length;
  //     // console.log(`${element}: ${arrayOfWords[element]} : ${strLength}`);

  //     if (strLength <= 5) {
  //       let noviceWords = arrayOfWords[element];
  //       this.array = novieArr.push(noviceWords);
  //     }
  //     if (strLength > 5 && strLength <= 10) {
  //       let intermediateWords = arrayOfWords[element];
  //       this.array = intermediateArr.push(intermediateWords);
  //     }
  //     if (strLength > 10) {
  //       let expertWords = arrayOfWords[element];
  //       this.array = expertArr.push(expertWords);
  //     }

  //     console.log(novieArr);
  //     console.log(intermediateArr);
  //     console.log(expertArr);
  //   }
  // };

  createWords = () => {
    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;

    const randomIndex = Math.floor(Math.random() * this.words.length);

    // removes duplicate indexes
    if (randomIndex > -1) {
      arrayOfWords.splice(randomIndex, 1);
    }

    const randomWordIndex = arrayOfWords[randomIndex];
    // console.log(randomWordIndex);

    //before creating, we need to make sure that randomWordIndex satisfies a set of conditions
    //one: the value should not be in the this.words array.
    //two: the length of the value should be such that satisfies the needed length for the level
    if (this.words.indexOf(randomWordIndex) < 0) {
      console.log('index');
      //this means that the word is not in my array of words
      //need to check the length
      switch (this.level) {
        case 1:
          if (randomWordIndex.length < 5) {
            return randomWordIndex;
          }
          break;
        case 2:
          if (randomWordIndex.length < 10) {
            return randomWordIndex;
          }
          break;
        case 3:
          if (randomWordIndex.length < 15) {
            return randomWordIndex;
          }
          break;
      }
      const dX = this.center.x - x;
      const dY = this.center.y - y;
      const norm = Math.sqrt(dX ** 2 + dY ** 2);
      const speed = this.generateRandomNumber(this.word.lowestSpeed, this.word.highestSpeed);
      const newWord = new Word(
        this,
        x,
        y,
        (dX / norm) * speed,
        (dY / norm) * speed,
        randomWordIndex
      );
      this.words = [...this.words, newWord];
    } else {
      this.createWords();
    }
  };

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
    this.accuracy = (this.totalCorrectCharacters / this.totalKeyStrokes) * 100;
  };

  endResults = () => {
    this.totalCharacters();
    wpmResult.innerHTML = `WPM: ${this.wpm}`;
    accuracy.innerHTML = `Accuracy: ${this.accuracy}%`;
    rightKeystroke.innerHTML = `Correct Keystrokes: ${this.totalCorrectCharacters}`;
    wrongKeystroke.innerHTML = `Wrong Keystrokes: ${this.totalWrongCharacters}`;
    totalKeystrokes.innerHTML = `Total Keystrokes: ${this.totalKeyStrokes}`;
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
