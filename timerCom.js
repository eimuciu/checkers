class Timer {
    timerEl
    timeLeft = 2
    myTimer

    constructor(contEl) {
        this.timerEl = contEl
        this.timerEl.innerHTML = this.timeLeft
        this.startTimer()
    }

    startTimer() {
        this.timeLeft = 2
        this.myTimer = setInterval(() => {
            this.timeLeft -= 0.10
            this.timerEl.innerHTML = Math.abs(this.timeLeft).toFixed(2)
            this.stopTimer()
        }, 100)
    }

    stopTimer() {
        if (Math.abs(this.timeLeft).toFixed(2) === "0.00") {
            clearInterval(this.myTimer)
        }
    }

}

const containerEl = document.getElementById("timer")
const timer1 = new Timer(containerEl)

const resetButton = document.getElementById("resetTimer")
resetButton.addEventListener("click", () => {
    timer1.timeLeft = 2
})

const restartButton = document.getElementById("restartTimer")
restartButton.addEventListener("click", () => {
    timer1.startTimer()
})