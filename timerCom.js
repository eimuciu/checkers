class Timer {
  timerEl = document.getElementById('timer');
  timeLeft = 2;
  myTimerInterval = null;
  currentChecker = null;

  constructor() {
    this.timerEl.innerHTML = this.timeLeft;
  }

  startTimer() {
    this.resetTimer();
    this.myTimerInterval = setInterval(() => {
      this.timeLeft -= 0.1;
      this.timerEl.innerHTML = Math.abs(this.timeLeft).toFixed(2);
      this.stopTimer();
    }, 100);
  }

  stopTimer() {
    if (Math.abs(this.timeLeft).toFixed(2) === '0.00') {
      clearInterval(this.myTimerInterval);
      this.myTimerInterval = null;
      if (this.currentChecker.color === 'white') {
        selectedChecker.color = '';
        selectedChecker.position = null;
        whosMove = 'black';
      }
      if (this.currentChecker.color === 'black') {
        selectedChecker.color = '';
        selectedChecker.position = null;
        whosMove = 'white';
      }
      this.resetChecker();
    }
  }

  resetTimer() {
    this.timeLeft = 2;
  }

  addChecker(checker) {
    console.log('Timer interval', this.myTimerInterval);
    this.currentChecker = checker;
    if (this.myTimerInterval) {
      this.resetTimer();
    } else {
      this.startTimer();
    }
  }

  compareCheckers(checker) {
    if (
      this.currentChecker &&
      this.currentChecker.position === checker.position
    ) {
      return true;
    } else {
      return false;
    }
  }

  hasKickHappened() {
    if (this.currentChecker) {
      return true;
    } else {
      return false;
    }
  }

  resetChecker() {
    this.currentChecker = null;
  }
}

const timer = new Timer();
