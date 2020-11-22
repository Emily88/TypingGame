import Router from './CustomRouter'
import { WordInfo } from './types'

const wordInput: HTMLInputElement | null = document.querySelector('#word-input')
const currentWord: HTMLHeadingElement | null = document.querySelector(
  '#current-word'
)
const scoreDisplay: HTMLSpanElement | null = document.querySelector('#score')
const timeDisplay: HTMLSpanElement | null = document.querySelector('#time')
const startBtn: HTMLDivElement | null = document.querySelector('#start')
const restartBtn: HTMLDivElement | null = document.querySelector('#restart')
const gameScreen: HTMLDivElement | null = document.querySelector('.game-screen')
const resultScreen: HTMLDivElement | null = document.querySelector(
  '.result-screen'
)
const resultScore: HTMLHeadElement | null = document.querySelector(
  '#resultScore'
)
const averageTime: HTMLHeadElement | null = document.querySelector(
  '#averageTime'
)
let instance: App
let interval: NodeJS.Timeout

const show = function (elem: HTMLDivElement | null) {
  if (elem) {
    elem.style.display = 'block'
  }
}

const hide = function (elem: HTMLDivElement | null) {
  if (elem) {
    elem.style.display = 'none'
  }
}

const STATUS = {
  READY: 0,
  ING: 1
}

class App {
  readonly data: WordInfo[] = []
  private router: Router | undefined
  private status: number = STATUS.READY
  private wordIndex: number = 0
  private time: number = 0
  private totalTime: number = 0
  private score: number = 0

  constructor(data: WordInfo[]) {
    if (!instance) {
      instance = this
      this.data = data
      this.registerRouter()
      this.init()
      wordInput && wordInput.addEventListener('change', this.match.bind(this))
      startBtn && startBtn.addEventListener('click', this.switchBtn.bind(this))
    }

    return instance
  }

  registerRouter() {
    this.router = new Router()
    this.router.add('result', () => {
      if (resultScore && averageTime) {
        resultScore.innerHTML = `당신의 점수는 ${
          this.score < 0 ? 0 : this.score
        }점 입니다.`
        averageTime.innerHTML = `단어당 평균 답변 시간은 ${
          (this.totalTime / this.score).toFixed(2) || 0
        }초 입니다.`
      }

      hide(gameScreen)
      show(resultScreen)
    })
    this.router.add('', () => {
      show(gameScreen)
      hide(resultScreen)
      this.init()
    })
    restartBtn &&
      restartBtn.addEventListener('click', () => {
        this.router && this.router.navigateTo('')
      })
  }

  initAttrs() {
    this.status = STATUS.READY
    this.wordIndex = 0
    this.time = 0
    this.totalTime = 0
    this.score = this.data.length
  }

  initUI() {
    if (startBtn) {
      if (this.status === STATUS.READY) {
        startBtn.innerHTML = '시작'
      } else if (this.status === STATUS.ING) {
        startBtn.innerHTML = '초기화'
      }
    }
    if (wordInput && currentWord && scoreDisplay && timeDisplay && wordInput) {
      wordInput.value = ''
      currentWord.innerHTML = '문제 단어'
      scoreDisplay.innerHTML = ''
      timeDisplay.innerHTML = ''
      wordInput.disabled = true
    }
  }

  init() {
    this.initAttrs()
    this.initUI()
    clearInterval(interval)
  }

  switchBtn() {
    if (this.status === STATUS.READY) {
      this.status = STATUS.ING
      this.startGame.bind(this)()
    } else if (this.status === STATUS.ING) {
      this.status = STATUS.READY
      this.init()
    }
  }

  startGame() {
    if (wordInput && startBtn && scoreDisplay) {
      wordInput.disabled = false
      wordInput.focus()
      startBtn.innerHTML = '초기화'
      scoreDisplay.innerHTML = '' + this.data.length
      this.showWord()
    }
  }

  showWord() {
    const { text, second } = this.data[this.wordIndex]
    if (currentWord) {
      currentWord.innerHTML = text
    }
    this.time = second
    if (timeDisplay) {
      timeDisplay.innerHTML = '' + this.time
    }

    interval = setInterval(this.countdown.bind(this), 1000)
  }

  match() {
    if (wordInput && currentWord && wordInput.value === currentWord.innerHTML) {
      wordInput.value = ''
      this.totalTime += this.data[this.wordIndex].second - this.time
      clearInterval(interval)
      const isLast = this.next()
      if (isLast) {
        this.router && this.router.navigateTo('result')
        return
      }
      this.showWord()
    }
  }

  countdown() {
    if (this.time > 0) {
      this.time--
    } else if (this.time === 0) {
      clearInterval(interval)
      if (scoreDisplay) {
        scoreDisplay.innerHTML = '' + --this.score
      }
      const isLast = this.next()
      if (isLast) {
        this.router && this.router.navigateTo('result')
        return
      }
      this.showWord()
    }
    if (timeDisplay) {
      timeDisplay.innerHTML = '' + this.time
    }
  }

  next() {
    if (this.wordIndex !== this.data.length - 1) {
      this.wordIndex++
      return false
    }
    return true
  }
}

export default App
